import { useOutletContext } from "react-router";
import { ButtonFocus } from "../../../components/Button/ButtonFocus";
import {
  InputAccountEdit,
  InputAccountEditPassword,
} from "../../../components/Input/InputAccount";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { SelectAvatarPortal } from "../../../components/Portals/SelectAvatar";
import { useEffect, useMemo, useState } from "react";
import { Change } from "../../../assets/Change";
import { ButtonSecondary } from "../../../components/Button/ButtonSecondary";
import { getAvatars } from "../../../services/avatars/getAvatars";
import { getToken } from "../../../token";
import { avatarNotFoundError } from "../../../utils/avatarNotFoundError";
import { updateProfile } from "../../../services/user/updateProfile";
import { SpinnerLoading } from "../../../components/Loading/SpinnerLoading";

const EditAccount = ({ passwordUser, setEditAccount }) => {
  const resetError = { error: false, message: "" };
  const token = getToken();
  const $profile = document.querySelector("#profile");
  const { t } = useTranslation();
  const { dataUser, setDataUser, loading } = useOutletContext();

  const dataUserAccount = useMemo(
    () => ({
      avatar_url: dataUser.avatar_url,
      avatar_id: dataUser.avatar_id,
      username: dataUser.username,
      nickname: dataUser.nickname,
      email: dataUser.email,
      password: passwordUser,
    }),
    [
      dataUser.avatar_id,
      dataUser.avatar_url,
      dataUser.email,
      dataUser.nickname,
      dataUser.username,
      passwordUser,
    ]
  );

  const { username, nickname, email } = dataUserAccount;
  const { avatar_url, avatar_id } = dataUserAccount;
  const [avatarImgs, setAvatarImgs] = useState([]);
  const [error, setError] = useState(resetError);
  const [portal, setPortal] = useState(false);
  const [avatar, setAvatar] = useState({ avatar_url, avatar_id });
  const [fields, setFields] = useState({ username, nickname, email });
  const [password, setPassword] = useState(dataUserAccount.password);
  const [isLoading, setIsLoading] = useState(loading);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState(loading);
  const [errorAvatar, setErrorAvatar] = useState(resetError);
  const [thereChanges, setThereChanges] = useState(false);
  const fieldsUser = useMemo(
    () => ({ ...avatar, ...fields, password }),
    [avatar, fields, password]
  );

  const tooglePortalAvatar = () => setPortal(!portal);

  useEffect(() => {
    const getAvatar = async () => {
      setIsLoadingAvatar(true);
      try {
        const data = await getAvatars({ token, t });
        setAvatarImgs(data);
      } catch (error) {
        setErrorAvatar({ ...error });
      } finally {
        setTimeout(() => {
          setIsLoadingAvatar(false);
        }, 1000);
      }
    };
    getAvatar();
  }, []);

  useEffect(() => {
    if (JSON.stringify({ ...dataUserAccount }) !== JSON.stringify(fieldsUser)) {
      setThereChanges(true);
    } else {
      setThereChanges(false);
    }
  }, [password, fields, avatar, dataUserAccount, fieldsUser]);

  const onConfirmChanges = async (e) => {
    e.stopPropagation()
    const trimmedUserFields = Object.entries(fieldsUser)
      .map(([key, value]) => {
        if (typeof value === "number") {
          return [key, value];
        } else {
          return [key, String(value).trim()];
        }
      })
      // eslint-disable-next-line no-unused-vars
      .filter(([_, value]) => value !== "");

    const changedFields = trimmedUserFields.filter(
      ([key, value]) => String(dataUserAccount[key]).trim() !== value
    );

    if (changedFields.length === 0) {
      return setError({ error: true, message: t('validationFront.noChangesToSave') });
    }

    const updatedUserData = Object.fromEntries(changedFields);
    setError(resetError);

    try {
      setIsLoading(true);
      const data = await updateProfile({ token, updatedUserData, t });
      setDataUser(data)
      setEditAccount(false)
    } catch (error) {
      setError({ ...error });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };
  const revertChanges = () => {
    setAvatar({ avatar_url, avatar_id });
    setFields({ username, nickname, email });
    setPassword(dataUserAccount.password);
    setThereChanges(false);
  };
  return (
    <>
      <div className=" transition-colors duration-300 w-full flex flex-col  h-full min-h-[620px] bg-liwr-400 dark:bg-perl-500 rounded-md px-4 py-8 sm:px-8 sm:max-w-full 2xl:max-w-[700px]">
        <div className="flex items-center justify-between">
          <h1 className="text-base mb-4 text-liwr-900 dark:text-perl-100 font-medium">
            {t("accountDetails.myAccount")}
          </h1>
          {!thereChanges && (
            <h2 className="text-liwr-900 dark:text-perl-100 font-medium text-sm">
              {t('editAccount.editingAccount')}
            </h2>
          )}
          {thereChanges && (
            <button
              className="transition-colors duration-300 min-w-40 text-sm px-2 flex items-center justify-center min-h-6 bg-liwr-200/70 dark:bg-perl-300/70 hover:bg-liwr-200 hover:dark:bg-perl-300 rounded-lg text-liwr-700 dark:text-perl-200 hover:text-liwr-900 hover:dark:text-perl-100 cursor-pointer"
              onClick={revertChanges}
            >
              {t('editAccount.revertChanges')}
            </button>
          )}
        </div>

        <div className="flex items-end gap-3">
          <div className="relative w-16 h-16 rounded-full bg-liwr-500 dark:bg-perl-300 p-[2px]">
            <img
              className="w-full h-full object-cover rounded-full"
              src={avatar.avatar_url}
              alt={`${dataUser.nickname}'s avatar`}
              onError={avatarNotFoundError}
            />
            <div
              className="absolute cursor-pointer w-5 h-5 right-0 bottom-0 rounded-md border-2 px-[2px] py-[2px] border-liwr-500 dark:border-perl-300 bg-liwr-400 dark:bg-perl-500 grid place-content-center"
              onClick={tooglePortalAvatar}
            >
              <Change />
            </div>
          </div>

          <button
            className="cursor-pointer text-sm text-liwr-900 dark:text-perl-100 font-medium "
            onClick={tooglePortalAvatar}
          >
            {t('editAccount.changeAvatar')}
          </button>
        </div>
        <div className="mt-4 mb-8 h-1 w-full rounded-lg bg-liwr-500 dark:bg-perl-300"></div>
        {!isLoading && (
          <>
            <div className="grid gap-5 ">
              {Object.entries(fields).map(([title]) => (
                <InputAccountEdit
                  key={title}
                  title={title}
                  text={t(`fields.${title}`)}
                  setFields={setFields}
                  fields={fields}
                  placeholder={`${t('editAccount.insertNew')} ${t(`fields.${title}`)}`}
                />
              ))}
              <InputAccountEditPassword
                  title={t(`fields.password`)}
                  password={password}
                  setPassword={setPassword}
              />
            </div>
            <div className="min-h-10 mt-6 mb-6 flex items-center justify-center">
              {error.error && (
                <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
                  {error.message}
                </p>
              )}
            </div>
          </>
        )}
        {isLoading && (
          <div className="flex h-full items-center justify-center">
            <SpinnerLoading className="w-full h-[456px]" />
          </div>
        )}

        <div className="h-9 mt-6 w-full gap-3 flex justify-end">
          <ButtonSecondary
            className={"font-medium dark:font-normal text-sm"}
            text={"Cancel"}
            onClick={() => setEditAccount(false)}
          />
          <ButtonFocus
            className={`${
              !thereChanges ? "cursor-not-allowed" : ""
            } font-normal dark:font-medium text-sm`}
            text={"Confirm Changes"}
            disabled={!thereChanges}
            onClick={onConfirmChanges}
          />
        </div>
      </div>

      {portal &&
        $profile &&
        createPortal(
          <SelectAvatarPortal
            setPortal={setPortal}
            setAvatar={setAvatar}
            avatar={avatar}
            avatarImgs={avatarImgs}
            errorAvatar={errorAvatar}
            isLoadingAvatar={isLoadingAvatar}
          />,
          $profile
        )}
    </>
  );
};

export { EditAccount };
