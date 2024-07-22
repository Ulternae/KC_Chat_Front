import { useOutletContext } from "react-router"
import { AccordionCard } from "../../../components/Card/AccordionCard"
import { ACCION_THEME, COLORS_USERS } from "../../../constants"
import { useEffect, useState } from "react"
import { RANDOM_AVATAR } from '@constants'
import { useTranslation } from "react-i18next"
import { SpinnerLoading } from "../../../components/Loading/SpinnerLoading"
import { SelectOptionsPersonalized } from "../../../components/Select/SelectOptionsPersonalized"
import { FormText } from "../../../components/Form/FormText"
import { FormLayout } from "../../../components/Form/FormLayout"

const AccordionSettings = ({ fields, theme, infoAccordion, setFields }) => {
  const { t } = useTranslation()
  const { avatars } = useOutletContext()
  const { avatarsUser, loadingAvatars, errorFetchAvatars } = avatars
  const { openSection, toggleSection, section } = infoAccordion
  const [avatarSelected, setAvatarSelected] = useState([])

  useEffect(() => {
    if (!loadingAvatars) {
      setAvatarSelected(avatarsUser[RANDOM_AVATAR()])
    }
  }, [loadingAvatars])

  const handleChangeColor = ({ color }) => {
    setFields({ ...fields, color })
  }

  return (
    <AccordionCard
      statusColor={` fill-${ACCION_THEME[theme]}/50`}
      section={section}
      openSection={openSection}
      toggleSection={toggleSection}
      name={t('general.settings')}
    >
      {loadingAvatars && (
        <SpinnerLoading className={'h-[100px]'} />
      )}
      {!loadingAvatars && (
        <div className="flex flex-wrap gap-x-3 gap-y-2 py-6 ">
          <div className="mx-auto my-auto w-20 h-20 bg-liwr-300 dark:bg-perl-600 rounded-tr-lg rounded-bl-lg rounded-br-xl rounded-tl-3xl p-2">
            <img className="w-full h-full object-cover rounded-tr-[4px] rounded-tl-[20px] rounded-br-lg rounded-bl-[4px]" src={avatarSelected.url} />
          </div>
          <div className="grid flex-1 min-w-44 gap-y-2">
            <FormLayout >
              <FormText text={t('general.color')} />

              <SelectOptionsPersonalized
                className='bg-liwr-300 dark:bg-perl-600 w-full h-[40px] rounded-lg'
              >
                <div className="cursor-pointer px-5 py-3 flex justify-between items-center">
                  <p className=" text-sm text-liwr-900 dark:text-perl-100 leading-none">
                    {t(`colorsUsers.${fields.color}`)}
                  </p>
                  <div className={`h-4 w-4 rounded-md bg-grp-${fields.color}-200 dark:bg-grp-${fields.color}-400`} />
                </div>

                <div className="mt-2 py-4 bg-liwr-300 dark:bg-perl-600 rounded-lg">
                  {Object.values(COLORS_USERS).map((color) => (
                    <div
                      className={`flex px-5 py-3 h-10 cursor-pointer hover:bg-liwr-200 hover:dark:bg-perl-500 ${color === fields.color ? "bg-liwr-200/60 dark:bg-perl-400" : ""}`}
                      key={color}
                      onClick={() => handleChangeColor({ color })}
                    >

                      <p className={`text-sm font-semibold dark:font-medium text-grp-${color}-200 dark:text-grp-${color}-400`} >
                        {t(`colorsUsers.${color}`)}
                      </p>

                    </div>
                  ))}
                </div>
              </SelectOptionsPersonalized>
            </FormLayout>
            <FormLayout >
              <FormText text={t('general.management')} />
              <SelectOptionsPersonalized
                className='bg-liwr-300 dark:bg-perl-600 w-full h-[40px] rounded-lg'
              >
                <div className="cursor-pointer px-5 py-3 flex justify-between items-center">
                  <p className=" text-sm text-liwr-900 dark:text-perl-100 leading-none">
                    {t(`colorsUsers.${fields.color}`)}
                  </p>
                  <div className={`h-4 w-4 rounded-md bg-grp-${fields.color}-200 dark:bg-grp-${fields.color}-400`} />
                </div>

                <div className="mt-2 py-4 bg-liwr-300 dark:bg-perl-600 rounded-lg">
                  {Object.values(COLORS_USERS).map((color) => (
                    <div
                      className={`flex px-5 py-3 h-10 cursor-pointer hover:bg-liwr-200 hover:dark:bg-perl-500 ${color === fields.color ? "bg-liwr-200/60 dark:bg-perl-400" : ""}`}
                      key={color}
                      onClick={() => handleChangeColor({ color })}
                    >

                      <p className={`text-sm font-semibold dark:font-medium text-grp-${color}-200 dark:text-grp-${color}-400`} >
                        {t(`colorsUsers.${color}`)}
                      </p>

                    </div>
                  ))}
                </div>
              </SelectOptionsPersonalized>
            </FormLayout>

          </div>
        </div>
      )}
    </AccordionCard>
  )
}

export { AccordionSettings }