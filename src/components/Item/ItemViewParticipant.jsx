import { useTranslation } from "react-i18next"
import { PERMISSIONS } from "@constants";
import { IconCloseBold } from "../../assets/IconCloseBold";

const ItemViewParticipant = ({ participant, setParticipants }) => {
  const { t } = useTranslation()
  const isModerator = participant.permissions === PERMISSIONS.MODERATOR

  const handleChangePermissions = () => {
    setParticipants(prev => 
      prev.map(p => 
        p.friend_id === participant.friend_id 
          ? { ...participant, permissions: participant.permissions === PERMISSIONS.USER ? PERMISSIONS.MODERATOR : PERMISSIONS.USER }
          : p
      )
    );
  }

  const handelDeleteParticipant = () => {
    setParticipants(prev => prev.filter(p => p.friend_id !== participant.friend_id));
  }

  return (
    <div className="rounded-lg bg-liwr-200 dark:bg-perl-550 py-1 pl-2 pr-1 flex flex-wrap items-center gap-x-2 gap-y-1">
      <div 
        className="bg-liwr-200 dark:bg-perl-550 cursor-pointer"
        onClick={handleChangePermissions}
      >
        <p className="leading-none truncate text-liwr-600 w-20 dark:text-perl-200 text-xs ">{t(`general.${participant.permissions}`)}</p>
      </div>
      <div className="ml-auto grid grid-cols-[1fr_20px] w-full max-w-[200px]">
        <div className={`${isModerator ? 'bg-liwr-400 dark:bg-perl-400/40' : 'bg-liwr-300 dark:bg-perl-500'} flex gap-2 items-center px-2 py-1 rounded-md`}>
          <img className="w-6 h-6 object-cover rounded-r-full rounded-l-md" src={participant.avatar_url} alt="" />
          <p className="truncate leading-none text-liwr-900 dark:text-perl-100/80">{participant.nickname}</p>
        </div>
        <div className="grid place-content-center ml-1">
          <IconCloseBold 
            className='fill-liwr-100 dark:fill-perl-200 h-3 w-3 cursor-pointer'
            onClick={handelDeleteParticipant}
          /> 
        </div>
      </div>
    </div>
  )
}

export { ItemViewParticipant }