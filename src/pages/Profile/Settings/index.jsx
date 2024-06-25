import { useTranslation } from "react-i18next";
import { ButtonFocus } from "@/components/Button/ButtonFocus";
import { ButtonBase } from "@/components/Button/ButtonBase";
import { ButtonWarning } from "@/components/Button/ButtonWarning";
import { SelectOptions } from "@/components/Select/SelectOptions";
import { useNavigate, useOutletContext } from "react-router";
import { SettingsLoading } from "./Loading";
import { useContext, useState } from "react";
import { ChatContext } from "@/context/Provider";
import { removeToken } from "@/token";
import { createPortal } from "react-dom";
import { DeleteAccountPortal } from "@/components/Portals/DeleteAccount";
import { ChangeAccountPortal } from "@/components/Portals/ChangeAccount";

const Settings = () => {
  const context = useOutletContext();
  const navigate = useNavigate()
  const $profile = document.querySelector('#profile')
  const { language, setLanguage, theme, setTheme } = useContext(ChatContext)
  const { setCurrentRoute, settingsData } = useContext(ChatContext)
  const { t } = useTranslation();
  const [portalDeleteAccount, setPortalDeleteAccount] = useState(false)
  const [portalChangeAccount, setPortalChangeAccount] = useState(false)

  if (!context) return <SettingsLoading />;
  const { loading } = context;
  if (loading) return <SettingsLoading />

  const onOpenDeleteAccount = () => setPortalDeleteAccount(true)
  const onOpenChangeAccount = () => setPortalChangeAccount(true)
  const onLogout = () => {
    removeToken()
    setCurrentRoute('')
    navigate('/login')
  }

  return (
    <>
      <div className=" transition-colors duration-300 w-full flex flex-col gap-16 h-full min-h-[620px] bg-liwr-400 dark:bg-perl-500 rounded-md px-4 py-8 sm:px-8 sm:max-w-full 2xl:max-w-[700px]">
        <div >
          <h1 className="text-base text-liwr-900 dark:text-perl-100 font-medium">
            {t("settings.title")}
          </h1>
        </div>

        <div>
          <h2 className="text-liwr-900 dark:text-perl-100 font-light">
            {t("settings.general")}
          </h2>
          <div className="h-1 mb-10 mt-2 w-full rounded-lg bg-liwr-500 dark:bg-perl-300"></div>
          <SelectOptions
            title={t("settings.language")}
            options={settingsData.languages}
            typeTranslate={"languages"}
            valueOption={language}
            setValueOption={setLanguage}
          />

          <SelectOptions
            title={t("settings.mode")}
            options={settingsData.themes}
            typeTranslate={"settings"}
            valueOption={theme}
            setValueOption={setTheme}
          />
        </div>
        <div>
          <h2 className="text-liwr-900 dark:text-perl-100 font-light">
            {t("settings.account")}
          </h2>
          <div className="h-1 mb-10 mt-2 w-full rounded-lg bg-liwr-500 dark:bg-perl-300"></div>
          <div className="grid gap-2 sm:flex sm:gap-6">
            <ButtonFocus
              className={"font-medium text-sm w-44"}
              text={t("changeAccount.title")}
              onClick={onOpenChangeAccount}
            />
            <ButtonWarning
              className={"font-medium text-sm w-44"}
              text={t("deleteAccount.title")}
              onClick={onOpenDeleteAccount}
            />
          </div>
        </div>

        <div className="mt-auto">
          <ButtonBase
            className={"w-32 text-sm"}
            text={t("settings.logout")}
            onClick={onLogout}
          />
        </div>
      </div>
      { portalDeleteAccount && $profile && 
        createPortal(
          < DeleteAccountPortal 
            setPortal = { setPortalDeleteAccount }
          /> , $profile
        )
      }
      { portalChangeAccount && $profile && (
        createPortal(
          < ChangeAccountPortal 
            setPortal= { setPortalChangeAccount}
          /> , $profile
        )
      )}
    </>
  );
};
export { Settings };
