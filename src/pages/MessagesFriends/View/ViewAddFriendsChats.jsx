import { useTranslation } from "react-i18next";
import { Bear } from "@assets/Bear";
import { CardUserAction } from "@components/Card/CardUserAction";
import { useEffect, useState } from "react";
import { getUsers } from "@services/users/getUsers";
import { LoadingSpinner } from "@loading/LoadingSpinner";

import { useOutletContext } from "react-router";
import { IconCreateChat } from "@assets/IconCreateChat";
import { getToken } from "@token";
import { sendRequestFriend } from "@services/friends/sendRequestFriend";
import { createChat } from "@services/chats/createChat";
import { ButtonFocus } from "@components/Button/ButtonFocus";
import { EVENTS_SOCKETS } from "../../../constants";

const ViewAddFriendsChats = () => {
  const resetError = { error: false, message: "" };
  const token = getToken();
  const { t } = useTranslation();
  const { dataUser, sockets, friends, chats } = useOutletContext();
  const { setFriendsUser } = friends
  const { joinRoomChat, socket } = sockets;
  const { setChatsUser } = chats;
  const [isLoading, setLoading] = useState(true);
  const [nonFriends, setNonFriends] = useState([]);
  const [errorFetch, setErrorFetch] = useState(resetError);
  const [newFriends, setNewFriends] = useState([]);
  const [newChats, setNewChats] = useState([]);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const usersDatabase = await getUsers({ t });
      const usersList = usersDatabase.users;
      const userNonFriends = usersList.filter(
        (user) => user.user_id !== dataUser.user_id
      );
      setNonFriends(userNonFriends);
    } catch (error) {
      setErrorFetch({ ...error });
    } finally {
      setLoading(false);
    }
  };

  const infoUserForChat = ({ user }) => ({
    nickname: user.nickname,
    email: user.email,
    user_id: user.user_id,
    avatar_url: user.avatar_url,
    avatar_id: user.avatar_id,
  });

  const infoFriend = ({ friend, chat_id }) => ({
    friend_id: friend.user_id,
    chat_id,
    avatar_id: friend.avatar_id,
    avatar_url: friend.avatar_url,
    email: friend.email,
    nickname: friend.nickname,
    username: friend.username,
  });

  const infoChat = ({ chat_id, name, users }) => ({
    chat_id,
    name,
    is_group: 0,
    users,
  });

  const isError = errorFetch.error;
  const viewCard = !isLoading && !isError;
  const viewError = !isLoading && isError;
  const confirmAvailable = newFriends.length !== 0;

  const addNonFriend = async ({ nonFriend }) => {
    const newNonFriends = nonFriends.filter(
      (nonFriendDb) => nonFriendDb.user_id !== nonFriend.user_id
    );
    setNonFriends(newNonFriends);

    const chat_id = crypto.randomUUID();
    const usersNewChat = [
      infoUserForChat({ user: dataUser }),
      infoUserForChat({ user: nonFriend }),
    ];
    let newFriend = infoFriend({ friend: nonFriend, chat_id });
    let newChat = infoChat({
      chat_id,
      name: nonFriend.nickname,
      users: usersNewChat,
    });

    let newChatSockets = infoChat({
      chat_id,
      name: dataUser.nickname,
      users: usersNewChat,
    })

    socket.emit(EVENTS_SOCKETS.NOTIFICATION, {
      friendId: nonFriend.user_id,
      type: EVENTS_SOCKETS.NEW_CHAT,
      content: { newChat: newChatSockets, newFriend },
    });

    const oldNewFriends = [...newFriends];
    const oldNewChats = [...newChats];

    setNewFriends([...oldNewFriends, newFriend]);
    setNewChats([...oldNewChats, newChat]);

    const createChatFriends = async () => {
      await createChat({ token, friend_id: nonFriend.user_id, chat_id });
      joinRoomChat({ room: chat_id });
    };

    const revertAllChanges = () => {
      setNewFriends([...oldNewFriends]);
      setNewChats([...oldNewChats]);
    };

    const changeInfoChatFriends = ({ chatIdUpdate }) => {
      newChat = infoChat({
        chat_id: chatIdUpdate,
        name: nonFriend.nickname,
        users: usersNewChat,
      });

      newFriend = infoFriend({
        friend: nonFriend,
        chat_id: chatIdUpdate,
      });
      setNewChats([...oldNewChats, newChat]);
      setNewFriends([...oldNewFriends, newFriend]);
      joinRoomChat({ room: chatIdUpdate });
    };

    try {
      await sendRequestFriend({ token, user_id_friend: nonFriend.user_id, t });
    } catch (error) {
      if (error.status === 409 && !!error.detailsChat) {
        changeInfoChatFriends({ chatIdUpdate: error.detailsChat });
        return;
      }
      if (error.status === 409 && !error.detailsChat) {
        createChatFriends();
        return;
      }
      if (error.status !== 409) {
        revertAllChanges();
        return;
      }
    }

    createChatFriends();
  };

  const confirmNewFriends = async () => {   
    setFriendsUser(newFriends)
    setChatsUser(newChats)
  };

  return (
    <div className="min-h-[525px] grid grid-rows-[55px_1fr] max-w-[1111px]">
      <div className="bg-liwr-500 dark:bg-perl-600 rounded-t-lg" />
      <div className="h-full bg-liwr-400 dark:bg-perl-500 rounded-b-lg py-8 lg:py-12 xl:py-14 grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:gap-x-6 gap-y-16 lg:grid-cols-1 xl:sm:grid-cols-[1fr_2fr]">
        <div className="pl-4 pr-4 sm:pl-6 sm:pr-0 lg:pl-12 lg:pr-12 xl:pl-14 xl:pr-0 w-full sm:min-w-[300px] lg:min-w-[400px] flex flex-col gap-16 ">
          <span className=" text-liwr-100 dark:text-perl-100">
            <h1 className="font-semibold text-2xl leading-none">
              {t("messagesFriends.noHaveChats")}
            </h1>
            <h2 className="text-lg leading-none">
              {t("messagesFriends.inviteCreateChat")}
            </h2>
          </span>
          <div className="w-full h-auto gap-2 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {isLoading && <LoadingSpinner className="h-[388px] lg:h-[232px] xl:h-[388px] lg:col-span-2 xl:col-span-1" />}
            {viewCard && (
              <>
                {nonFriends.slice(0, 6).map((nonFriend) => (
                  <CardUserAction
                    key={nonFriend.user_id}
                    dataUser={nonFriend}
                    icon={IconCreateChat}
                    action={() => addNonFriend({ nonFriend })}
                  />
                ))}
                { !confirmAvailable && (
                  <div className="h-[76px]"></div>
                )}
                {confirmAvailable && (
                  <ButtonFocus
                    text={"Confirm"}
                    className={
                      "w-full max-w-[300px] xl:max-w-[344px] lg:col-span-2 xl:col-span-1 ml-auto mt-10 text-sm"
                    }
                    onClick={confirmNewFriends}
                  />
                )}
              </>
            )}
            {viewError && (
              <div className="h-[304px] lg:h-[148px] xl:h-[304px] lg:col-span-2 xl:col-span-1 grid place-content-center">
                <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
                  {errorFetch.message}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end items-end ">
          <Bear className="max-w-[650px] max-h-[450px] " />
        </div>
      </div>
    </div>
  );
};

export { ViewAddFriendsChats };