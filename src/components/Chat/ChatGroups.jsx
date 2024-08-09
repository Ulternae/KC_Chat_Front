import { IconFlagChat } from "../../assets/IconFlagChat";
import { MarkdownEditor } from "../Markdown/MarkdownEditor";
import { MarkdownView } from "../Markdown/MarkdownView";

const ChatGroups = ({ user, chat, group, sendMessageChat, messages }) => {
  if (!chat) return;

  const messagesChat = messages.filter(({ room }) => room === chat.chat_id);
  const infoFriends = group?.detailsUsers;

  return (
    <main className="h-sm:max-h-[715px] h-md:max-h-[740px] min-h-[525px] max-h-[740px] relative grid grid-rows-[55px_1fr] w-full h-full">
      <header className="bg-liwr-500 dark:bg-perl-600 rounded-t-lg px-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            className="w-6 h-6 rounded-full object-cover"
            src={group.avatar_url}
          />
          <h1 className="text-sm font-medium text-liwr-100 dark:text-perl-100 leading-none">
            {chat.name}
          </h1>
        </div>
        <p
          className={`text-sm font-bold text-grp-${group.color}-100 dark:text-grp-${group.color}-400`}
        >
          {group.category}
        </p>
      </header>

      <section className="scrollbar-liwr-300 dark:scrollbar-perl-400 overflow-y-auto sm:px-4 py-6 bg-liwr-400 dark:bg-perl-500 rounded-b-lg flex flex-col gap-4">
        <div className="flex flex-col gap-4 overflow-y-scroll overflow-x-hidden max-h-[480px] pl-2 sm:pl-4 sm:pr-2">
          {messagesChat &&
            messagesChat.length > 0 &&
            messagesChat.map((message) => { 
              const currentUserMessage = infoFriends.find(
                (f) => f.friend_id === message.user_id
              );
              const isFriendMessage = message.user_id !== user.user_id;
              return (
                <div
                  className={`z-10 flex gap-2 ${
                    isFriendMessage ? "self-start" : "self-end"
                  }`}
                  key={crypto.randomUUID()}
                >
                  {isFriendMessage && (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={currentUserMessage.avatar_url}
                    />
                  )}
                  <div
                    className={`word-wrap flex flex-col max-w-[75%] md:max-w-[60%] min-w-48 px-4 py-2 rounded-lg text-perl-100 text-xs
                      ${
                        isFriendMessage
                          ? "bg-liwr-200 dark:bg-perl-300"
                          : "bg-liwr-600 dark:bg-perl-600"
                      }`}
                  >
                    {isFriendMessage && (
                      <p className="text-liwr-700 dark:text-perl-200 font-semibold dark:font-normal truncate text-xs">
                        {message.nickname}
                      </p>
                    )}
                    <MarkdownView data={message.content} />
                    <div className="text-[10px] font-light text-end">
                      <relative-time
                        datetime={message.send_at}
                        format="relative"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="z-10 scrollbar-liwr-400 dark:scrollbar-perl-200 mt-auto">
          <MarkdownEditor chat={chat} sendMessageChat={sendMessageChat} />
        </div>
      </section>
      <IconFlagChat
        className={`w-[240px] h-[300px] sm:h-[460px] sm:w-[377px] absolute fill-grp-${group.color}-100 dark:fill-grp-${group.color}-300 top-5 sm:top-1`}
      />
    </main>
  );
};

export { ChatGroups };
