import { useTranslation } from "react-i18next";

const SettingsPreviewGroup = ({ className, info }) => {
  const isConditionValid = (input, condition) => input !== condition;
  const { category, color, is_public } = info;
  const { t } = useTranslation();

  return (
    <div className={`${className} grid gap-4 max-w-52 overflow-x-auto`}>
      <div className="">
        <h1 className="text-end text-base font-medium text-liwr-900 dark:text-perl-100">
          {t("general.category")}
        </h1>
        <h1
          className={`text-end text-sm break-words leading-none ${
            isConditionValid(category, "")
              ? "text-liwr-800 dark:text-perl-200"
              : "text-liwr-900/50 dark:text-perl-100/50"
          }`}
        >
          {category || t("groupChatPreview.setCategory")}
        </h1>
      </div>
      <div className="">
        <h1 className="text-end text-base font-medium leading-none text-liwr-900 dark:text-perl-100">
          {t("general.management")}
        </h1>
        <p className="text-sm text-liwr-800 dark:text-perl-200 text-end" >
          { t(`management.${is_public ? 'public' : 'private'}`)}
        </p>
      </div>
      <div className="">
        <h1 className="text-end text-base font-medium leading-none text-liwr-900 dark:text-perl-100">
          {t("general.color")}
        </h1>
        <p className={`text-sm font-semibold dark:font-normal text-grp-${color}-200 dark:text-grp-${color}-400 text-end`} >
          {t(`colorsUsers.${color}`)}
        </p>
      </div>
    </div>
  );
};

export { SettingsPreviewGroup };
