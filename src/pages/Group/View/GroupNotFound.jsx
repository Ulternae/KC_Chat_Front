import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";

const GroupNotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate()
  return (
    <div className="flex rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 w-full h-full relative transition-colors duration-300 max-w-full sm:max-w-[1111px]">
      <div className="flex flex-col gap-8 h-full w-full justify-between">
        <img
          className=" w-auto max-w-[260px] sm:max-w-[600px]"
          src="headerSalamander.png"
        />
        <span className="font-semibold inline text-center text-lg sm:text-xl leading-none">
          <span className="text-liwr-900 dark:text-perl-200">
            {t("groups.groupNotFound")}
            {". "}
          </span>
          <span 
            className=" transition-colors duration-300 text-liwr-800 dark:text-perl-100/80 hover:text-liwr-700 hover:dark:text-perl-100 cursor-pointer"
            onClick={() => navigate('/groups')}
          >
            {t("groups.availableGroups")}
          </span>
        </span>
        <div className="pb-8">
          <img
            className="m-auto transform scale-x-[-1] w-full max-w-[260px] sm:max-w-[500px] object-contain"
            src="salamander.png"
          />
        </div>
      </div>
    </div>
  );
};

export { GroupNotFound };
