import { PERMISSIONS } from "@constants";
import { useState } from "react";
import { IconArrowBold } from "../../assets/IconArrowBold";
import { IconAddMember } from "../../assets/IconAddMember";
import { useTranslation } from "react-i18next";

const ItemAddParticipant = ({ participant , setParticipants}) => {
  const { t } = useTranslation()
  const [typePermission, setTypePermission] = useState(PERMISSIONS.USER);

  const handlePermissionChange = () => {
    setTypePermission((prev) => prev === PERMISSIONS.USER ? PERMISSIONS.MODERATOR : PERMISSIONS.USER);
  };

  const infoNewParticipant = { ...participant, permissions: typePermission}

  const handleAddParticipant = () => {
    setParticipants((prev) => [...prev , infoNewParticipant])
  };

  return (
    <div
      className='py-1 min-h-9 rounded-lg pl-4 pr-2 flex flex-wrap items-center w-full bg-liwr-200 dark:bg-perl-600 '
      key={participant.friend_id}
    >
      <div className='flex items-center gap-2'>
        <img className='w-6 h-6 rounded-full object-cover' src={participant.avatar_url} alt="" />
        <p className='truncate text-sm text-liwr-900 dark:text-perl-100 leading-none'>{participant.nickname}</p>
      </div>
      <div className='h-8 ml-auto grid grid-cols-[1fr_32px]'>
        <div
          className='cursor-pointer h-8 px-2 flex items-center gap-2 bg-liwr-400 dark:bg-perl-500 rounded-lg border-4 border-liwr-200 dark:border-perl-600 -mr-2 z-10'
          onClick={handlePermissionChange}
        >
          <p className='text-xs leading-none text-liwr-900 dark:text-perl-100'>{t(`general.${typePermission}`)}</p>
          <IconArrowBold className={'w-3 h-3 '} />
        </div>
        <div
          className='cursor-pointer pl-2 my-1 rounded-[4px] grid place-content-center bg-liwr-400 dark:bg-perl-500'
          onClick={handleAddParticipant}
        >
          <IconAddMember className={'w-3 h-3'} />
        </div>
      </div>
    </div>
  );
};

export { ItemAddParticipant }