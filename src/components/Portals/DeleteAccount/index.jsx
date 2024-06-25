import { useTranslation } from "react-i18next"
import { ButtonFocus } from "../../Button/ButtonFocus"
import { useEffect, useState } from "react"
import { ButtonWarning } from "../../Button/ButtonWarning"
import { LayoutBasePortal } from "../Layouts/LayoutBase"
import { deleteTokenCookie, getToken } from "../../../token"
import { validateUser } from "../../../services/validate/validateUser"
import { SpinnerLoading } from "../../Loading/SpinnerLoading"
import { useNavigate } from "react-router"
import { deleteProfile } from "../../../services/user/deleteProfile"
import { SettingsInputConfirmAccion, SettingsInputPassword } from "../../Input/Settings"

const DeleteAccountPortal = ({ setPortal }) => {
  const token = getToken()
  const navigate = useNavigate()
  const fieldsDefault = { password: '', confirm: '' }
  const errorFieldsDefault = { error: false, message: '' }
  const validateAccion = {
    'initial': 'stroke-swiks-100',
    'partial': 'stroke-swiks-300',
    'correct': 'stroke-swiks-200'
  }
  const { t } = useTranslation()
  const messageConfirmDelete = t('deleteAccount.CONFIRM')

  const [fields, setFields] = useState(fieldsDefault)
  const [loading, setLoading] = useState(false)
  const [errorFields, setErrorFields] = useState(errorFieldsDefault)
  const [showPassword, setShowPassword] = useState(false)
  const [accionUser, setAccionUser] = useState(validateAccion.initial)

  const onClosePortal = () => setPortal(false)

  const onConfirmAccion = async () => {
    const isCompleteEntries = Object.keys(fields).filter((value) => value !== '').length
    const isValidConfirm = accionUser === validateAccion.correct

    let isValidPassword
    if (!isCompleteEntries) {
      return setErrorFields({ error: true, message: t('deleteAccount.missingFields') })
    }

    if (!isValidConfirm) {
      return setErrorFields({ error: true, message: t('deleteAccount.errorConfirm') })
    }

    try {
      setLoading(true)
      const response = await validateUser({
        token,
        t,
        password: fields.password,
        type: t('general.delete').toLowerCase()
      })
      isValidPassword = response.isValidPassword
    } catch (error) {
      return setErrorFields({ ...error });
    } finally {
      setTimeout(() => {
        setLoading(false)
      }, 500)
    }

    if (!isValidPassword) {
      return setErrorFields({ error: true, message: t('deleteAccount.errorPassword') })
    }

    if (isValidPassword) {
      setErrorFields(errorFieldsDefault)
    }

    try {
      await deleteProfile({ token ,  t })
      deleteTokenCookie()
      navigate('/account')
    } catch (error) {
      console.log(error)
      setErrorFields({ ...error })
    }
  }

  useEffect(() => {
    const lengthConfirm = fields.confirm.length

    if (lengthConfirm === 0) setAccionUser(validateAccion.initial)
    if (lengthConfirm > 0) {
      if (fields.confirm.toLowerCase() === messageConfirmDelete.toLowerCase()) {
        setAccionUser(validateAccion.correct)
      } else {
        setAccionUser(validateAccion.partial)
      }
    }

  }, [fields.confirm])


  return (
    <LayoutBasePortal setPortal={setPortal}>
      <h1 className="text-lg font-semibold text-liwr-900 dark:text-perl-100">
        {t("deleteAccount.title")}
      </h1>
      <p className="text-liwr-900 dark:text-perl-100 text-sm font-light">
        {t("deleteAccount.instruction")}
        <span className="font-semibold">
          {t('deleteAccount.CONFIRM')}
        </span>
      </p>
      <div className="relative transition-colors duration-300 mt-6 min-h-16 ">

        {!loading && (
          <>
            <div className="grid gap-3">
              <SettingsInputPassword
                title={t("fields.password")}
                placeholder={t('editAccount.writePassword')}
                typeField={'password'}
                fields={fields}
                setFields={setFields}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <SettingsInputConfirmAccion 
                title={t("deleteAccount.confirmAccion")}
                placeholder={t('deleteAccount.instructionConfirm')}
                typeField={'confirm'}
                fields={fields}
                setFields={setFields}
                accionUser={accionUser}
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

        { loading && (
          <SpinnerLoading className={"h-[252px]"} />
        )}

        <div className=" flex gap-2 justify-end">
          <ButtonFocus
            text={t('buttons.cancel')}
            className={"w-32 text-sm font-semibold"}
            onClick={onClosePortal}
          />
          <ButtonWarning
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

export { DeleteAccountPortal }
