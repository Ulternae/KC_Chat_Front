import { ChatLoading } from "./Chat";
import { ChatsUserLoading } from "./ChatsUser";

const MessagesLoading = ({ showChat = true }) => {
  return (
      <div className="scrollbar-liwr-300 dark:scrollbar-perl-300 grid h-full max-w-[1111px] gap-6 lg:gap-x-0 xl:gap-6 sm:grid-cols-[218px_1fr] lg:grid-cols-1 xl:grid-cols-[218px_1fr] 2xl:grid-cols-[318px_1fr]">
        <ChatsUserLoading />
        {showChat && <ChatLoading />}
      </div>
  );
};

export { MessagesLoading };
