import { Outlet, useNavigate, useOutletContext } from "react-router";
import { IconUser } from "../../assets/IconUser";
import { IconConfig } from "../../assets/IconConfig";
import { useTranslation } from "react-i18next";
import { ButtonLink } from "../../components/Button/ButtonLink";
import { ProfileLoading } from "./Loading";
import { removeToken } from "../../token";
import { useContext } from "react";
import { ChatContext } from "../../context/Provider";

const Profile = () => {
  const navigate = useNavigate();
  const { setCurrentRoute } = useContext(ChatContext);
  const { t } = useTranslation();
  const { loading, dataUser } = useOutletContext();
  const { nickname, avatar_url } = dataUser;

  const logout = () => {
    removeToken();
    navigate("/login");
    setCurrentRoute("");
  };

  if (loading) return <ProfileLoading />;

  return (
    <div
      id="profile"
      className="flex relative flex-col md:flex-row lg:flex-col xl:flex-row gap-8 max-w-[1111px]"
    >
      <aside className="lg:grid lg:grid-cols-[repeat(2,minmax(280px,320px))] lg:place-content-center lg:grid-rows-[110px_50px] lg:gap-x-10 lg:gap-y-4 xl:flex m-auto lg:m-0 h-full min-w-280 w-full sm:max-w-full md:max-w-[300px] lg:max-w-full xl:max-w-[380px] bg-liwr-400 dark:bg-perl-500 rounded-lg px-4 py-8 sm:px-8 flex flex-col">
        <header className=" mb-8 lg:flex lg:justify-center lg:flex-col lg:mb-0 xl:mb-8 lg:row-start-1 lg:row-end-3">
          <div className="grid grid-cols-[64px_1fr] gap-4 items-center">
            <div className="w-16 h-16  rounded-full bg-liwr-500 dark:bg-perl-300 p-[2px] overflow-hidden">
              <img
                className="w-full h-full object-cover rounded-full"
                src={avatar_url}
                alt={`${nickname}'s avatar`}
              />
            </div>
            <h2 className="truncate  font-medium text-xl text-liwr-900 dark:text-perl-100">
              {nickname}
            </h2>
          </div>
        </header>

        <nav className="mb-8 flex-grow lg:col-start-1 lg:col-end-2 lg:row-start-1 ">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-3 ">
            <li>
              <ButtonLink
                navigateTo={"profile/account"}
                text={t("profile.myAccount")}
                icon={IconUser}
                textStyles="font-medium"
              />
            </li>
            <li>
              <ButtonLink
                navigateTo={"profile/settings"}
                text={t("profile.settings")}
                icon={IconConfig}
                textStyles="font-medium"
              />
            </li>
          </ul>
        </nav>

        <div className="">
          <button
            className="w-full h-12 rounded-lg text-sm text-liwr-900 dark:text-perl-100 cursor-pointer"
            onClick={logout}
          >
            {t("profile.logout")}
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <Outlet context={{ dataUser, loading }} />
      </main>
    </div>
  );
};

export { Profile };
