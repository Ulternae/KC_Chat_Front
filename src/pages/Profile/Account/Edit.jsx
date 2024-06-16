import { useOutletContext } from "react-router";
import { ButtonFocus } from "../../../components/Button/ButtonFocus";
import { InputAccountEdit, InputAccountEditPassword } from "../../../components/Input/InputAccount";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { SelectAvatarPortal } from "../../../components/Portals/SelectAvatar"
import { useState } from "react";
import { Change } from "../../../assets/Change";
import { ButtonSecondary } from "../../../components/Button/ButtonSecondary";

const EditAccount = ({ passwordUser, setEditAccount }) => {
  const resetError = { error: false, message: '' };
  const $profile = document.querySelector('#profile')
  const { t } = useTranslation();
  const { dataUser, loading } = useOutletContext();
  const [ error, setError ] = useState(resetError)
  const [ avatar, setAvatar ] = useState({avatar_url : dataUser.avatar_url, avatar_id : dataUser.avatar_id})
  const [ password, setPassword ] = useState(passwordUser || '')
  const [ isLoading, setIsLoading ] = useState(loading)
  const [ portal, setPortal ] = useState(false)

  const input = {
    username: dataUser.username,
    nickname: dataUser.nickname,
    email: dataUser.email,
  };
  const [fields, setFields] = useState(input)



  const tooglePortalAvatar = () => setPortal(!portal)
  // avatar_id , avatar_url , email , nickname , user_id , username


  return (
    <>
      <div className=" transition-colors duration-300 w-full flex flex-col gap-6 h-full min-h-[620px] bg-liwr-400 dark:bg-perl-500 rounded-md px-4 py-8 sm:px-8 sm:max-w-full 2xl:max-w-[700px]">
        <div className="flex items-center justify-between">
          <h1 className="text-base text-liwr-900 dark:text-perl-100 font-medium">
            {t("accountDetails.myAccount")}
          </h1>
          <h2 className="text-liwr-900 dark:text-perl-100 font-semibold">Editing Account</h2>
        </div>
        <div>
          <div className="flex items-end gap-3">
            <div className="relative w-16 h-16 rounded-full bg-liwr-500 dark:bg-perl-300 p-[2px]">
              <img
                className="w-full h-full object-cover rounded-full"
                src={avatar.avatar_url}
                alt={`${dataUser.nickname}'s avatar`}
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
              Change avatar
            </button>
          </div>
          <div className="mt-6 mb-10 h-1 w-full rounded-lg bg-liwr-500 dark:bg-perl-300"></div>
          <div className="grid gap-5 ">
            {Object.entries(input).map(([title]) => (
              <InputAccountEdit key={title} title={title} setFields={setFields} fields={fields} />
            ))}
            <InputAccountEditPassword title={'password'} password={password} setPassword={setPassword} />
          </div>
          <div className="min-h-10 mt-6 mb-6 flex items-center justify-center">
            {error && (
              <p className="text-sm text-center text-error-800 dark:text-error-100 font-medium">
                {error.message}
              </p>
            )}
          </div>
          <div className="mt-6 w-full gap-3 flex justify-end">
            <ButtonSecondary
              className={'font-semibold text-sm'}
              text={'Cancel'}
              onClick={() => setEditAccount(false)}
            />
            <ButtonFocus
              className={'font-semibold text-sm'}
              text={'Confirm Changes'}
            />
          </div>
        </div>
      </div>

      {portal &&
        $profile &&
        createPortal(
          <SelectAvatarPortal
            setPortal={setPortal}
            setAvatar={setAvatar}
            avatar={avatar}
          />,
          $profile
        )}
    </>
  );
};

export { EditAccount };
