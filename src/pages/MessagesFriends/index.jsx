import { useNavigate, useOutletContext, useParams } from "react-router";
import { MessagesFriendsLoading } from "./Loading";
import "@github/relative-time-element";
import { ChatUser } from "../../components/Chat/ChatUser";

const MessagesFriends = () => {
  const { loading, chatsUser, sendMessageChat, dataUser, messages } =
    useOutletContext();
  const chatsRecent = chatsUser.slice(0, 4);
  const othersChats = chatsUser.slice(4);
  const navigate = useNavigate();
  const { chat_id_user } = useParams();

  if (loading) return <MessagesFriendsLoading />;

  const chatCurrent = chatsUser.filter(
    ({ chat_id }) => chat_id === chat_id_user
  )[0];

  const avatarChatCurrent =
    chatCurrent?.users.filter((user) => user.nickname !== dataUser.nickname)[0]
      .avatar_url || "";

  return (
    <div className="grid h-full max-w-[1111px] sm:gap-x-6 grid-rows-[auto_auto_740px] sm:grid-rows-[2fr_3fr] grid-cols-[218px_1fr] lg:grid-cols-1 lg:grid-rows-[auto_auto_740px] xl:grid-cols-[218px_1fr] xl:grid-rows-[2fr_3fr]">
      <aside className="col-span-2 sm:col-span-1 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-span-1 bg-liwr-400 dark:bg-perl-600 w-full h-full px-4 py-8 rounded-t-lg flex flex-col gap-6">
        <h1 className="text-sm font-medium text-liwr-900 dark:text-perl-100 leading-none">
          Recent Messages
        </h1>
        <nav className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:flex sm:flex-col gap-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:flex xl:flex-col">
          {chatsRecent.map((chat) => {
            const otherUsers = chat.users.filter(
              (user) => user.nickname !== dataUser.nickname
            );
            return (
              <div
                key={chat.chat_id}
                className="flex items-center gap-2 h-10 px-4 bg-liwr-400 dark:bg-perl-500 rounded-lg shadow-liwr-inset cursor-pointer"
                onClick={() => navigate(`/messages/friends/${chat.chat_id}`)}
              >
                <img
                  className="w-6 h-6 rounded-full object-cover"
                  src={otherUsers[0].avatar_url}
                />
                <p className="text-xs font-medium text-liwr-900 dark:text-perl-100 leading-none truncate">
                  {chat.name}
                </p>
              </div>
            );
          })}
        </nav>
      </aside>

      <header className="col-span-2 sm:col-span-1 sm:col-start-1 sm:col-end-2 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-span-1 xl:col-start-1 xl:col-end-2 bg-liwr-300 dark:bg-perl-500 w-full h-full px-4 py-8 rounded-lg flex flex-col gap-6">
        <h1 className="text-sm font-medium text-liwr-900 dark:text-perl-100 leading-none">
          Messages
        </h1>{" "}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:flex sm:flex-col gap-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:flex xl:flex-col">
          {othersChats.map((chat, index) => {
            const otherUsers = chat.users.filter(
              (user) => user.nickname !== dataUser.nickname
            );
            return (
              <div
                key={index}
                className="flex items-center gap-2 h-10 px-4 bg-liwr-400 dark:bg-perl-500 rounded-lg shadow-liwr-inset"
              >
                <img
                  className="w-6 h-6 rounded-full object-cover"
                  src={otherUsers[0].avatar_url}
                  alt=""
                />
                <p className="text-xs font-medium text-liwr-900 dark:text-perl-100 leading-none truncate">
                  {chat.name}
                </p>
              </div>
            );
          })}
        </div>
      </header>

      {!!chat_id_user && (
        <>
          {!chatCurrent && <div>Che este chat no existe</div>}
          {!!chatCurrent && (
            <>
              <ChatUser
                user={dataUser}
                chat={chatCurrent}
                sendMessageChat={sendMessageChat}
                avatar={avatarChatCurrent}
                messages={messages}
                isGroup={false}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export { MessagesFriends };
