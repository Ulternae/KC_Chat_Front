import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

const ChatNewPreview = ({ chat, index }) => {
  const [showPopover, setShowPopover] = useState(false);
  const hasParticipants = chat.participants?.length > 0;
  const textRef = useRef(null);
  const popoverRef = useRef(null);

  const handleMouseEnter = () => setShowPopover(true);
  const handleMouseLeave = () => setShowPopover(false);

  const handleClickOutside = (event) => {
    if (
      popoverRef.current &&
      !popoverRef.current.contains(event.target) &&
      !textRef.current.contains(event.target)
    ) {
      setShowPopover(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const { t } = useTranslation();
  return (
    <div className="relative flex gap-2 items-center">
      <div className="w-2 h-2 rounded-full bg-liwr-400 dark:bg-perl-300" />
      <p
        className="text-liwr-800 dark:text-perl-200 cursor-pointer"
        onClick={handleMouseEnter}
        ref={textRef}
      >
        {chat.chat_name || `${t("general.chat")} ${index + 1}`}
      </p>
      {showPopover && (
        <div
          className="z-10 absolute bg-liwr-400 dark:bg-perl-600 left-10 -top-3 w-52 overflow-x-auto overflow-y-hidden rounded px-2 pb-4 pt-4 text-sm grid gap-1"
          ref={popoverRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {!hasParticipants && (
            <p className="text-liwr-900/50 dark:text-perl-100/50 leading-none">
              {t("groupChat.noHaveParticipants")}
            </p>
          )}
          {hasParticipants && (
            <>
              <h3 className="mb-1 text-end text-xs font-medium text-liwr-900 dark:text-perl-100">
                {t("general.participants")}
              </h3>
              {chat.participants.map((participant) => (
                <div
                  className="flex gap-2 items-center"
                  key={participant.friend_id}
                >
                  <img
                    className="w-4 h-4 rounded-full object-cover"
                    src={participant.avatar_url}
                    alt={participant.nickname}
                  />
                  <p className="text-liwr-900 dark:text-perl-100 font-light text-xs">
                    {participant.nickname}
                  </p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export { ChatNewPreview };
