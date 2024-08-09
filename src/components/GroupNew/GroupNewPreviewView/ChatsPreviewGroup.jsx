import { useTranslation } from "react-i18next";
import { ChatNewPreview } from "@components/Chat/ChatNewPreview";

const ChatsPreviewGroup = ({ className, info }) => {
  const { t } = useTranslation();
  const hasChats = info.length > 0;

  return (
    <div className={`${className} flex flex-col gap-2`}>
      <h1 className="text-base font-medium leading-none text-liwr-900 dark:text-perl-100">
        {t("general.chats")}
      </h1>
      {!hasChats && (
        <p 
          className="text-base font-semibold leading-none text-liwr-900/50 dark:text-perl-100/50"
        >
          {t('groupChat.noHaveChats')}
        </p>
      )}
      {hasChats && (
        <div className="min-h-[120px] h-full max-h-[240px] overflow-x-hidden overflow-y-auto pt-4">
          {info.map((chat, index) => <ChatNewPreview key={chat.chat_id} index={index} chat={chat} />)}
        </div>
      )}
    </div>
  );
};

export { ChatsPreviewGroup }