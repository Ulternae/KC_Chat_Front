import { useTranslation } from "react-i18next";
import { ButtonFocus } from "../../../components/Button/ButtonFocus";
import { ButtonBase } from "../../../components/Button/ButtonBase";
import { ButtonWarning } from "../../../components/Button/ButtonWarning";
import { SelectOptions } from "../../../components/Select/SelectOptions";
import { useOutletContext } from "react-router";
import { SettingsLoading } from "./Loading";
import { useContext } from "react";
import { ChatContext } from "../../../context/Provider";

const Settings = () => {
  const context = useOutletContext();
  const { language, setLanguage, theme, setTheme } = useContext(ChatContext)
  const optionsLanguage = ["en", "es", "gl"]
  const optionsTheme = ["darkMode", "lightMode"]

  const { t } = useTranslation();

  if (!context) return <SettingsLoading />;

  const { loading } = context;

  if (loading) return <SettingsLoading />

  return (
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
            options={optionsLanguage}
            typeTranslate={"languages"}
            valueOption={language}
            setValueOption={setLanguage}
          />

          <SelectOptions
            title={t("settings.mode")}
            options={optionsTheme}
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
            />
            <ButtonWarning
              className={"font-medium text-sm w-44"}
              text={t("deleteAccount.title")}
            />
          </div>
        </div>
      
      <div className="mt-auto">
        <ButtonBase className={"w-32 text-sm"} text={t("settings.logout")} />
      </div>
    </div>
  );
};
export { Settings };
