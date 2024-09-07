import { useTranslation } from "react-i18next";
import { ButtonFocus } from "../../../components/Button/ButtonFocus";
import { ButtonSecondary } from "../../../components/Button/ButtonSecondary";
import { ButtonWarning } from "../../../components/Button/ButtonWarning";
import { PERMISSIONS as P } from "../../../constants";
import { useNavigate, useOutletContext } from "react-router";
import { useState } from "react";
import { createPortal } from "react-dom";
import { DeleteGroupPortal } from "../../../components/Portals/DeleteGroup";
import { updateGroup } from "../../../services/groups/updateGroup";
import { getToken } from "../../../token";
import { addMembersInGroup } from "../../../services/groups/addMembersInGroup";
import { updateChatGroup } from "../../../services/groups/updateChatGroup";
import { deleteChatGroup } from "../../../services/groups/deleteChatGroup";
import { addModeratorsInGroup } from "../../../services/groups/addModeratorsInGroup";
import { deleteMemberGroup } from "../../../services/groups/deleteMemberGroup";
import { deleteModeratorGroup } from "../../../services/groups/deleteModeratorGroup";
import { createChatGroup } from "../../../services/groups/createChatGroup";
import { ConfirmChangesPortal } from "../../../components/Portals/ConfirmChanges";

