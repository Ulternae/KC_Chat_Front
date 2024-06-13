import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { ChatContext } from "../../context/Provider";

const ButtonLink = ({ icon: Icon, navigateTo,  text, secondary, textStyles = 'font-semibold', ...props }) => {
  const baseStyle =
    "w-full h-12 px-4 flex items-center gap-2 rounded-lg transition-colors duration-300 group";
  const hoverStyle =
    "hover:text-liwr-900 hover:dark:text-perl-100 hover:bg-liwr-200 hover:dark:bg-perl-800 hover:shadow-2xl hover:shadow-liwr-focus hover:dark:shadow-perl-focus";
  const activeStyle =
    "text-liwr-900 dark:text-perl-100 bg-liwr-200 dark:bg-perl-800 shadow-2xl shadow-liwr-focus dark:shadow-perl-focus";
  const inactiveStyle =
    "text-liwr-800 dark:text-perl-200 bg-liwr-300 dark:bg-perl-700";

  const { setCurrentRoute } = useContext(ChatContext)

  return (
    <NavLink
      {...props}
      to={`/${navigateTo}`}
      className={({ isActive }) =>
        `${baseStyle} ${hoverStyle} ${isActive ? activeStyle : inactiveStyle}`
      }
      onClick={() => setCurrentRoute(navigateTo)}
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`transition-colors duration-300 group-hover:fill-liwr-900 group-hover:dark:fill-perl-100 ${
              isActive
                ? "fill-liwr-900 dark:fill-perl-100"
                : "fill-liwr-800 dark:fill-perl-200"
            }`}
          />
          <div>
            <p className={`text-sm leading-none ${textStyles}`}>{text}</p>
            {secondary && <p className="text-xs leading-none">{secondary}</p>}
          </div>
        </>
      )}
    </NavLink>
  );
};

export { ButtonLink };
