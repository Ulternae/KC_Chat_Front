import { Outlet } from "react-router-dom";
import { IconMenu } from "@assets/IconMenu";
import { Menu } from "@components/Menu/Menu";
import { hiddenMenu, openMenu } from "@utils/showMenu";
import { Navbar } from "@components/Navbar";
import { getToken } from "@token";
import { getProfile } from "@services/profile/getProfile";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FailedAccess } from "./States/FailedAccces";
import { ChatContext } from "@context/Provider";
import i18n from "../i18n";
import { updateSettings } from "@services/settings/updateSettings";
import { getFriends } from "@services/friends/getFriends";
import { getChats } from "../services/chats/getChats";
import { io } from "socket.io-client";
import { getUsers } from "@services/users/getUsers";

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

  const token = getToken();
  const { language, setLanguage, theme, setTheme } = useContext(ChatContext);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState(getDefaultDataUser());
  const [friendsUser, setFriendsUser] = useState([]);
  const [stateError, setStateError] = useState(getResetError());
  const [chatsUser, setChatsUser] = useState([]);
  const [chatsGroups, setChatsGroups] = useState([]);
  const [loadingChat, setLoadingChat] = useState(true);
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);
  const baseUrl = import.meta.env.VITE_API;

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

  const sendMessageChat = ({ room, content, type }) => {
    socket.emit("sendMessage", room, content, type);
  };

  const joinRoomChat = ({ room }) => {
    socket.emit("joinRoom", room);
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
    newSocket.on("message", handleMessage);
    newSocket.on("loadMessages", handleLoadMessages);
    fetchChatsData(newSocket);
  };

  const cleanupSocket = () => {
    if (socket) {
      socket.disconnect();
      socket.off("message", handleMessage);
      socket.off("loadMessages", handleLoadMessages);
    }
  };

  const fetchChatsData = async (newSocket) => {
    setLoadingChat(true);
    try {
      const { chats, groups } = await getChats({ token, t });
      setChatsUser(chats);
      setChatsGroups(groups);
      joinRoomsChats(newSocket, [...chats, ...groups]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingChat(false);
    }
  };

  const joinRoomsChats = (newSocket, chats) => {
    chats.forEach(({ chat_id }) => newSocket.emit("joinRoom", chat_id));
  };

  const handleMessage = (messageSocket) => {
    setMessages((prevMessages) => [...prevMessages, messageSocket]);
  };

  const handleLoadMessages = (loadedMessages) => {
    setMessages((prevMessages) => [...prevMessages, ...loadedMessages]);
  };

  const applyThemeAndLanguageSettings = () => {
    if (loading || stateError.error) {
      updateDocumentClass(theme);
      return;
    }

    updateDocumentClass(theme);
    i18n.changeLanguage(language);
    const settings = { language, theme };
    localStorage.setItem("KC_CRT", JSON.stringify(settings));

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
    if (theme === "darkMode") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

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
  return (
    <div className="bg-liwr-200 dark:bg-perl-800 px-6 py-6 min-h-screen relative">
      <section className="lg:hidden">
        <div
          className="KC_menuBg z-10 fixed hidden top-0 left-0 bottom-0 right-0 bg-liwr-200/70 dark:bg-perl-800/70"
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
              }}
            />
          </>
        )}
      </section>
    </div>
  );
};

export { Home };
