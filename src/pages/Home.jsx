import { Outlet } from "react-router-dom";
import { IconMenu } from "@assets/IconMenu";
import { Menu } from "@components/Menu/Menu";
import { hiddenMenu, openMenu } from "@utils/showMenu";
import { Navbar } from "@components/Navbar";
import { getToken } from "@token";
import { getProfile } from "@services/profile/getProfile";
import { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FailedAccess } from "./States/FailedAccces";
import { ChatContext } from "@context/Provider";
import i18n from "../i18n";
import { updateSettings } from "@services/settings/updateSettings";
import { getFriends } from "@services/friends/getFriends";
import { getChats } from "../services/chats/getChats";
import { io } from "socket.io-client";
import { getUsers } from "@services/users/getUsers";
import { EVENTS_SOCKETS, THEME, STORAGE } from "@constants";
import { getAvatars } from "@services/avatars/getAvatars";

const Home = () => {
  const getDefaultDataUser = () => ({
    avatar_id: 0,
    avatar_url: "",
    email: "",
    language: "",
    nickname: "",
    theme: "",
    user_id: "",
    username: "",
  });

  const getResetError = () => ({ error: false, message: "", type: null });

  const baseUrl = import.meta.env.VITE_API;
  const token = getToken();

  const { language, setLanguage, theme, setTheme } = useContext(ChatContext);
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState(getDefaultDataUser());
  const [friendsUser, setFriendsUser] = useState([]);
  const [stateError, setStateError] = useState(getResetError());
  const [errorFetchChats, setErrorFetchChats] = useState(getResetError())
  const [chatsUser, setChatsUser] = useState([]);
  const [chatsGroups, setChatsGroups] = useState([]);
  const [loadingChat, setLoadingChat] = useState(true);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const [countChats, setCountChats] = useState(null);
  const [messagesLoaded, setMessagesLoaded] = useState(0);
  const [isGetAllMessages, setGetAllMessages] = useState(false);
  const [completeFetchProfile, setCompleteFetchProfile] = useState(false);
  const [avatarsUser, setAvatars] = useState([])
  const [loadingAvatars, setLoadingAvatars] = useState(true)
  const [errorFetchAvatars, setErrorFetchAvatars] = useState(getResetError())
  const [completeInitializateSocket, setCompleteInitializateSocket] =
    useState(false);

  const socketRef = useRef(socket);

  useEffect(() => {
    fetchProfileData();
  }, []);

  useEffect(() => {
    initializeSocket();
    return cleanupSocket;
  }, []);

  useEffect(() => {
    applyThemeAndLanguageSettings();
  }, [language, theme, loading]);

  useEffect(() => {
    // wait get info of user and sokects for listener notifications
    if (completeInitializateSocket && completeFetchProfile) {
      socket.emit(EVENTS_SOCKETS.LISTENER_USER, dataUser.user_id);
    }
  }, [completeFetchProfile, completeInitializateSocket]);

  useEffect(() => {
    // wait get all messages in the room for establish flag
    if (messagesLoaded >= countChats && countChats !== null) {
      setGetAllMessages(true);
    }
  }, [messagesLoaded, countChats]);

  useEffect(() => {
    socketRef.current = socket;
  }, [socket]);

  useEffect(() => {
    fetchAvatarsData()
  }, [])

  const sendMessageChat = ({ room, content, type }) => {
    socket.emit(EVENTS_SOCKETS.SEND_MESSAGE, room, content, type);
  };

  const joinRoomChat = ({ room }) => {
    socket.emit(EVENTS_SOCKETS.JOIN_ROOM, room);
  };

  const fetchProfileData = async () => {
    try {
      const data = await getProfile({ token, t });
      setDataUser(data);
      setLanguage(data.language || language);
      setTheme(data.theme || theme);
      setLoadingFriends(true);
      await fetchFriendsData(data.user_id);
    } catch (e) {
      setStateError({ error: true, message: e.message, type: e.type });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setLoadingFriends(false);
        setCompleteFetchProfile(true);
      }, 300);
    }
  };

  const fetchFriendsData = async (userId) => {
    try {
      setLoadingFriends(true);
      const dataUsersDatabase = await getUsers({ token, t });
      const dataFriendsDatabase = await getFriends({ token, t });
      const dataUsers = dataUsersDatabase.users;
      const dataFriends = Object.values(dataFriendsDatabase).flat();

      const dataFriendsRefined = dataFriends.map((friend) => {
        const setFriend =
          friend.friend_id === userId ? friend.user_id : friend.friend_id;
        const setUser = friend.user_id === userId ? userId : friend.friend_id;

        return {
          ...friend,
          user_id: setUser,
          friend_id: setFriend,
        };
      });

      const dataFriendsInfo = dataFriendsRefined.map((friend) => {
        const friendData = dataUsers.find(
          (user) => user.user_id === friend.friend_id
        );
        const { friend_id, chat_id } = friend;
        const { avatar_id, avatar_url, email, nickname, username } = friendData;
        const result = {
          friend_id,
          chat_id,
          avatar_id,
          avatar_url,
          email,
          nickname,
          username,
        };
        return result;
      });
      setFriendsUser(dataFriendsInfo);
    } catch (error) {
      setFriendsUser([]);
    } finally {
      setTimeout(() => {
        setLoadingFriends(false);
      }, 300);
    }
  };

  const initializeSocket = () => {
    const newSocket = io(baseUrl, { auth: { token } });
    setSocket(newSocket);
    newSocket.on(EVENTS_SOCKETS.MESSAGE, handleMessage);
    newSocket.on(EVENTS_SOCKETS.LOAD_MESSAGE, handleLoadMessages);
    newSocket.on(EVENTS_SOCKETS.NOTIFICATION, handleNotifications);
    fetchChatsData(newSocket);
    setCompleteInitializateSocket(true);
  };

  const cleanupSocket = () => {
    if (socket) {
      socket.disconnect();
      socket.off(EVENTS_SOCKETS.MESSAGE, handleMessage);
      socket.off(EVENTS_SOCKETS.LOAD_MESSAGE, handleLoadMessages);
      socket.off(EVENTS_SOCKETS.NOTIFICATION, handleNotifications);
    }
  };

  const fetchChatsData = async (newSocket) => {
    setLoadingChat(true);
    try {
      const { chats, groups } = await getChats({ token, t });
      setChatsUser(chats);
      setChatsGroups(groups);
      const roomChats = [...chats, ...groups];
      setCountChats(roomChats.length);
      joinRoomsChats(newSocket, [...roomChats]);
    } catch (error) {
      setErrorFetchChats({ ...error })
    } finally {
      setLoadingChat(false);
    }
  };

  const joinRoomsChats = (newSocket, chats) => {
    chats.forEach(({ chat_id }) =>
      newSocket.emit(EVENTS_SOCKETS.JOIN_ROOM, chat_id)
    );
  };

  const handleMessage = (messageSocket) => {
    setMessages((prevMessages) => [...prevMessages, messageSocket]);
  };

  const handleLoadMessages = (loadedMessages) => {
    setMessagesLoaded((prevMessagesLoaded) => prevMessagesLoaded + 1);
    setMessages((prevMessages) => [...prevMessages, ...loadedMessages]);
  };

  const updateChatFriends = ({ content }) => {
    const { newFriend, newChat } = content;

    setFriendsUser((prevFriendsUser) => {
      const containsFriend = prevFriendsUser.find(
        (friend) => newFriend.friend_id === friend.friend_id
      );

      if (!containsFriend) {
        return [...prevFriendsUser, newFriend];
      }

      return prevFriendsUser;
    });

    setChatsUser((prevChatsUser) => {
      const containsChat = prevChatsUser.find(
        (chat) => newChat.name === chat.name
      );

      if (socketRef.current) {
        socketRef.current.emit(EVENTS_SOCKETS.JOIN_ROOM, newChat.chat_id);
      }
      if (!containsChat) {
        return [...prevChatsUser, newChat];
      }

      return prevChatsUser;
    });
  };

  const handleNotifications = ({ type, content }) => {
    switch (type) {
      case EVENTS_SOCKETS.NEW_CHAT:
        return updateChatFriends({ type: EVENTS_SOCKETS.NEW_CHAT, content });
      default:
        break;
    }
  };

  const applyThemeAndLanguageSettings = () => {
    if (loading || stateError.error) {
      updateDocumentClass(theme);
      return;
    }

    updateDocumentClass(theme);
    i18n.changeLanguage(language);
    const settings = { language, theme };
    localStorage.setItem(STORAGE.KC_CRT, JSON.stringify(settings));

    if (dataUser) {
      if (dataUser.language !== language || dataUser.theme !== theme) {
        updateSettingsDatabase(settings);
      }
    }
  };

  const updateSettingsDatabase = async (settings) => {
    try {
      await updateSettings({ token, settingsUpdate: settings, t });
      setDataUser((prevDataUser) => ({
        ...prevDataUser,
        language,
        theme,
      }));
    } catch (error) {
      setLanguage(dataUser?.language || language);
      setTheme(dataUser?.theme || theme);
    }
  };

  const updateDocumentClass = (theme) => {
    if (theme === THEME.DARK_MODE) {
      document.documentElement.classList.add(THEME.DARK);
    } else {
      document.documentElement.classList.remove(THEME.DARK);
    }
  };

  const fetchAvatarsData = async () => {
    try {
      const data = await getAvatars({ token, t });
      setAvatars(data);
    } catch (error) {
      setErrorFetchAvatars({ ...error });
    } finally {
      setTimeout(() => {
        setLoadingAvatars(false);
      }, 300);
    }
  }

  const chats = {
    chatsUser,
    setChatsUser,
    chatsGroups,
    setChatsGroups,
    sendMessageChat,
    loadingChat,
    setLoadingChat,
    messages,
    setMessages,
    isGetAllMessages,
    errorFetchChats
  };

  const friends = {
    friendsUser,
    fetchFriendsData,
    loadingFriends,
    setFriendsUser,
  };

  const sockets = {
    socket,
    joinRoomChat,
  };

  const avatars = {
    avatarsUser,
    setAvatars,
    loadingAvatars,
    setLoadingAvatars,
    errorFetchAvatars,
    setErrorFetchAvatars
  }

  return (
    <div className="h-full bg-liwr-200 dark:bg-perl-800 px-6 py-6 min-h-screen relative">
      <section className="lg:hidden">
        <div
          className="KC_menuBg z-20 fixed hidden top-0 left-0 bottom-0 right-0 bg-liwr-200/70 dark:bg-perl-800/70"
          onClick={hiddenMenu}
        ></div>
        <IconMenu
          className="absolute left-0 cursor-pointer"
          onClick={openMenu}
        />
      </section>
      <section className="grid lg:grid-cols-[250px_1fr] lg:grid-rows-[40px_1fr] gap-x-16 gap-y-10 ">
        <Menu className="lg:row-span-2" />
        {stateError.error && (
          <>
            <nav></nav>
            <FailedAccess error={stateError} />
          </>
        )}
        {!stateError.error && (
          <>
            <Navbar dataUser={dataUser} loading={loading} />
            <Outlet
              context={{
                loading,
                dataUser,
                setDataUser,
                friends,
                chats,
                sockets,
                avatars
              }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export { Home };
