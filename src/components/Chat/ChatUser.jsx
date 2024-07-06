import { MarkdownEditor } from "../Markdown/MarkdownEditor";
import { MarkdownView } from "../Markdown/MarkdownView";

const ChatUser = ({
  user,
  chat,
  avatar,
  sendMessageChat,
  messages,
  isGroup,
}) => {
  const messagesChat = messages.filter(({ room }) => room === chat.chat_id)

  return (
    <main className="relative pt-10 sm:pt-0 lg:pt-10 xl:pt-0 grid grid-rows-[55px_1fr] col-span-2 sm:col-span-1 sm:row-start-1 sm:row-end-3 sm:col-start-2 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-start-1 xl:row-end-3 xl:col-start-2 w-full h-full">
      <header className="bg-liwr-500 dark:bg-perl-600 rounded-t-lg px-8 flex items-center gap-4">
        <img className="w-6 h-6 rounded-full object-cover" src={avatar} />
        <h1 className="text-sm font-medium text-liwr-100 dark:text-perl-100 leading-none">
          {chat.name}
        </h1>
      </header>
      <section className="scrollbar-liwr-300 dark:scrollbar-perl-400 overflow-y-auto sm:px-4 py-6 bg-liwr-400 dark:bg-perl-500 rounded-b-lg flex flex-col gap-4">
        <div className="flex flex-col gap-4 overflow-y-scroll overflow-x-hidden max-h-[480px] pl-2 sm:pl-4 sm:pr-2">
          {messagesChat && messagesChat.length > 0 && messagesChat.map((message) => {
            const isFriendMessage = message.user_id !== user.user_id;
            return (
              <div
                key={crypto.randomUUID()}
                className={`word-wrap flex flex-col max-w-[75%] md:max-w-[60%] min-w-48 px-4 py-2 rounded-lg text-perl-100 text-xs  ${
                  isFriendMessage
                    ? "bg-liwr-200 dark:bg-perl-300 self-start"
                    : "bg-liwr-600 dark:bg-perl-600 self-end"
                }`}
              >
                { isGroup && ( <p className={`${isFriendMessage ? 'text-liwr-700  dark:text-perl-200' : 'hidden'} font-semibold dark:font-normal truncate text-xs`}>{message.nickname}</p>)}
                <MarkdownView data={message.content} />
                <div className="text-[10px] font-light text-end">
                  <relative-time datetime={message.send_at} format="relative" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="scrollbar-liwr-400 dark:scrollbar-perl-200 mt-auto">
          <MarkdownEditor chat={chat} sendMessageChat={sendMessageChat} />
        </div>
      </section>
    </main>
  );
};

export { ChatUser };
