import { IconClosePersonalized } from "../../assets/IconClosePersonalized";

const ChatInputViewParticipants = ({
  participant,
  accion,
  participantIsUser,
  buttonIsAdd = false,
}) => {
  return (
    <div className="bg-liwr-200 dark:bg-perl-700 w-full min-h-7 rounded-lg flex gap-2 items-center px-4 ">
      <div
        className={`w-2 h-2 rounded-full ${
          participantIsUser
            ? "bg-grp-amber-200 dark:bg-grp-amber-400"
            : "bg-grp-orchid-200 dark:bg-grp-orchid-400"
        } `}
      />
      <img
        className="w-4 h-4 rounded-full object-cover"
        src={participant.avatar_url}
      />
      <p className="text-liwr-900 dark:text-perl-100 text-sm ">
        {participant.nickname}
      </p>

      <IconClosePersonalized
        className={`ml-auto cursor-pointer ${buttonIsAdd ? "rotate-45" : ""} `}
        colorPrimary={
          participantIsUser
            ? "fill-grp-amber-200 dark:fill-grp-amber-400"
            : "fill-grp-orchid-200 dark:fill-grp-orchid-400"
        }
        colorSecondary={
          participantIsUser
            ? "fill-grp-amber-200/50 dark:fill-grp-amber-400/50"
            : "fill-grp-orchid-200/50 dark:fill-grp-orchid-400/50"
        }
        onClick={accion}
      />
    </div>
  );
};

export { ChatInputViewParticipants };
