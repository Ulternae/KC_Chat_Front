import { useEffect, useState } from "react";
import { ChatLoading } from "../Loading/Chat";
import { useTranslation } from "react-i18next";
import { Bear } from "@assets/Bear";
import { getDetailsChat } from "@services/chats/getDetaillsChat";
import { getToken } from "@token";
import { useOutletContext, useParams } from "react-router";

const ViewWarningChat = ({ setChatCurrent }) => {
  const { t } = useTranslation();
  const { dataUser, chats, sockets, friends } = useOutletContext()
  const { joinRoomChat } = sockets
  const { friendsUser, setFriendsUser } = friends
  const { chatsUser, setChatsUser} = chats
  const token = getToken()
  const resetError = { error: false, type: null };
  const [errorFetch, setErrorFetch] = useState(resetError);
  const [isLoading, setLoading] = useState(true);
  const { chat_id_user } = useParams();
  const chatId = chat_id_user
  
  useEffect(() => {
    setLoading(true)
    fetchChatData();
  }, [chat_id_user]);

  const fetchChatData = async () => {
    try {
      const data = await getDetailsChat({ token, chatId });
      verifyAuthUser({ dataChat: data })
    } catch (error) {
      setErrorFetch({ ...error })
    } finally {
      setLoading(false);
    }
  };

  const verifyAuthUser = ({ dataChat }) => {
    const userBelongsChat = dataChat.users.find((user) => user.user_id === dataUser.user_id)
    
    if (!userBelongsChat) { 
      return userNoAuth()
    }
    updateInfoUserAuth({ dataChat })

  }

  const userNoAuth = () => {
    setErrorFetch({ error: true, type: 'unauthorized'})
  }

  const updateInfoUserAuth = ({ dataChat }) => {
    const friend = dataChat.users.find((user) => user.user_id !== dataUser.user_id)
    const friendRefined = {
      friend_id: friend.user_id,
      chat_id: dataChat.chat_id,
      avatar_id: friend.avatar_id,
      avatar_url: friend.avatar_url,
      email: friend.email,
      nickname: friend.nickname,
      username: friend.username,
    }
    setChatsUser([...chatsUser, dataChat])
    setChatCurrent(dataChat)
    setFriendsUser([...friendsUser, friendRefined])
    joinRoomChat({ room: dataChat.chat_id})
  }

  const messagesOnError = {
    500: [t("messagesFriends.failedGetChat") , t('errorBack.databaseError')],
    404: [t("messagesFriends.chatNotFound") , t("messagesFriends.refreshPage")],
    unauthorized: [
      t("messagesFriends.unauthorizedAccess"),
      t("messagesFriends.chatForOtherUsers"),
    ],
    default: [t("messagesFriends.unknownError"), t("messagesFriends.pleaseTryAgain")],
  }

  if (isLoading) return <ChatLoading />;
  if (errorFetch.error) {
    const errorMessage =
    messagesOnError[errorFetch.type] || messagesOnError.default;

    return (
      <main className="relative pt-10 sm:pt-0 lg:pt-10 xl:pt-0 grid grid-rows-[55px_1fr] col-span-2 sm:col-span-1 sm:row-start-1 sm:row-end-3 sm:col-start-2 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-start-1 xl:row-end-3 xl:col-start-2 w-full h-full">
        <header className="bg-liwr-500 w- dark:bg-perl-600 rounded-t-lg "></header>
        <section className="py-6 bg-liwr-400 dark:bg-perl-500 rounded-b-lg flex flex-col justify-center sm:justify-between gap-32 sm:gap-12">
          <span className="pl-4 sm:pl-8  text-liwr-100 dark:text-perl-100">
            <h1 className="font-semibold text-2xl leading-none">
              {errorMessage[0]}
            </h1>
            <h2 className="text-lg leading-none">
            {errorMessage[1]}
            </h2>
          </span>
          <div>
            <Bear className={"w-full ml-auto max-w-[550px]"} />
          </div>
        </section>
      </main>
    );
  }
  
};

export { ViewWarningChat };
