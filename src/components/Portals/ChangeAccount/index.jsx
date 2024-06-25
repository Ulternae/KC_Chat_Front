import { useState } from "react"
import { LayoutBasePortal } from "../Layouts/LayoutBase"
import { useTranslation } from "react-i18next"
import { SpinnerLoading } from "../../Loading/SpinnerLoading"
import { ButtonFocus } from "../../Button/ButtonFocus"
import { ButtonSecondary } from "../../Button/ButtonSecondary"
import { SettingsInputFields, SettingsInputPassword } from "../../Input/Settings"

const ChangeAccountPortal = ({ setPortal }) => {
  const defaultFields = { nickname: '', password: '', email: '' }
  const defaultErrorFields = { error: false, message: ' ' }
  const { t } = useTranslation()
  const [fields, setFields] = useState(defaultFields)
  const [loading, setLoading] = useState(false)
  const [errorFields, setErrorFields] = useState(defaultErrorFields)
  const [showPassword, setShowPassword] = useState(false)

  const onClosePortal = () => setPortal(false)

  const onConfirmAccion = () => {
    const getAllEntries = Object.entries(fields)
    const getValidValues = getAllEntries.filter(([_, value]) => value !== '')

    if (getValidValues.length !== getAllEntries.length ) {
      return setErrorFields({ error: true, message: t('changeAccount.missingFields')})
    }

    setLoading(true)

    setTimeout(() => {
      setLoading(false)
      setErrorFields(defaultErrorFields)
    }, 2000)
  }


  return (
    <LayoutBasePortal setPortal={setPortal}>
      <h1 className="w-full text-lg font-semibold text-liwr-900 dark:text-perl-100">
        {t("changeAccount.title")}
      </h1>
      <p className="text-liwr-900 dark:text-perl-100 text-sm font-light">
        {t("changeAccount.instruction")}
      </p>
      <div className="relative transition-colors duration-300 mt-6 min-h-16 ">

        {!loading && (
          <>
            <div className="grid gap-3">
              <SettingsInputFields
                title={t('fields.nickname')}
                placeholder={t('changeAccount.nicknamePlaceholder')}
                typeField={'nickname'}
                fields={fields}
                setFields={setFields}
              />
              <SettingsInputPassword
                title={t("fields.password")}
                placeholder={t('changeAccount.passwordPlaceholder')}
                typeField={'password'}
                fields={fields}
                setFields={setFields}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <SettingsInputFields
                title={t('fields.email')}
                placeholder={t('changeAccount.emailPlaceholder')}
                typeField={'email'}
                fields={fields}
                setFields={setFields}
              />
            </div>

            <div className="min-h-10 mt-6 mb-6 flex items-center justify-center">
              {errorFields.error && (
                <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
                  {errorFields.message}
                </p>
              )}
            </div></>
        )}

        {loading && (
          <SpinnerLoading className={"h-[340px]"} />
        )}

        <div className=" flex gap-2 justify-end">
          <ButtonSecondary 
            text={t('buttons.cancel')}
            className={"w-32 text-sm font-semibold dark:font-medium"}
            onClick={onClosePortal}
          />
          <ButtonFocus
            text={t('buttons.confirm')}
            className={`${loading ? "cursor-not-allowed" : ""
              } w-32 text-sm font-semibold`}
            onClick={onConfirmAccion}
          />
        </div>
      </div>
    </LayoutBasePortal>
  )
}

export { ChangeAccountPortal }