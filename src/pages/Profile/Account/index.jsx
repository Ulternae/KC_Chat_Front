import { useOutletContext } from "react-router";
import { ButtonFocus } from "../../../components/Button/ButtonFocus";
import { InputAccountText } from "../../../components/Input/InputAccount";
import { useTranslation } from "react-i18next";
import { AccountLoading } from "./Loading";
import { useState } from "react";
import { createPortal } from "react-dom";
import { EditAccountPortal } from "../../../components/Portals/EditAccount";
import { EditAccount } from "./Edit";

const Account = () => {
  const context = useOutletContext();
  const $profile = document.querySelector("#profile");
  const { t } = useTranslation();
  const [ portal, setPortal ] = useState(false);
  const [ editAccount, setEditAccount ] = useState(false);
  const [ passwordUser, setPasswordUser ] = useState('')

  if (!context) {
    return <AccountLoading />;
  }

  const { dataUser, loading } = context;

  if (loading) return <AccountLoading />;
  if (editAccount) return <EditAccount setEditAccount={setEditAccount} passwordUser={passwordUser} />;

  const input = {
    username: dataUser.username,
    nickname: dataUser.nickname,
    email: dataUser.email,
  };

  return (
    <>
      <div className=" transition-colors duration-300 w-full flex flex-col gap-6 h-full min-h-[620px] bg-liwr-400 dark:bg-perl-500 rounded-md px-4 py-8 sm:px-8 sm:max-w-full 2xl:max-w-[700px]">
        <div className="flex items-center justify-between">
          <h1 className="text-base text-liwr-900 dark:text-perl-100 font-medium">
            {t("accountDetails.myAccount")}
          </h1>
          <ButtonFocus
            text={t('editAccount.title')}
            className={
              "w-32 text-sm text-liwr-100 font-semibold"
            }
            onClick={() => setPortal(true)}
          />
        </div>
        <div>
          <div className="flex items-end gap-3">
            <div className="w-16 h-16 rounded-full bg-liwr-500 dark:bg-perl-300 p-[2px] overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-full"
                src={dataUser.avatar_url}
                alt={`${dataUser.nickname}'s avatar`}
              />
            </div>
            <p className="text-liwr-900 dark:text-perl-100 font-medium">
              {t("accountDetails.avatar")}
            </p>
          </div>
          <div className="mt-6 mb-10 h-1 w-full rounded-lg bg-liwr-500 dark:bg-perl-300"></div>
          <div className="grid gap-5 ">
            {Object.entries(input).map(([title, text]) => (
              <InputAccountText title={t(`fields.${title}`)} text={text} key={title} />
            ))}
          </div>
        </div>
      </div>

      {portal &&
        $profile &&
        createPortal(
          <EditAccountPortal
            setPortal={setPortal}
            setEditAccount={setEditAccount}
            setPasswordUser={setPasswordUser}
          />,
          $profile
        )}
    </>
  );
};

export { Account };
