import { useOutletContext } from "react-router"
import { IconFlagGroupBottom } from "../../assets/IconFlagGroupBottom"
import { IconFlagGroupTop } from "../../assets/IconFlagGroupTop"
import { MANAGEMENT_GROUPS as MG } from "../../constants"
import { useTranslation } from "react-i18next"

const GroupCardView = ({ groupInfo, children }) => {
  const { t } = useTranslation()
  const { avatars } = useOutletContext()
  const { avatarsUser } = avatars
  const {  avatar_id , detailsUsers , color, name, is_public, category} = groupInfo

  const avatarSelected = avatarsUser.find((a) => a.avatar_id === avatar_id)
  const participantsAvatars = detailsUsers.map((details) => details.avatar_url).slice(0 , 3)
  const othersParticipants = detailsUsers.slice(3)

  return (
    <div className="max-w-lg relative min-h-20 bg-liwr-100/50 dark:bg-perl-600 grid grid-cols-[42px_1fr] rounded-lg overflow-hidden -2 border-2 border-liwr-300/50 dark:border-perl-300">
      <div className="w-full border-r-2 border-r-liwr-300/50 dark:border-r-perl-300 grid place-content-center gap-2">
        { children }
      </div>
      <div className="px-4 flex flex-wrap py-6 xl:py-4 gap-y-2 gap-x-4 justify-between">
        <div className="flex gap-2 items-center mr-auto">
          <img
            className="rounded-full w-7 h-7 object-cover"
            src={avatarSelected?.url}
            alt="Avatar of group"
          />
          <span className="text-liwr-700 dark:text-perl-100">
            <h1 className="font-medium text-sm sm:text-base leading-none sm:leading-snug">
              {name}
            </h1>
            <p className="text-xs leading-none sm:leading-snug">
              {t(`management.${is_public ? MG.PUBLIC : MG.PRIVATE}`)}
            </p>
          </span>
        </div>
        <div className="w-44 flex items-center ml-auto">
          { participantsAvatars.map((avatar_url, index) => 
            <img
              key={index}
              className="-ml-2 w-7 h-7 rounded-full object-cover"
              src={avatar_url}
              alt="Avatar participants" />
            )}
          { othersParticipants.length > 0 && (
            <p className=" ml-2 text-liwr-700 dark:text-perl-100 text-xs ">
              {`+${othersParticipants.length} ${t('general.participants')}`}
            </p>
          )}
        </div>

      </div>
      <IconFlagGroupTop className={`fill-grp-${color}-100 dark:fill-grp-${color}-300 absolute max-w-72 -top-[1px] -right-[1px]`} />
      <IconFlagGroupBottom className={`fill-grp-${color}-100 dark:fill-grp-${color}-300 absolute max-w-52 -bottom-[1px] -left-[1px]`} />
      <div className={`bg-grp-${color}-100 dark:bg-grp-${color}-300 px-2 min-h-4 w-auto rounded-[4px] absolute top-0 right-0 sm:right-1 sm:top-1`}>
        <p className={`text-[10px] sm:text-sx truncate font-semibold text-grp-${color}-200 dark:text-grp-${color}-400`}>
          {category}
        </p>
      </div>
    </div>
  )
}

export { GroupCardView }
