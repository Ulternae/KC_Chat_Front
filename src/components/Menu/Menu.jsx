import { useNavigate } from "react-router-dom";
import { Logo } from "../../assets/Logo";
import { ButtonLink } from "../../components/Button/ButtonLink";
import { IconProfile } from "../../assets/IconProfile";
import { IconFriends } from "../../assets/IconFriends";
import { IconGroups } from "../../assets/IconGroups";
import { IconMessages } from "../../assets/IconMessages";
import { IconSettings } from "../../assets/IconSettings";
import { IconLightMode } from "../../assets/IconLightMode";
import { ButtonSettings } from "../../components/Button/ButtonSettings";
import { IconDarkMode } from "../../assets/IconDarkMode";
import { useTheme } from "../../utils/useTheme";
import { IconLeft } from "../../assets/IconLeft";
import { hiddenMenu } from "../../utils/showMenu";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { ChatContext } from "../../context/Provider";

const Menu = ({ ...props }) => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const [isModeDark, toggleMode] = useTheme();
  const { setCurrentRoute } = useContext(ChatContext)

  return (
    <aside {...props}>
      <nav className="KC_menu hidden fixed lg:static lg:flex z-20">
        <div className="h-[580px] h-sm:h-[605px] h-md:h-[820px] w-[250px] lg:w-60 -ml-6 lg:-ml-0 rounded-e-2xl lg:rounded-2xl px-6 py-8 bg-liwr-400 dark:bg-perl-500 flex flex-col justify-between">
          <section>
            <header className="flex justify-between items-center mb-10">
              <Logo
                width="95"
                height="28"
                onClick={() => {
                  navigate("/")
                  setCurrentRoute("/")
                }}
                aria-label="Logo"
              />
              <button
                className="lg:hidden fill-liwr-100 dark:fill-perl-100 cursor-pointer hover:fill-liwr-200 hover:dark:fill-perl-200 transition-colors duration-300"
                onClick={hiddenMenu}
                aria-label="Close menu"
              >
                <IconLeft />
              </button>
            </header>
            <ul className="grid gap-3">
              <li>
                <ButtonLink navigateTo="profile" text={t('menu.profile')} icon={IconProfile} />
              </li>
              <li>
                <ButtonLink navigateTo="friends" text={t('menu.friends')} icon={IconFriends} />
              </li>
              <li>
                <ButtonLink navigateTo="groups" text={t('menu.groups')}  icon={IconGroups} />
              </li>
              <li>
                <ButtonLink
                  navigateTo="messages/friends"
                  text={t('menu.messages')}
                  secondary={t('menu.friends')} 
                  icon={IconMessages}
                />
              </li>
              <li>
                <ButtonLink
                  navigateTo="messages/groups"
                  text={t('menu.messages')}
                  secondary={t('menu.groups')}
                  icon={IconMessages}
                />
              </li>
            </ul>
          </section>
          <footer>
            <ButtonSettings
              icon={IconSettings}
              text={t('menu.settings')} 
              onClick={() => {
                navigate("profile/settings")
                setCurrentRoute("profile/settings")
              }}
            />
            <ButtonSettings
              icon={isModeDark ? IconLightMode : IconDarkMode}
              text={isModeDark ? t('menu.lightMode') : t('menu.darkMode') }
              onClick={toggleMode}
            />
          </footer>
        </div>
      </nav>
    </aside>
  );
};

export { Menu };
