import { useContext } from "react";
import { ChatContext } from "../../context/Provider";
import { useTranslation } from "react-i18next";
import { NavbarLoading } from "./Loading";
import { IconRefresh } from "../../assets/IconRefresh";
import { IconMessagesFriends } from "../../assets/IconMessagesFriends";
import { useNavigate } from "react-router";
import { avatarNotFoundError } from "../../utils/avatarNotFoundError";

const Navbar = ({ loading, dataUser = {} }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentRoute } = useContext(ChatContext);
  const [primaryRoute, secondaryRoute] = currentRoute.split("/");

  if (loading) return <NavbarLoading />;

  return (
    <div className="w-full h-10 grid grid-cols-2">
      <span className="flex items-center dark:text-perl-100 text-liwr-900 gap-3 h-10">
        {!!primaryRoute && (
          <h1 className="text-2xl font-semibold leading-none">
            {t(`menu.${primaryRoute}`)}
          </h1>
        )}
        {!!secondaryRoute && (
          <h3 className="text-sm leading-none mt-[7px]">
            {t(`menu.${secondaryRoute}`)}
          </h3>
        )}
      </span>
      <div className=" flex justify-end gap-6 items-center">
        <IconRefresh onClick={() => location.reload()} />
        <IconMessagesFriends />
        <div
          className="w-10 h-10 rounded-full bg-liwr-500 dark:bg-perl-200 p-[2px]"
          onClick={() => navigate("/profile/account")}
        >
          <img
            className="w-full h-full object-cover rounded-full"
            src={dataUser.avatar_url || ''}
            alt="Profile user avatar"
            onError={avatarNotFoundError}
          />
        </div>
      </div>
    </div>
  );
};

export { Navbar };
