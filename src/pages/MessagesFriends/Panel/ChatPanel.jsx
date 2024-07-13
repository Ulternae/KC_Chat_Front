import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router";
import { ChatsUserLoading } from "../../Messages/Loading/ChatsUser";

const ChatPanel = ({ chatsUserRefined }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { dataUser } = useOutletContext();
  const [viewPanel, setViewPanel] = useState("viewFull");
  const [generateViewPanel, setGenerateViewPanel] = useState(false)

  useEffect(() => {
    getViewPanel();
  }, []);

  const getViewPanel = () => {
    const isEnoughChats = chatsUserRefined.length >= 6;
    setViewPanel(isEnoughChats ? "viewFull" : "viewPartial");
    setGenerateViewPanel(true)
  };

  if (!generateViewPanel) return <ChatsUserLoading />

  let chatsRecent =
    viewPanel === "viewFull" ? chatsUserRefined.slice(0, 4) : chatsUserRefined;
  let othersChats = viewPanel === "viewFull" ? chatsUserRefined.slice(4) : [];

  let stylesComponentAside =
    viewPanel === "viewFull"
      ? "col-span-2 sm:col-span-1 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-span-1"
      : "col-span-2 sm:col-span-1 sm:row-span-2 rounded-lg";
  let stylesHeader =
    viewPanel === "viewFull"
      ? "col-span-2 sm:col-span-1 sm:col-start-1 sm:col-end-2 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-span-1 xl:col-start-1 xl:col-end-2"
      : "hidden";

  return (
    <>
      <aside
        className={`${stylesComponentAside} bg-liwr-400 dark:bg-perl-600 w-full h-full px-4 py-8 rounded-t-lg flex flex-col gap-6`}
      >
        <h1 className="text-sm font-medium text-liwr-900 dark:text-perl-100 leading-none">
          {t("messages.recentMessages")}
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

      <header
        className={`${stylesHeader} scrollbar-liwr-400 dark:scrollbar-perl-300 overflow-y-auto bg-liwr-300 dark:bg-perl-500 w-full h-full pr-2 py-8 rounded-b-lg flex flex-col gap-6`}
      >
        <h1 className="text-sm font-medium text-liwr-900 dark:text-perl-100 leading-none pl-4 pr-2">
          {t("messages.title")}
        </h1>
        <div className="pl-4  max-h-[342px] overflow-y-auto overflow-x-hidden">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] mr-2 sm:flex sm:flex-col gap-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:flex xl:flex-col">
            {othersChats.map((chat, index) => {
              const otherUsers = chat.users.filter(
                (user) => user.nickname !== dataUser.nickname
              );
              return (
                <div
                  key={index}
                  className="flex items-center gap-2 h-10 px-4 bg-liwr-400 dark:bg-perl-500 rounded-lg shadow-liwr-inset cursor-pointer"
                  onClick={() => navigate(`/messages/friends/${chat.chat_id}`)}
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
        </div>
      </header>
    </>
  );
};

export { ChatPanel };
