import { useTranslation } from "react-i18next";
import { Logo } from "../../assets/Logo";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { createUser } from "../../services/create/createUser";
import { ButtonBase } from "../Button/ButtonBase";
import { LoginUser } from "../../services/login/loginUser";
import { InputLogin } from "../Input/InputLogin";
import { TitleSession } from "./TitleSession";
import { loginUserGoogle } from "../../services/login/loginUserGoogle";
import { saveToken } from "../../token";
import { SpinnerLoading } from "../Loading/SpinnerLoading";
import { createUserGoogle } from "../../services/create/createUserGoogle";
import { ChatContext } from "../../context/Provider";

const Login = () => {
  const navigate = useNavigate();
  const fieldEntries = { nickname: "", password: "", email: "" };
  const resetError = { error: false, type: "" };
  const { t } = useTranslation();
  const { setCurrentRoute, language, theme } = useContext(ChatContext);
  const settings = { language, theme }
  const [entries, setEntries] = useState(fieldEntries);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(resetError);
  const [isRequesting, setIsRequesting] = useState(false);
  const [tokenGoogle, setTokenGoogle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
      cancel_on_tap_outside: false,
    });
  });

  const validateEntries = ({ data, length }) => {
    return Object.values(data).filter((value) => value !== "").length < length;
  };

  const validateErrorUserNotFound = () => {
    return error.type === t("errorBack.invalidCredentials");
  };

  const onRedirectCreate = () => {
    navigate("/account");
  };

  const handleCredentialResponse = async (response) => {
    console.log('Encoded JWT ID token: ' + response.credential);
    setLoading(true);
    try {
      const data = await loginUserGoogle({ token: response.credential, t });
      setError(resetError);
      saveToken({ token: data.token });
      navigate("/");
      setCurrentRoute("");
    } catch (error) {
      setTokenGoogle(error.data.token);
      setError({ ...error });
    } finally {
      setLoading(false);
      setIsRequesting(false)
    }
  };

  const onCreateAccount = async () => {
    setLoading(true);

    const createWithGoogle = tokenGoogle === "" ? false : true;

    if (createWithGoogle) {
      const token = tokenGoogle;
      try {
        const data = await createUserGoogle({ token, settings, t });
        saveToken({ token: data.token });
        navigate("/");
        setCurrentRoute("");
      } catch (e) {
        setError({ ...e });
      } finally {
        setIsRequesting(false)
        setLoading(false);
      }
    }

    if (!createWithGoogle) {
      try {
        const data = await createUser({ dataUser: entries, settings, t });
        setError(resetError);
        saveToken({ token: data.token });
        navigate("/");
        setCurrentRoute("");
        setLoading(false);
      } catch (error) {
        setError({ error: true, type: error.message });
        setLoading(false);
      }
    }
  };

  const onSignIn = async () => {
    const isNotAllEntries = validateEntries({ data: entries, length: 3 });
    setLoading(true);

    if (isNotAllEntries) {
      setLoading(false);
      return setError({
        error: true,
        type: t("validationFront.insufficientData"),
      });
    } else {
      setError(resetError);
    }

    try {
      const data = await LoginUser({ dataUser: entries, t });
      setError(resetError);
      saveToken({ token: data.token });
      navigate("/");
      setCurrentRoute("");
      setLoading(false);
    } catch (e) {
      setError({ error: true, type: e.message });
      setLoading(false);
    }
  };

  const onSignInGoogle = () => {
    setError(resetError)
    if (window.google && window.google.accounts && window.google.accounts.id) {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // metodo alternativo
          initiateAlternativeGoogleSignIn();

        }
      });
    } else {
      // metodo alternativo
      initiateAlternativeGoogleSignIn();

    }
    setIsRequesting(true);
  };

  const initiateAlternativeGoogleSignIn = () => {
    setLoading(true);
    document.querySelector(".google-signin-button-alternative").classList.remove("hidden");
    document.querySelector(".google-signin-button").classList.add("hidden");
    setLoading(false)
  };

  return (
    <div className="h-[700px] flex w-full lg:grid lg:grid-cols-[1fr_420px] lg:max-w-[1200px] lg:gap-32 lg:w-[90vw]">
      <TitleSession />

      <div className=" w-full sm:w-[420px] min-h-[700px] sm:h-[740px] rounded-lg bg-liwr-200 dark:bg-perl-500 shadow-liwr-inset dark:perl-inset px-7 py-10 sm:px-14 sm:pt-10 sm:pb-20 lg:py-24 grid gap-5  grid-rows-[40px_100px_1fr_100px] lg:grid-rows-[100px_1fr_100px]">
        <div className="lg:hidden h-10 justify-end flex ">
          <Logo width="130" height="40" />
        </div>
        <div>
          <h1 className="max-sm:mb-1 max-lg:mt-6 text-2xl font-semibold text-liwr-900 dark:text-perl-100">
            {t("login.title")}
          </h1>
          <span className="mt-3 grid sm:flex sm:gap-2 items-center">
            <p className="text-sm font-medium text-liwr-900 dark:text-perl-100">
              {t("login.newUser")}
            </p>
            <p
              className="cursor-pointer font-medium text-liwr-700 dark:text-perl-200"
              onClick={onRedirectCreate}
            >
              {t("login.createAccount")}
            </p>
          </span>
        </div>
        {!loading && (
          <div className="grid ">
            {Object.keys(fieldEntries).map((value) => (
              <InputLogin
                key={value}
                value={value}
                entries={entries}
                setEntries={setEntries}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            ))}
            <div className="min-h-10">
              {error.error && (
                <p className="text-center text-sm text-warn-800 dark:text-warn-100 font-semibold">
                  {error.type}
                </p>
              )}
              {validateErrorUserNotFound() && (
                <p
                  className="text-center cursor-pointer text-sm text-warn-800 dark:text-warn-100 font-semibold mb-4"
                  onClick={onCreateAccount}
                >
                  {t("login.wantCreateAccount")}
                </p>
              )}
            </div>
            {validateErrorUserNotFound() ? (
              <ButtonBase
                className={'text-sm font-medium flex justify-self-end place-content-center items-center'}
                onClick={onCreateAccount}
                text={t("login.createAccount")}
              />
            ) : (
              <ButtonBase
                className={'text-sm font-medium flex justify-self-end place-content-center items-center'}
                onClick={onSignIn}
                text={t("buttons.confirm")}
              />
            )}
          </div>
        )}
        {loading && <SpinnerLoading />}
        <div
          className="google-signin-button-alternative hidden"
          ref={(el) => {
            if (el && window.google && window.google.accounts.id) {
              window.google.accounts.id.renderButton(el, {
                theme: "outline",
                text: "signin",
                width: "200"
              });
            }
          }}
        ></div>
        <div className="google-signin-button flex h-[80px] items-center gap-4">
          <p
            disabled={true}
            className={"font-medium text-sm dark:text-perl-200 text-liwr-800"}
          >
            {t("buttons.continueWithGoogle")}
          </p>
          <button
            onClick={onSignInGoogle}
            disabled={isRequesting}
            className={`${isRequesting ? "cursor-not-allowed" : ""}`}
          >
            <img src="gmail.svg" alt="Gmail Sign In" />
          </button>
        </div>
      </div>
    </div>
  );
};

export { Login };
