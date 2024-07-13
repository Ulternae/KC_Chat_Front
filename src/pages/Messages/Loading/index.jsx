import { ChatLoading } from "./Chat";
import { ChatsUserLoading } from "./ChatsUser";

const MessagesLoading = ({ showChat = true }) => {
  return (
    <div className="animate-pulse">
      <div className="grid h-full max-w-[1111px] sm:gap-x-6 grid-rows-[auto_auto_740px] sm:grid-rows-[2fr_3fr] grid-cols-[218px_1fr] lg:grid-cols-1 lg:grid-rows-[auto_auto_740px] xl:grid-cols-[218px_1fr] xl:grid-rows-[2fr_3fr]">
        <ChatsUserLoading />
        {showChat && <ChatLoading />}
      </div>
    </div>
  );
};

export { MessagesLoading };
