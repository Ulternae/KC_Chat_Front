import { useState, useRef, useEffect } from "react";
import { Show } from "../../../assets/Show";
import { Hidden } from "../../../assets/Hidden";
import { ButtonFocus } from "../../Button/ButtonFocus";
import { ButtonSecondary } from "../../Button/ButtonSecondary";
import { validateUser } from "../../../services/validate/validateUser";
import { getToken } from "../../../token";
import { useTranslation } from "react-i18next";
import { validateUserGoogle } from "../../../services/validate/validateUserGoogle";
import { SpinnerLoading } from "../../Loading/SpinnerLoading";
import { useOutletContext } from "react-router";
import { LayoutBasePortal } from "./../Layouts/LayoutBase";


const EditAccountPortal = ({ setPortal, setEditAccount, setPasswordUser }) => {
  const token = useRef("");
  const resetError = { error: false, message: "" };
  const { t } = useTranslation();
  const { loading } = useOutletContext();
  const [error, setError] = useState(resetError);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(loading);
  const [showPassword, setShowPassword] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);

  const onToggleShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    token.current = getToken();
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
  }, []);

  const handleCredentialResponse = async (response) => {
    setIsLoading(true);
    try {
      const res = await validateUserGoogle({
        tokenSession: token.current,
        tokenGoogle: response.credential,
        t,
      });
      const { isValidPassword, passwordUser } = res;

      if (!isValidPassword) {
        return setError({
          error: true,
          message: t("errorBack.authWrongWithGoogle"),
        });
      }
      setEditAccount(true);
      setPortal(false);
      setPasswordUser(passwordUser);
    } catch (error) {
      setError({ ...error });
    } finally {
      setIsLoading(false);
      setIsRequesting(false);
    }
  };

  const onClosePortal = () => setPortal(false);

  const onConfirmPassword = async () => {
    const isValidPassword = password === "" ? false : true;

    if (!isValidPassword) {
      return setError({ error: true, message: "You need a valid password" });
    }

    setError(resetError);

    try {
      setIsLoading(true);
      const response = await validateUser({
        token: token.current,
        password,
        t,
        type: t('general.edit').toLowerCase()
      });
      const { isValidPassword } = response;

      if (!isValidPassword) {
        return setError({ error: true, message: t("editAccount.error") });
      }
      setPortal(false);
      setEditAccount(true);
      setPasswordUser(password);
    } catch (error) {
      setError({ ...error });
    } finally {
      setIsLoading(false);
      setIsRequesting(false);
    }
  };

  const onConfirmPasswordWithGoogle = () => {
    setError(resetError);
    google.accounts.id.prompt((notification) => {
      if (notification.getSkippedReason() === "tap_outside") {
        google.accounts.id.prompt();
      }
    });
    setIsRequesting(true);
  };
  return (
    <LayoutBasePortal setPortal={setPortal} >
      <h1 className="text-lg font-semibold text-liwr-900 dark:text-perl-100">
        {t("editAccount.title")}
      </h1>
      <p className="text-liwr-900 dark:text-perl-100 text-sm font-light">
        {t("editAccount.instruction")}
      </p>


      <div className="relative transition-colors duration-300 mt-6 min-h-16 ">
        {!isLoading && (
          <div>
            <div className="absolute px-3 py-[2px] left-4 w-32 rounded-md bg-liwr-100 dark:bg-perl-800">
              <p className="text-liwr-900 dark:text-perl-100 text-sm font-medium">
                {t("fields.password")}
              </p>
            </div>

            <div className="pt-3">
              <div className=" w-full min-h-16  bg-liwr-200 dark:bg-perl-600 rounded-lg flex items-center md:px-8 py-4 px-4 ">
                <div className="relative w-full grid grid-cols-[1fr_25px] gap-2 justify-between">
                  <input
                    className=" text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1 focus:outline-none bg-transparent placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/50"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type={showPassword ? "text" : "password"}
                    placeholder={t('editAccount.writePassword')}
                  ></input>
                  <button
                    type="button"
                    onClick={onToggleShowPassword}
                    className="h-6  flex items-center "
                  >
                    {showPassword ? <Show /> : <Hidden />}
                  </button>
                </div>
              </div>
            </div>
            <button
              className={`${isRequesting ? "cursor-not-allowed" : ""
                } mt-3 min-w-44 h-14 flex gap-3 items-center justify-between bg-liwr-200 dark:bg-perl-600 px-4 md:px-8 rounded-lg text-liwr-900 dark:text-perl-100 text-sm`}
              onClick={onConfirmPasswordWithGoogle}
              disabled={isRequesting}
            >
              <span>{t("login.loginWith")}</span>
              <img
                src="./gmail.svg"
                alt="Login with gmail button confirm accion"
              />
            </button>
            <div className="min-h-10 mt-6 mb-6 flex items-center justify-center">
              {error.error && (
                <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
                  {error.message}
                </p>
              )}
            </div>
          </div>
        )}
        {isLoading && <SpinnerLoading className={"h-[232px]"} />}

        <div className=" flex gap-2 justify-end">
          <ButtonSecondary
            text={t('buttons.cancel')}
            className={"w-32 text-sm font-semibold"}
            onClick={onClosePortal}
          />
          <ButtonFocus
            text={t('buttons.confirm')}
            className={`${loading || isLoading ? "cursor-not-allowed" : ""
              } w-32 text-sm font-semibold`}
            onClick={onConfirmPassword}
          />
        </div>
      </div>
    </LayoutBasePortal>


  );
};

export { EditAccountPortal };
