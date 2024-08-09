import { useEffect, useState } from "react";
import { LayoutBasePortal } from "../Layouts/LayoutBase";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "@loading/LoadingSpinner";
import { ButtonFocus } from "../../Button/ButtonFocus";
import { ButtonSecondary } from "../../Button/ButtonSecondary";
import {
  InputFields,
  InputPassword,
} from "../../Input/InputSettings";
import { GoogleLogin } from "@components/Google/GoogleLogin";
import { loginUserGoogle } from "@services/login/loginUserGoogle";
import { LoginUser } from "@services/login/loginUser"
import { saveToken } from "@token";

const ChangeAccountPortal = ({ setPortal }) => {
  const defaultFields = { nickname: "", password: "", email: "" };
  const defaultErrorFields = { error: false, message: "" };
  const { t } = useTranslation();
  const [fields, setFields] = useState(defaultFields);
  const [loading, setLoading] = useState(false);
  const [errorFields, setErrorFields] = useState(defaultErrorFields);
  const [showPassword, setShowPassword] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: false,
    });
  });

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
      const data = await loginUserGoogle({ token: response.credential, t });
      setErrorFields(defaultErrorFields);
      saveToken({ token: data.token });
      window.location.reload();
    } catch (error) {
      setErrorFields({ error: true, message: error.type});
    } finally {
      setLoading(false);
      setIsRequesting(false);
    }
  };    

  const onClosePortal = () => setPortal(false);

  const onConfirmAccion = async () => {
    const getAllEntries = Object.entries(fields).map(([key, value]) => [key, value.trim()]);
    const getValidValues = getAllEntries.filter(([_, value]) => value !== '')

    if (getValidValues.length !== getAllEntries.length) {
      return setErrorFields({
        error: true,
        message: t("changeAccount.missingFields"),
      });
    } else {
      setErrorFields(defaultErrorFields)
    }

    try {
      const data = await LoginUser({ dataUser: Object.fromEntries(getAllEntries), t });
      setErrorFields(defaultErrorFields)
      saveToken({ token: data.token})
      window.location.reload();
    } catch (error) {
      setErrorFields({...error});
    } finally {
      setLoading(false)
    }
  };

  return (
    <LayoutBasePortal setPortal={setPortal}>
      <h1 className="w-full text-lg font-semibold text-liwr-900 dark:text-perl-100">
        {t("changeAccount.title")}
      </h1>
      <p className="text-liwr-900 dark:text-perl-100 text-sm font-light">
        {t("changeAccount.instruction")}
      </p>
      <div className="relative transition-colors duration-300 mt-10 min-h-16 ">
        {!loading && (
          <>
            <div className="grid gap-3">
              <InputFields
                title={t("fields.nickname")}
                placeholder={t("changeAccount.nicknamePlaceholder")}
                typeField={"nickname"}
                fields={fields}
                setFields={setFields}
              />
              <InputPassword
                title={t("fields.password")}
                placeholder={t("changeAccount.passwordPlaceholder")}
                typeField={"password"}
                fields={fields}
                setFields={setFields}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <InputFields
                title={t("fields.email")}
                placeholder={t("changeAccount.emailPlaceholder")}
                typeField={"email"}
                fields={fields}
                setFields={setFields}
              />

              <div className="flex  px-8 py-4 mt-3 rounded-md bg-liwr-200 dark:bg-perl-600 justify-center h-16">
                <GoogleLogin
                  setError={setErrorFields}
                  resetError={defaultErrorFields}
                  isRequesting={isRequesting}
                  setIsRequesting={setIsRequesting}
                  text={t("buttons.switchAccountWithGoogle")}
                  textStyle={"font-medium text-sm text-liwr-900 dark:text-perl-100"}
                />
              </div>
            </div>

            <div className="min-h-10 mt-6 mb-6 flex items-center justify-center">
              {errorFields.error && (
                <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
                  {errorFields.message}
                </p>
              )}
            </div>
          </>
        )}

        {loading && <LoadingSpinner className={"h-[428px]"} />}

        <div className=" flex gap-2 justify-end">
          <ButtonSecondary
            text={t("buttons.cancel")}
            className={"w-32 text-sm font-semibold dark:font-medium"}
            onClick={onClosePortal}
          />
          <ButtonFocus
            text={t("buttons.confirm")}
            className={`${
              loading ? "cursor-not-allowed" : ""
            } w-32 text-sm font-semibold`}
            onClick={onConfirmAccion}
          />
        </div>
      </div>
    </LayoutBasePortal>
  );
};

export { ChangeAccountPortal };