const ConfirmChanges = ({
  hasChanges,
  canEdit,
  permission,
  newInfoGroup,
  infoGroup,
  currentGroup,
  setHasChanges,
  hasChangesGroup,
}) => {
  const {
    initialChatInfo,
    initialHeaderInfo,
    initialParticipantsInfo,
    initialSettingsInfo,
  } = infoGroup;

  const {
    hasHeaderChanges,
    hasSettingsChanges,
    hasParticipantChanges,
    hasChatsChanges,
  } = hasChangesGroup;

  const { newDataChat, newDataHeader, newDataParticipants, newDataSettings } =
    newInfoGroup;

  const $viewGroupUser = document.querySelector("#viewGroupUser");
  const defaultErrorFields = { error: false, message: "", type: null };

  const { t } = useTranslation();
  const token = getToken();
  const navigate = useNavigate();
  const isAdmin = permission === P.ADMIN;
  const group_id = initialHeaderInfo?.group_id;
  const group_name = initialHeaderInfo?.name;
  const { groups, chats, sockets } = useOutletContext();
  const { setGroupsUser } = groups;
  const { setChatsGroups } = chats;
  const { joinRoomChat } = sockets;

  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState(defaultErrorFields);
  const [portalDeleteGroup, setPortalDeleteGroup] = useState(false);
  const [portalConfirmChanges, setPortalConfirmChanges] = useState(false);

  const handleConfirmChanges = async () => {
    setLoading(true);
    setPortalConfirmChanges(true);
    setHasChanges(false);
    if (hasHeaderChanges || hasSettingsChanges) {
      const newInfoGroup = {
        name: newDataHeader.name || initialHeaderInfo.name,
        category: newDataHeader.category || initialHeaderInfo.category,
        avatar_id: newDataHeader.avatar_id || initialHeaderInfo.avatar_id,
        description: newDataHeader.description || initialHeaderInfo.description,
        color: newDataSettings.color || initialSettingsInfo.color,
        is_public:
          Boolean(newDataSettings.is_public) ||
          Boolean(initialSettingsInfo.is_public),
      };

      setGroupsUser((prev) =>
        prev.map((group) => {
          if (group.group_id === group_id) {
            const updateGroup = {
              ...group,
              avatar_id: newInfoGroup.avatar_id,
              category: newInfoGroup.category,
              color: newInfoGroup.color,
              description: newInfoGroup.description,
              is_public:
                newDataSettings.is_public ||
                initialSettingsInfo.is_public ||
                group.is_public,
              name: newInfoGroup.name,
            };
            return updateGroup;
          }
          return group;
        })
      );

      try {
        await updateGroup({
          token,
          infoGroup: newInfoGroup,
          group_id,
          t,
        });
      } catch (error) {
        setErrorFields({ ...error });
        setLoading(false);
      }
    }

    if (hasParticipantChanges) {
      const newParticipants = newDataParticipants.filter(
        (participant) =>
          !initialParticipantsInfo.some(
            (initialParticipant) =>
              initialParticipant.friend_id === participant.friend_id
          )
      );
      const newParticipantsIds = newParticipants.map((p) => p.friend_id);

      if (newParticipantsIds.length > 0) {
        setGroupsUser((prev) =>
          prev.map((group) => {
            if (group.group_id === group_id) {
              const newUsersIds = newParticipants
                .map((p) => `${p.friend_id}:${p.is_moderator}`)
                .join(",");
              const updateGroup = {
                ...group,
                detailsUsers: [...group.detailsUsers, ...newParticipants],
                user_ids: group.user_ids.concat(",", newUsersIds),
              };
              return updateGroup;
            }
            return group;
          })
        );

        try {
          await addMembersInGroup({
            token,
            groupId: group_id,
            membersGroup: newParticipantsIds,
            t,
          });
        } catch (error) {
          setErrorFields({ ...error });
          setLoading(false);
        }
      }
    }

    if (hasChatsChanges) {
      const chatsUpdate = newDataChat?.chats_group.filter((chat) =>
        initialChatInfo?.chats_group.some(
          (initialChat) => initialChat.chat_id === chat.chat_id
        )
      );
      const chatsDeleted = initialChatInfo?.chats_group.filter(
        (initialChat) =>
          !chatsUpdate?.some((chat) => chat.chat_id === initialChat.chat_id)
      );
      const newChats = newDataChat?.chats_group.filter(
        (chat) =>
          !initialChatInfo?.chats_group.some(
            (initialChat) => initialChat.chat_id === chat.chat_id
          )
      );

      if (chatsUpdate.length > 0) {
        setChatsGroups((prev) => [
          ...prev.filter(
            (chat) =>
              !chatsUpdate.some((update) => update.chat_id === chat.chat_id)
          ),
          ...chatsUpdate,
        ]);

        try {
          await Promise.all(
            chatsUpdate.map(
              async (chat) =>
                await updateChatGroup({
                  token,
                  chat_id: chat.chat_id,
                  infoChat: chat,
                  group_id,
                  t,
                })
            )
          );
        } catch (error) {
          setErrorFields({ ...error });
          setLoading(false);
        }
      }

      if (chatsDeleted.length > 0) {
        setChatsGroups((prev) =>
          prev.filter(
            (chat) =>
              !chatsDeleted.some((deleted) => deleted.chat_id === chat.chat_id)
          )
        );
        setGroupsUser((prev) =>
          prev.map((group) => {
            if (group.group_id === group_id) {
              const chats_ids =
                group.chats_ids
                  ?.split(",")
                  .filter(
                    (chat_id) =>
                      !chatsDeleted.some(
                        (deleted) => deleted.chat_id === chat_id
                      )
                  )
                  .join(",") || null;
              const updateGroup = {
                ...group,
                chats_ids,
              };
              return updateGroup;
            }
            return group;
          })
        );
        try {
          await Promise.all(
            chatsDeleted.map(
              async (chat) =>
                await deleteChatGroup({
                  token,
                  chat_id: chat.chat_id,
                  group_id,
                  t,
                })
            )
          );
        } catch (error) {
          setErrorFields({ ...error });
          setLoading(false);
        }
      }

      if (newChats.length > 0) {
        setChatsGroups((prev) => [...prev, ...newChats]);
        newChats.forEach((chat) => joinRoomChat({ room: chat.chat_id }));

        setGroupsUser((prev) =>
          prev.map((group) => {
            if (group.group_id === group_id) {
              const chats_ids_current = group.chats_ids?.split(",") || [""];
              const chats_ids = [
                ...chats_ids_current,
                ...newChats.map((c) => c.chat_id),
              ].join(",");

              const updateGroup = {
                ...group,
                chats_ids,
              };
              return updateGroup;
            }
            return group;
          })
        );
        try {
          await Promise.all(
            newChats.map(async (chat) => {
              const chatInfo = {
                chat_users: chat.users.map((u) => u.friend_id),
                chat_id: chat.chat_id,
                name: chat.name,
              };
              return await createChatGroup({
                token,
                chatInfo,
                groupId: group_id,
                t,
              });
            })
          );
        } catch (error) {
          setErrorFields({ ...error });
          setLoading(false);
        }
      }
    }

    if (hasParticipantChanges) {
      const oldModerators = initialParticipantsInfo.filter(
        (participant) => participant.permissions === P.MODERATOR
      );
      const newModerators = newDataParticipants.filter(
        (newParticipant) =>
          newParticipant.permissions === P.MODERATOR &&
          !oldModerators.some(
            (oldModerator) =>
              oldModerator.friend_id === newParticipant.friend_id
          )
      );
      const participantsDeleted = initialParticipantsInfo.filter(
        (initialParticipant) =>
          !newDataParticipants.some(
            (participant) =>
              participant.friend_id === initialParticipant.friend_id
          )
      );

      const moderatorsDeleted = oldModerators.filter((oldParticipant) =>
        newDataParticipants.some(
          (newParticipant) =>
            newParticipant.permissions === P.USER &&
            newParticipant.friend_id === oldParticipant.friend_id
        )
      );

      const newModeratorsIds = newModerators.map((m) => m.friend_id);

      if (
        newModeratorsIds.length > 0 ||
        participantsDeleted.length > 0 ||
        moderatorsDeleted.length > 0
      ) {
        setGroupsUser((prev) =>
          prev.map((group) => {
            if (group.group_id === group_id) {
              const updateGroup = {
                ...group,
                detailsUsers: newDataParticipants,
              };
              return updateGroup;
            }
            return group;
          })
        );
      }
      if (newModeratorsIds.length > 0) {
        try {
          await addModeratorsInGroup({
            token,
            groupId: group_id,
            moderatorsGroup: newModeratorsIds,
            t,
          });
        } catch (error) {
          setErrorFields({ ...error });
          setLoading(false);
        }
      }

      if (participantsDeleted.length > 0) {
        try {
          await Promise.all(
            participantsDeleted.map(
              async (member) =>
                await deleteMemberGroup({
                  token,
                  user_id: member.friend_id,
                  group_id,
                  t,
                })
            )
          );
        } catch (error) {
          setErrorFields({ ...error });
          setLoading(false);
        }
      }

      if (moderatorsDeleted.length > 0) {
        try {
          await Promise.all(
            moderatorsDeleted.map(
              async (moderator) =>
                await deleteModeratorGroup({
                  token,
                  user_id: moderator.friend_id,
                  group_id,
                  t,
                })
            )
          );
        } catch (error) {
          setErrorFields({ ...error });
          setLoading(false);
        }
      }
    }

    setLoading(false);
  };

  const handleOpenDeletePortal = () => {
    setPortalDeleteGroup(true);
  };

  const groupInfo = {
    group_name,
    group_id,
  };

  return (
    <>
      <div className="flex mt-16 flex-col sm:flex-row gap-y-4">
        {isAdmin && (
          <ButtonWarning
            onClick={handleOpenDeletePortal}
            className="font-medium mx-4 sm:mx-0"
            text={t("groupView.deleteGroup")}
          />
        )}
        {hasChanges && canEdit && (
          <div className=" flex gap-4 flex-col sm:flex-row sm:ml-auto gap-y-4 mx-4 sm:mx-0">
            <ButtonSecondary
              className={"font-medium w-full min-w-28"}
              text={t("buttons.cancel")}
              onClick={() => navigate("/groups")}
            />
            <ButtonFocus
              className={"font-medium"}
              text={t("buttons.confirm")}
              onClick={handleConfirmChanges}
            />
          </div>
        )}
      </div>
      {portalConfirmChanges &&
        $viewGroupUser &&
        createPortal(
          <ConfirmChangesPortal
            errorFields={errorFields}
            loading={loading}
            setPortal={setPortalConfirmChanges}
          />,
          $viewGroupUser
        )}
      {portalDeleteGroup &&
        $viewGroupUser &&
        createPortal(
          <DeleteGroupPortal
            setPortal={setPortalDeleteGroup}
            groupInfo={groupInfo}
            currentGroup={currentGroup}
          />,
          $viewGroupUser
        )}
    </>
  );
};

export { ConfirmChanges };
