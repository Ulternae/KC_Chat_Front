import { useTranslation } from "react-i18next";
import { Logo } from "@assets/Logo";

const HeaderAccount = () => {
  const { t } = useTranslation();

  return (
    <div className="flex-col justify-center gap-12 hidden lg:flex">
      <Logo width="320" height="96" />
      <span className="text-end">
        <h2 className="text-3xl text-liwr-900 dark:text-perl-100">
          {t("general.chatRealTime")}
        </h2>
        <h1 className="text-5xl font-semibold text-liwr-900 dark:text-perl-100">
          {t("general.kanbanConnect")}
        </h1>
      </span>
    </div>
  );
};

export { HeaderAccount };
