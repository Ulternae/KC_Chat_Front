import { useTranslation } from "react-i18next";
import { Logo } from "../../assets/Logo";
import { useNavigate } from "react-router";
import { useContext, useEffect, useState } from "react";
import { createUser } from "../../services/create/createUser";
import { ButtonLogin } from "../Button/ButtonLogin";
import { LoginUser } from "../../services/login/loginUser";
import { InputLogin } from "../Input/InputLogin";
import { TitleSession } from "./TitleSession";
import { loginUserGoogle } from "../../services/login/loginUserGoogle";
import { saveToken } from "../../token";
import { SpinnerLoading } from "../Loading/SpinnerLoading";
import { createUserGoogle } from "../../services/create/createUserGoogle";
import { ChatContext } from "../../context/Provider";

/* global google */

const Login = () => {
  const navigate = useNavigate();
  const fieldEntries = { username: "", password: "", email: "" };
  const resetError = { error: false, type: "" };
  const { t } = useTranslation();
  const { setCurrentRoute } = useContext(ChatContext);
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
    });
  });

  const validateEntries = ({ data, length }) => {
    return Object.values(data).filter((value) => value !== "").length < length;
  };

  // Valida si el usuario no existe
  const validateErrorUserNotFound = () => {
    return error.type === t("errorBack.invalidCredentials");
  };

  const onRedirectCreate = () => {
    navigate("/account");
  };

  // Al intentar continual con google si falla el login se guarda la info recolectada si no devuelve el token y navega
  const handleCredentialResponse = async (response) => {
    setLoading(true);
    try {
      const data = await loginUserGoogle({ response, t });
      setError(resetError);
      saveToken({ token: data.token });
      navigate("/");
      setCurrentRoute("");
      setLoading(false);
    } catch (error) {
      setTokenGoogle(error.data.token);
      setError({ ...error });
      setLoading(false);
    }
  };

  // Si el usuario no existe y decide crear cuenta
  const onCreateAccount = async () => {
    setLoading(true);

    const createWithGoogle = tokenGoogle === "" ? false : true;

    // manda el token
    if (createWithGoogle) {
      const token = tokenGoogle;
      try {
        const data = await createUserGoogle({ token, t });
        saveToken({ token: data.token });
        navigate("/");
        setCurrentRoute("");
        setLoading(false);
      } catch (e) {
        setError({ ...e });
        setLoading(false);
      }
    }

    // manda el input
    if (!createWithGoogle) {
      try {
        const data = await createUser({ dataUser: entries, t });
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
    google.accounts.id.prompt();
    setIsRequesting(true);
  };

  return (
    <div className="lg:grid lg:grid-cols-[1fr_420px] lg:max-w-[1200px] lg:gap-32 lg:w-[90vw]">
      <TitleSession />
      <div className=" w-[300px] sm:w-[420px] min-h-[700px] sm:h-[740px] rounded-lg bg-liwr-200 dark:bg-perl-500 shadow-liwr-inset dark:perl-inset px-7 py-10 sm:px-14 sm:pt-10 sm:pb-20 lg:py-24 grid gap-5  grid-rows-[40px_100px_1fr_100px] lg:grid-rows-[100px_1fr_100px]">
        <div className="lg:hidden h-10 justify-end flex ">
          <Logo width="130" height="40" />
        </div>
        <div>
          <h1 className="max-sm:mb-1 max-lg:mt-6 text-2xl font-semibold text-liwr-900 dark:text-perl-100">
            {t("login.title")}
          </h1>
          <span className="sm:flex gap-2 items-center">
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
                <p className="text-center text-sm text-liwr-900 dark:text-perl-100 font-semibold">
                  {error.type}
                </p>
              )}
              {validateErrorUserNotFound() && (
                <p
                  className="text-center cursor-pointer text-sm text-liwr-700 dark:text-perl-200 font-semibold mb-4"
                  onClick={onCreateAccount}
                >
                  {t("login.wantCreateAccount")}
                </p>
              )}
            </div>
            {validateErrorUserNotFound() ? (
              <ButtonLogin
                onClick={onCreateAccount}
                text={t("login.createAccount")}
              />
            ) : (
              <ButtonLogin onClick={onSignIn} text={t("buttons.confirm")} />
            )}
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
