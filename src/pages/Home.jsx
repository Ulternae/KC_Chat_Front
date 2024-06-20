import { Outlet } from "react-router-dom";
import { IconMenu } from "../assets/IconMenu";
import { Menu } from "../components/Menu/Menu";
import { hiddenMenu, openMenu } from "../utils/showMenu";
import { Navbar } from "../components/Navbar";
import { getToken } from "../token";
import { getProfile } from "../services/user/profile";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FailedAccess } from "./States/FailedAccces";
import { ChatContext } from "../context/Provider";
import i18n from "../i18n";
import { updateSettings } from "../services/settings/updateSettings";

const Home = () => {
  const token = getToken();
  const resetError = { error: false, message: "", type: null };
  const { language, setLanguage, theme, setTheme } = useContext(ChatContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState("");
  const [stateError, setStateError] = useState(resetError);

  useEffect(() => {
    const getProfileUser = async () => {
      try {
        const data = await getProfile({ token, t });
        setDataUser(data);
        setLanguage(data.language || language);
        setTheme(data.theme || theme);
      } catch (e) {
        setStateError({ error: true, message: e.message, type: e.type });
      } finally {
        setTimeout(() => { setLoading(false) }, 500);
      }
    };

    getProfileUser();
  }, []);

  useEffect(() => {
    if (theme === "darkMode") document.documentElement.classList.add("dark");
    if (theme === "lightMode")
      document.documentElement.classList.remove("dark");

    i18n.changeLanguage(language);

    const settings = { language, theme };

    localStorage.setItem("KC_CRT", JSON.stringify(settings));

    const updateSettingsDatabase = async () => {
      try {
        await updateSettings({ token, settingsUpdate: settings, t });
        setDataUser((prevDataUser) => ({
          ...prevDataUser,
          language,
          theme,
        }));
      } catch (error) {
        setLanguage(dataUser.language);
        setTheme(dataUser.theme);
      }
    };
    updateSettingsDatabase();
  }, [language, theme]);

  return (
    <div className="bg-liwr-200 dark:bg-perl-800 px-6 py-6 min-h-screen relative">
      <section className="lg:hidden">
        <div
          className="KC_menuBg z-10 fixed hidden top-0 left-0 bottom-0 right-0 bg-liwr-200/70 dark:bg-perl-800/70"
          onClick={hiddenMenu}
        ></div>
        <IconMenu
          className="absolute left-0 cursor-pointer"
          onClick={openMenu}
        />
      </section>
      <section className="grid lg:grid-cols-[250px_1fr] lg:grid-rows-[40px_1fr] gap-x-16 gap-y-10 ">
        <Menu className="lg:row-span-2" />
        {stateError.error && (
          <>
            <nav></nav>
            <FailedAccess error={stateError} />
          </>
        )}
        {!stateError.error && (
          <>
            <Navbar dataUser={dataUser} loading={loading} />
            <Outlet
              context={{
                loading,
                dataUser,
                setDataUser,
              }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export { Home };
