import { useEffect, useState } from "react";
import { ButtonFocus } from "../../../components/Button/ButtonFocus";
import { ButtonSecondary } from "../../../components/Button/ButtonSecondary";
import {
  MARKDOWN,
  OPTIONS_PARTICIPANTS as OP,
  PERMISSIONS,
  FIELDS_DB,
} from "../../../constants";
import {
  arraysValidate,
  booleansValidate,
  numbersValidate,
  stringsValidate,
} from "../../../utils/validate";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router";
import { getToken } from "../../../token";
import { createGroup } from "../../../services/groups/createGroup";
import { addMembersInGroup } from "../../../services/groups/addMembersInGroup";
import { addModeratorsInGroup } from "../../../services/groups/addModeratorsInGroup";
import { createChatGroup } from "../../../services/groups/createChatGroup";

const CreateGroupFields = ({ info, errorInfo, setLoading, setErrorBack }) => {
  const token = getToken();
  const navigate = useNavigate();
  const { dataUser, groups, sockets, chats: chatsContext } = useOutletContext();
  const { setGroupsUser } = groups;
  const { setChatsGroups } = chatsContext;
  const { joinRoomChat } = sockets;
  const [chatsGroup, setChatsGroup] = useState([]);
  const [chatsGroupInvalids, setChatsGroupInvalids] = useState([]);
  const { content, participants, settings, chats } = info;
  const { errorFields, setErrorFields, defaultError } = errorInfo;
  const { t } = useTranslation();

  const userParticipant = {
    ...dataUser,
    friend_id: dataUser.user_id,
    is_moderator: 1,
    permissions: OP.MODERATOR,
  };

  useEffect(() => {
    setErrorFields(defaultError);
  }, [content, participants, settings, chats]);

  const stringsValidateData = {
    category: content.category,
    title: content.title,
    color: settings.color,
    description: content.description,
  };
  const validateNumbersData = {
    avatar_id: settings.avatar_id,
  };
  const validateBooleansData = {
    is_public: settings.is_public,
  }; 

  useEffect(() => {
    if (participants && dataUser) {
      verifyChats();
    }
  }, [participants, dataUser, chats]);

  const verifyChats = async () => {
    const [validChats, invalidChats] = await chats.reduce(
      ([valid, invalid], item, index) => {
        const chat_name = item.chat_name || `${t("general.chat")} ${index + 1}`;
        const data = {
          ...item,
          chat_name,
          participants: [...item.participants, userParticipant],
        };
        if (item.participants.length > 0) {
          valid.push(data);
        } else {
          invalid.push(data);
        }
        return [valid, invalid];
      },
      [[], []]
    );

    setChatsGroup(validChats);
    setChatsGroupInvalids(invalidChats);
  };

  const handleReturnNavigate = () => {
    const referrer = document.referrer;
    const isReferrerInsideApp = referrer.includes(window.location.origin);

    if (window.history.length > 1 && isReferrerInsideApp) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const validInfo = () => {
    const isValidStrings = stringsValidate({
      data: Object.values(stringsValidateData),
      special: MARKDOWN.DEFAULT,
    });
    const isValidArrays = arraysValidate({ data: participants });
    const isValidNumbers = numbersValidate({
      data: Object.values(validateNumbersData),
      minRange: 1,
      maxRange: 50,
    });
    const isValidBooleans = booleansValidate({
      data: Object.values(validateBooleansData),
    });

    if (
      !(isValidStrings && isValidArrays && isValidNumbers && isValidBooleans)
    ) {
      return setErrorFields({
        error: true,
        message: t("validationFront.insufficientData"),
        continue: false,
      });
    }

    setErrorFields(defaultError);
    validateChats();
  };

  const validateChats = () => {
    if (errorFields.continue) {
      submitInfoNewChat();
    }

    if (chatsGroupInvalids.length > 0) {
      const titlesChatsInvalid = chatsGroupInvalids
        .map((c) => c.chat_name)
        .join(" , ");

      setErrorFields({
        error: true,
        continue: true,
        message: `${t("groupChatPreview.warningChats", {
          count: chatsGroupInvalids.length,
        })} ( ${titlesChatsInvalid} )
        
        ${t("groupChatPreview.ignoreChats")}`,
      });

      return;
    } else {
      return submitInfoNewChat();
    }
  };

  const submitInfoNewChat = async () => {
    const membersGroup = participants.map((p) => p.friend_id);
    const group_id = crypto.randomUUID();

    const fieldsGroup = {
      category: content.category,
      color: settings.color,
      description: content.description,
      is_public: settings.is_public,
      name: content.title,
      avatar_id: settings.avatar_id,
      group_id,
    };

    const detailsUsers = [
      ...participants.map((p) => {
        const is_moderator = p.permissions === OP.MODERATOR ? 1 : 0;
        return { ...p, is_moderator };
      }),
      userParticipant,
    ];

    const newGroup = {
      avatar_id: settings.avatar_id,
      category: content.category,
      chats_ids: chatsGroup.map((c) => c.chat_id).join(","),
      color: settings.color,
      creator_id: dataUser.user_id,
      description: content.description,
      detailsUsers,
      group_id,
      is_public: settings.is_public ? 1 : 0,
      name: content.title,
      user_ids: detailsUsers
        .map((p) => `${p.friend_id}:${p.is_moderator}`)
        .join(","),
    };

    setGroupsUser((prev) => [...prev, newGroup]);

    chatsGroup.forEach((c) => {
      const newChat = c
      c.is_group = 1
      c.name = c.chat_name
      newChat.users = [...newChat.participants, dataUser]
      setChatsGroups((prev) => [...prev, c]);
      joinRoomChat({ room: c.chat_id });
    });

    try {
      setLoading(true);
      await createGroup({ token, fieldsGroup, t });
      await addMembersInGroup({ token, groupId: group_id, membersGroup, t });

      const moderatorsGroup =
        participants
          .filter((p) => p.permissions === PERMISSIONS.MODERATOR)
          .map((p) => p.friend_id) || [];

      moderatorsGroup.length > 0
        ? await addModeratorsInGroup({
            token,
            groupId: group_id,
            moderatorsGroup,
            t,
          })
        : [];

      const chatPromises = chatsGroup.map(async (chat) => { // TRY CATCH
        const chat_users = chat.participants.map((p) => p.friend_id);
        const chatInfo = {
          chat_users,
          name: chat.chat_name,
          chat_id: chat.chat_id,
        };
        return createChatGroup({ token, groupId: group_id, chatInfo, t });
      });

      await Promise.all(chatPromises);

      navigate(`/groups/${group_id}`);
    } catch (e) {
      if (e.field === FIELDS_DB.GROUP) {
        setErrorBack({ ...e });
        setGroupsUser((prev) => prev.filter((g) => g.group_id !== group_id));
      } else if (e.field === FIELDS_DB.MEMBERS) {
        setErrorBack({ ...e, navigate: `/groups/${group_id}` });
        setGroupsUser((prevGroups) =>
          prevGroups.map((group) => {
            if (group.group_id === group_id) {
              const infoGroup = {
                ...group,
                detailsUsers: [userParticipant],
                user_ids: `${dataUser.user_id}:1`,
                chats_ids: null,
              };
              return infoGroup;
            }
            return group;
          })
        );
      } else if (e.field === FIELDS_DB.MODERATORS) {
        setErrorBack({ ...e, navigate: `/groups/${group_id}` });
        setGroupsUser((prevGroups) =>
          prevGroups.map((group) => {
            if (group.group_id === group_id) {
              const infoGroup = {
                ...group,
                detailsUsers: group.detailsUsers.map((user) => ({
                  ...user,
                  is_moderator: user.friend_id !== dataUser.user_id ? 0 : 1,
                  permissions: OP.USER,
                })),
                user_ids: group.detailsUsers
                  .map(
                    (p) =>
                      `${p.friend_id}:${
                        p.friend_id !== dataUser.user_id ? "0" : "1"
                      }`
                  )
                  .join(","),
              };
              return infoGroup;
            }
            return group;
          })
        );
      } else if (e.field === FIELDS_DB.CHATS) {
        setErrorBack({ ...e, navigate: `/groups/${group_id}` });
        setGroupsUser((prevGroups) =>
          prevGroups.map((group) => {
            if (group.group_id === group_id) {
              const infoGroup = {
                ...group,
                chats_ids: null,
              };
              return infoGroup;
            }
            return group;
          })
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2 ml-auto mt-auto pr-4 pt-4">
      <ButtonSecondary
        onClick={handleReturnNavigate}
        className={"min-w-24 font-medium"}
        text={t("buttons.cancel")}
      />
      <ButtonFocus
        onClick={validInfo}
        className={"min-w-24 font-medium"}
        text={t("buttons.confirm")}
      />
    </div>
  );
};

export { CreateGroupFields };
