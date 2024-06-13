import { useTranslation } from "react-i18next";
import { Hidden } from "../../assets/Hidden";
import { Show } from "../../assets/Show";

const InputLogin = ({
  value,
  entries,
  setEntries,
  showPassword,
  setShowPassword,
}) => {
  const isPassword = value === "password";
  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const { t } = useTranslation();
  const autocomplete = {
    username: 'given-name',
    password: 'new-password',
    email: 'email',
  };

  return (
    <div key={value} className="h-[70px]">
      <p className="font-medium text-sm dark:text-perl-200 text-liwr-800 mb-2">
        {t(`fields.${value}`)}
      </p>
      <form className="relative text-liwr-900 dark:text-perl-100 autocomplete-liwr-900 dark:autocomplete-perl-100 ">
      {isPassword && (
          <input
            type="text"
            name="username"
            value={entries["username"] || ""}
            autoComplete="username"
            onChange={(e) => setEntries({ ...entries, username: e.target.value })}
            className="hidden"
          />
        )}
        
        <input
          name={value}
          type={isPassword && !showPassword ? "password" : "text"}
          value={entries[value]}
          autoComplete={autocomplete[value]}
          onChange={(e) => setEntries({ ...entries, [value]: e.target.value })}
          className=" text-liwr-900 dark:text-perl-100 px-2 bg-transparent w-full border-b-4 dark:border-perl-200 border-liwr-800 focus:outline-none rounded-lg"
        />
        {isPassword && (
          <>
            <button
              type="button"
              onClick={onToggleShowPassword}
              className="absolute inset-y-0 right-2 flex items-center h-6 mb-2 -top-2"
            >
              {showPassword ? <Show /> : <Hidden />}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export { InputLogin };
