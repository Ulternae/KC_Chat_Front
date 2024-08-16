import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { PERMISSIONS as P } from "../../../constants";
import { Header } from "../ViewComponents/Header";
import { Participants } from "../ViewComponents/Participants";
import { Chats } from "../ViewComponents/Chats";
import { Settings } from "../ViewComponents/Settings";
const GroupUser = ({ currentGroup }) => {
  const { dataUser } = useOutletContext();
  const [permission, setPermission] = useState(null);

  const headerInfo = {
    avatar_id: currentGroup.avatar_id,
    name: currentGroup.name,
    category: currentGroup.category,
    description: currentGroup.description,
  };

  const participantsInfo = [...currentGroup.detailsUsers];

  const chatInfo = {
    chats_ids: currentGroup.chats_ids,
    chats_group : []
  };

  const settingsInfo = {
    color: currentGroup.color,
    is_public: currentGroup.is_public,
  };

  const canEdit = permission === P.ADMIN || permission === P.MODERATOR;

  const [newDataHeader, setNewDataHeader] = useState(headerInfo);
  const [newDataParticipants, setNewDataParticipants] =
    useState(participantsInfo);
  const [newDataChat, setNewDataChat] = useState(chatInfo);
  const [newDataSettings, setNewDataSettings] = useState(settingsInfo);
  const [currentEdit, setCurrentEdit] = useState(null);

  const toogleEdit = (edit) => {
    if (permission === P.ADMIN || permission === P.MODERATOR) {
      setCurrentEdit((prev) => (prev === edit ? null : edit));
    }
  };
  useEffect(() => {
    establishPermissions();
  }, [currentGroup]);

  const establishPermissions = () => {
    const isAdmin = dataUser.user_id === currentGroup.creator_id;
    if (isAdmin) return setPermission(P.ADMIN);
    const dataUserGroup = currentGroup.detailsUsers.find(
      (g) => g.friend_id === dataUser.user_id
    );
    const isModerator = Number(dataUserGroup?.is_moderator);
    if (isModerator) return setPermission(P.MODERATOR);
    else return setPermission(P.USER);
  };

  return (
    <div className="scrollbar-liwr-200 dark:scrollbar-perl-300 max-w-[1111px] px-0 sm:px-8 py-4 rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3">
      <div className="xl:col-span-2 pb-16 md:pb-0 lg:pb-16 xl:pb-0 md:pr-8 lg:pr-0 xl:pr-8">
        <Header
          canEdit={canEdit}
          permission={permission}
          info={headerInfo}
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
        />
      </div>
      <div className="mt-8 w-full xl:col-span-2">
        <Chats
          currentGroup={currentGroup}
          canEdit={canEdit}
          newInfo={newDataChat}
          setNewInfo={setNewDataChat}
          infoParticipants={newDataParticipants}
          />
      </div>
      <div className=" w-full">
        <Settings 
          permission={permission} 
          info={settingsInfo}
          newInfo={newDataSettings}
          setNewInfo={setNewDataSettings}
        />
      </div>
    </div>
  );
};

export { GroupUser };
