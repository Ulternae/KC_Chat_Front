import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { PERMISSIONS as P } from "../../../constants";
import { Header } from "../ViewComponents/Header";
import { Participants } from "../ViewComponents/Participants";
import { Chats } from "../ViewComponents/Chats";
import { Settings } from "../ViewComponents/Settings";
import { ConfirmChanges } from "../ViewComponents/ConfirmChanges";
import { useTranslation } from "react-i18next";
import { IconArrowBottom } from "../../../assets/IconArrowBottom";

const GroupUser = ({ currentGroup }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dataUser } = useOutletContext();
  const [permission, setPermission] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);

  const initialHeaderInfo = {
    avatar_id: currentGroup.avatar_id,
    name: currentGroup.name,
    category: currentGroup.category,
    description: currentGroup.description,
    group_id: currentGroup.group_id,
  };

  const initialParticipantsInfo = [...currentGroup.detailsUsers];

  const initialChatInfo = {
    chats_ids: currentGroup.chats_ids,
    chats_group: currentGroup.chats_group || [],
  };

  const initialSettingsInfo = {
    color: currentGroup.color,
    is_public: currentGroup.is_public,
  };

  const [newDataHeader, setNewDataHeader] = useState(initialHeaderInfo);
  const [newDataParticipants, setNewDataParticipants] = useState(
    initialParticipantsInfo
  );
  const [newDataChat, setNewDataChat] = useState(initialChatInfo);
  const [newDataSettings, setNewDataSettings] = useState(initialSettingsInfo);
  const [currentEdit, setCurrentEdit] = useState(null);

  const canEdit = permission === P.ADMIN || permission === P.MODERATOR;

  useEffect(() => {
    establishPermissions();
  }, [currentGroup]);

  useEffect(() => {
    checkForChanges();
  }, [newDataHeader, newDataParticipants, newDataChat, newDataSettings]);

  const establishPermissions = () => {
    const isAdmin = dataUser.user_id === currentGroup.creator_id;
    if (isAdmin) return setPermission(P.ADMIN);

    const dataUserGroup = currentGroup.detailsUsers.find(
      (g) => g.friend_id === dataUser.user_id
    );
    const isModerator = Number(dataUserGroup?.is_moderator);
    if (isModerator) return setPermission(P.MODERATOR);

    setPermission(P.USER);
  };

  const checkForChanges = () => {
    if (
      hasHeaderChanges() ||
      hasSettingsChanges() ||
      hasParticipantChanges() ||
      hasChatsChanges()
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  };

  const hasHeaderChanges = () => {
    return Object.entries(initialHeaderInfo).some(
      ([key, value]) => newDataHeader[key] !== value
    );
  };

  const hasSettingsChanges = () => {
    return Object.entries(initialSettingsInfo).some(
      ([key, value]) => newDataSettings[key] !== value
    );
  };

  const hasParticipantChanges = () => {
    return (
      initialParticipantsInfo.length !== newDataParticipants.length ||
      !initialParticipantsInfo.every((participant, index) =>
        Object.entries(participant).every(
          ([key, value]) => value === newDataParticipants[index][key]
        )
      )
    );
  };

  const hasChatsChanges = () => {
    return (
      initialChatInfo.chats_ids !== newDataChat.chats_ids ||
      initialChatInfo.chats_group.length !== newDataChat.chats_group.length ||
      initialChatInfo.chats_group.some((chat, index) => {
        return Object.entries(chat).some(([key, value]) => {
          if (Array.isArray(value)) {
            if (newDataChat.chats_group[index][key].length !== value.length) {
              return true;
            }

            return value.some((user) => {
              const isSameUser = newDataChat.chats_group[index].users.find(
                (newUser) => newUser.user_id === user.user_id
              );
              return !isSameUser;
            });
          } else {
            return newDataChat.chats_group[index][key] !== value;
          }
        });
      })
    );
  };

  const toogleEdit = (edit) => {
    if (canEdit) {
      setCurrentEdit((prev) => (prev === edit ? null : edit));
    }
  };

  const resetChanges = () => {
    setNewDataHeader(initialHeaderInfo);
    setNewDataParticipants(initialParticipantsInfo);
    setNewDataChat(initialChatInfo);
    setNewDataSettings(initialSettingsInfo);
    setCurrentEdit(null);
    setHasChanges(false);
    setShowParticipants(false);
  };

  const newInfoGroup = {
    newDataHeader,
    newDataParticipants,
    newDataChat,
    newDataSettings,
  };

  const infoGroup = {
    initialHeaderInfo,
    initialParticipantsInfo,
    initialChatInfo,
    initialSettingsInfo,
  };

  const hasChangesGroup = {
    hasHeaderChanges: hasHeaderChanges(),
    hasSettingsChanges: hasSettingsChanges(),
    hasParticipantChanges: hasParticipantChanges(),
    hasChatsChanges: hasChatsChanges(),
  };

  return (
    <div
      className="scrollbar-liwr-200 dark:scrollbar-perl-300 max-w-[1111px] px-0 sm:px-8 py-16 rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 relative"
      id="viewGroupUser"
    >
      <IconArrowBottom
        className="absolute left-8 top-2 h-[24px] w-[14px] fill-liwr-900 dark:fill-perl-200 cursor-pointer rotate-90"
        onClick={() => navigate("/groups")}
      />
      <div className="xl:col-span-2 pb-16 md:pb-0 lg:pb-16 xl:pb-0 md:pr-8 lg:pr-0 xl:pr-8">
        <Header
          canEdit={canEdit}
          permission={permission}
          info={initialHeaderInfo}
          newInfo={newDataHeader}
          setNewInfo={setNewDataHeader}
          toogleEdit={toogleEdit}
          currentEdit={currentEdit}
        />
      </div>
      <div className="">
        <Participants
          newInfo={newDataParticipants}
          setNewInfo={setNewDataParticipants}
          canEdit={canEdit}
          showParticipants={showParticipants}
          setShowParticipants={setShowParticipants}
        />
      </div>
      <div className="mt-8 w-full xl:col-span-2">
        <Chats
          currentGroup={currentGroup}
          canEdit={canEdit}
          info={initialChatInfo}
          newInfo={newDataChat}
          setNewInfo={setNewDataChat}
          infoParticipants={newDataParticipants}
        />
      </div>
      <div className="sm:pl-8 w-full pt-8 mt-auto max-w-[388px] ml-auto">
        <Settings
          canEdit={canEdit}
          permission={permission}
          newInfo={newDataSettings}
          setNewInfo={setNewDataSettings}
        />
      </div>

      <div className="md:col-span-2 lg:col-span-1 xl:col-span-3 pt-8">
        <ConfirmChanges
          hasChanges={hasChanges}
          setHasChanges={setHasChanges}
          canEdit={canEdit}
          permission={permission}
          newInfoGroup={newInfoGroup}
          infoGroup={infoGroup}
          currentGroup={currentGroup}
          hasChangesGroup={hasChangesGroup}
        />
      </div>

      {hasChanges && canEdit && (
        <>
          <div
            className="cursor-pointer absolute z-10 top-2 right-8 w-auto h-10 rounded-r-[3px] rounded-bl-2xl rounded-tl-[3px] bg-liwr-400 dark:bg-perl-400 px-4 inline-flex items-center"
            onClick={resetChanges}
          >
            <p className=" text-liwr-900 dark:text-perl-200">
              {t("groupView.revertChanges")}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export { GroupUser };
