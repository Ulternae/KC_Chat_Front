import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Logo } from "../../assets/Logo";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../services/create/createUser";
import { ButtonBase } from "../Button/ButtonBase";
import { InputLogin } from "../Input/InputLogin";
import { createUserGoogle } from "../../services/create/createUserGoogle";
import { TitleSession } from "./TitleSession";
import { saveToken } from "../../token";
import { SpinnerLoading } from "../Loading/SpinnerLoading";
import { ChatContext } from "../../context/Provider";

/* global google */

const Create = () => {
  const navigate = useNavigate();
  const fieldEntries = { nickname: "", password: "", email: "" };
  const resetError = { type: "", error: false }
  const { t } = useTranslation();
  const { setCurrentRoute , language , theme } = useContext(ChatContext);
  const settings = {language , theme}
  const [entries, setEntries] = useState(fieldEntries);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(resetError);
  const [isRequesting, setIsRequesting] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
  });

  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
      const data = await createUserGoogle({ token: response.credential, settings, t });
      saveToken({ token: data.token });
      navigate("/");
      setCurrentRoute("");
    } catch (e) {
      setError({ ...e });
    } finally {
      setIsRequesting(false);
      setLoading(false);
    }
  };

  const validateEntries = ({ data }) => {
    return Object.values(data).filter((value) => value !== "").length < 3;
  };

  const SignIn = async () => {
    const isNotAllEntries = validateEntries({ data: entries });
    setLoading(true);

    if (isNotAllEntries) {
      setLoading(false);
      return setError({
        error: true,
        type: t("validationFront.insufficientData"),
      });
    } else {
      setError({ error: false, type: "" });
    }

    try {
      const data = await createUser({ dataUser: entries, settings, t }); 
      saveToken({ token: data.token });
      navigate("/");
      setCurrentRoute("");
      setLoading(false);
    } catch (e) {
      setError({ error: true, type: e.message });
      setLoading(false);
    }
  };

  const SignInWithGoogle = () => {
    setError(resetError);
    google.accounts.id.prompt((notification) => {
      if (notification.getSkippedReason() === "tap_outside") {
        google.accounts.id.prompt();
      }
    });
    setIsRequesting(true);
  };

  const onRedirectLogin = () => {
    navigate("/login");
  };

  return (
    <div className="h-[700px] flex w-full lg:grid lg:grid-cols-[1fr_420px] lg:max-w-[1200px] lg:gap-32 lg:w-[90vw]">
      <TitleSession />
      <div className="w-full sm:w-[420px] min-h-[700px] sm:h-[740px] rounded-lg bg-liwr-200 dark:bg-perl-500 shadow-liwr-inset dark:perl-inset px-7 py-10 sm:px-14 sm:pt-10 sm:pb-20 lg:py-24 grid gap-5  grid-rows-[40px_100px_1fr_100px] lg:grid-rows-[100px_1fr_100px]">
        <div className="lg:hidden h-10 justify-end flex ">
          <Logo width="130" height="40" />
        </div>
        <div>
          <h1 className="max-lg:mt-6 text-2xl font-semibold text-liwr-900 dark:text-perl-100">
            {t("register.title")}
          </h1>
          <p
            className="cursor-pointer font-medium text-liwr-700 dark:text-perl-200"
            onClick={onRedirectLogin}
          >
            {t("login.title")}
          </p>
        </div>
        {!loading && (
          <div className="grid">
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
            </div>
            <ButtonBase 
              className={'text-sm font-medium flex justify-self-end place-content-center items-center'}
              onClick={SignIn} text={t("buttons.confirm")}
            />
          </div>
        )}
        {loading && <SpinnerLoading />}
        <div className="flex h-[80px] items-center gap-4">
          <p
            disabled={true}
            className={"font-medium text-sm dark:text-perl-200 text-liwr-800"}
          >
            {t("buttons.continueWithGoogle")}
          </p>
          <button
            onClick={SignInWithGoogle}
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

export { Create };
