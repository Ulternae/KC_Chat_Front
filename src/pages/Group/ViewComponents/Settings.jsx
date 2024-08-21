import { useTranslation } from "react-i18next"
import { IconArrowRightLight } from "../../../assets/IconArrowRightLight"
import { MANAGEMENT_GROUPS as MG, COLORS_USERS as CU } from "@constants"
import { SelectOptionsPersonalized } from "../../../components/Select/SelectOptionsPersonalized"
import { IconColorView } from "../../../assets/IconColorView"

const Settings = ({
  permission, newInfo, setNewInfo, canEdit
}) => {
  const { color, is_public } = newInfo

  const { t } = useTranslation()
  const typeManagement = is_public ? MG.PUBLIC : MG.PRIVATE

  const handleChangeTypeManagement = (type) => {
    setNewInfo((prev) => ({
      ...prev,
      is_public: type === MG.PUBLIC ? 1 : 0
    }))
  }

  const handleChangeTypeColor = (colorSelected) => {
    setNewInfo((prev) => ({
      ...prev,
      color: colorSelected
    }))
  }

  return (
    <div className="grid gap-3 mt-auto">
      <SelectOptionsPersonalized className={"grid gap-4"}>
        <div className="relative rounded-l-lg min-h-8 items-center dark:bg-perl-500 grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))]">
          <div className="w-full min-w-36 bg-liwr-300 dark:bg-perl-400 h-8 rounded-l-lg border-r-2 dark:border-perl-300 rounded-r-sm px-4 flex items-center justify-between">
            <h1 className="dark:text-perl-200 font-medium leading-none truncate">{t('general.management')}</h1>
          </div>
          <div className="min-w-36 w-full h-8 px-4 flex justify-between items-center">
            <p className="dark:text-perl-100 font-medium truncate">{t(`management.${typeManagement}`)}</p>
            {canEdit && (
              <IconArrowRightLight className={"cursor-pointer rotate-90 dark:fill-perl-100"} />
            )}
          </div>
        </div>
        {canEdit && (
          <div className="w-full rounded-lg dark:bg-perl-400 py-4">
            {Object.values(MG).map((type) => {
              const isSelected = type === typeManagement
              return (
                <div
                  key={type}
                  className={`px-6 h-10 flex items-center cursor-pointer hover:dark:bg-perl-300 ${isSelected ? 'dark:bg-perl-500/40 dark:' : ''}`}
                  onClick={() => handleChangeTypeManagement(type)}
                >
                  <p className={`${isSelected ? 'dark:text-perl-100' : 'dark:text-perl-200'}`}>{t(`management.${type}`)}</p>
                </div>
              )
            })}
          </div>)}
      </SelectOptionsPersonalized>

      <SelectOptionsPersonalized className={"grid gap-4"}>
        <div className="relative rounded-l-lg min-h-8 items-center dark:bg-perl-500 grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))]">
          <div className="w-full min-w-36 bg-liwr-300 dark:bg-perl-400 h-8 rounded-l-lg border-r-2 dark:border-perl-300 rounded-r-sm px-4 flex items-center justify-between">
            <h1 className="dark:text-perl-200 font-medium leading-none truncate">{t('general.color')}</h1>
            <IconColorView className={`dark:fill-grp-${color}-300`} secondaryColor={`dark:fill-grp-${color}-400`} />
          </div>
          <div className="min-w-36 w-full h-8 px-4 flex justify-between items-center">
            <p className="dark:text-perl-100 font-medium truncate">{t(`colorsUsers.${color}`)}</p>
            {canEdit && (
              <IconArrowRightLight className={"cursor-pointer rotate-90 dark:fill-perl-100"} />
            )}
          </div>
        </div>
        {canEdit && (
          <div className="w-full rounded-lg dark:bg-perl-400 py-4">
            {Object.values(CU).map((colorUser) => {
              const isSelected = colorUser === color
              return (
                <div
                  key={colorUser}
                  className={`px-6 h-10 flex items-center cursor-pointer hover:dark:bg-perl-300 ${isSelected ? 'dark:bg-perl-400' : ''}`}
                  onClick={() => handleChangeTypeColor(colorUser)}
                >
                  <p className={`dark:text-grp-${colorUser}-400`}>{t(`colorsUsers.${colorUser}`)}</p>
                </div>
              )
            })}
          </div>)}
      </SelectOptionsPersonalized>

      <div className="grid gap-4">
        <div className="relative rounded-l-lg min-h-8 items-center dark:bg-perl-500 grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))]">
          <div className="w-full min-w-36 bg-liwr-300 dark:bg-perl-400 h-8 rounded-l-lg border-r-2 dark:border-perl-300 rounded-r-sm px-4 flex items-center justify-between">
            <h1 className="dark:text-perl-200 font-medium leading-none truncate">{t('general.permissions')}</h1>
          </div>
          <div className="min-w-36 w-full h-8 px-4 flex justify-between items-center">
            <p className="dark:text-perl-100 font-medium truncate">{t(`permission.${permission}`)}</p>
          </div>
        </div>
      </div>
    </div>

  )
}

export { Settings }