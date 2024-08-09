import { useTranslation } from "react-i18next";

const CardParticipantsPreview = ({ participant }) => {
  const { t } = useTranslation()
  return (
    <div className="px-1 py-1 w-full h-8 rounded-lg flex justify-between bg-liwr-400 dark:bg-perl-600">
      <div className="pl-1 w-2/3 flex gap-2 items-center ">
        <img
          className="w-5 h-5 rounded-full bg-liwr-900/25 dark:bg-perl-100/25"
          src={participant.avatar_url}
        />
        <p className="truncate text-liwr-900 dark:text-perl-100 font-light text-base">{participant.nickname}</p>
      </div>
      <div className="w-1/3 bg-liwr-200 dark:bg-perl-500 rounded-lg grid place-content-center" >
        <p className=" text-liwr-700 dark:text-perl-200 text-sm">{t(`general.${participant.permissions}`)}</p>
      </div>
    </div>
  );
};

export { CardParticipantsPreview };
