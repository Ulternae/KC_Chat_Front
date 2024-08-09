import { useTranslation } from "react-i18next";
import { CardParticipantsPreview } from "@components/Card/CardParticipantsPreview";
import { OPTIONS_PARTICIPANTS } from "@constants";

const ParticipantsPreviewGroup = ({ className, info }) => {
  const { t } = useTranslation();
  const participantsUser = info.filter((p) => p.permissions === OPTIONS_PARTICIPANTS.USER )
  const moderatorsUser = info.filter((p) => p.permissions === OPTIONS_PARTICIPANTS.MODERATOR )
  const participants = participantsUser.concat(moderatorsUser)

  const hasParticipants = info.length !== 0;
  return (
    <div className={`${className} flex flex-col gap-6`}>
      <h1 className="text-base font-medium leading-none text-liwr-900 dark:text-perl-100">
        {t("general.participants")}
      </h1>
      {!hasParticipants && (
        <div className="px-1 py-1 w-full h-8 rounded-lg flex justify-between bg-liwr-400 dark:bg-perl-600">
          <div className="pl-1 w-2/3 flex gap-2 items-center ">
            <div className="w-5 h-5 rounded-full bg-liwr-900/25 dark:bg-perl-100/25" />
            <div className="w-2/4 h-3 rounded-lg bg-liwr-900/25 dark:bg-perl-100/25" />
          </div>
          <div className="w-1/3 bg-liwr-200 dark:bg-perl-500 rounded-lg" />
        </div>
      )}
      {hasParticipants && (
      <div className="grid gap-2 max-h-[240px] overflow-x-hidden overflow-y-auto">
        <>
          {participants.map((participant) => (
            <CardParticipantsPreview
              key={participant.friend_id}
              participant={participant}
            />
          ))}
        </>
      </div>
      )}
    </div>
  );
};

export { ParticipantsPreviewGroup };
