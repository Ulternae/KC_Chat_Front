import { useOutletContext, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { InputSearch } from "@components/Input/InputSearch";
import { getUsers } from "@services/users/getUsers";
import { IconAdd } from "@assets/IconAdd";
import { SpinnerLoading } from "@components/Loading/SpinnerLoading";
import { sendRequestFriend } from "@services/friends/sendRequestFriend";
import { getToken } from "@token";
import { createChat } from "../../../services/chats/createChat";

const AddFriends = () => {
  const { t } = useTranslation();
  const { dataUser, friends, chats, sockets } = useOutletContext();
  const { friendsUser, loadingFriends, setFriendsUser } = friends;
  const { chatsUser, setChatsUser } = chats;
  const { joinRoomChat } = sockets;
  const [nonFriends, setNonFriends] = useState([]);

  const token = getToken();
  const defaultErrorFields = { error: false, message: "", status: "" };
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(loadingFriends);
  const [errorFields, setErrorFields] = useState(defaultErrorFields);
  const newFriendsParams = searchParams.get("newFriends");
  const [search, setSearch] = useState(newFriendsParams || "");
  const [isFilter, setFilter] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchNonFriends();
  }, []);

  useEffect(() => {
    searchNonFriends();
  }, [search]);

  const fetchNonFriends = async () => {
    setLoading(true);
    try {
      const usersDatabase = await getUsers({ t });
      const usersList = usersDatabase.users;
      setUsers(usersList);
      const nonFriendsUser = getNonFriendsUser(usersList, friendsUser);
      setNonFriends(nonFriendsUser);
    } catch (error) {
      setErrorFields({ ...error });
    } finally {
      setTimeout(() => {
        setLoading(false);
        setFilter(true);
      }, 300);
    }
  };

  const getNonFriendsUser = (usersList, friendsList) =>
    usersList.filter(
      ({ user_id }) =>
        user_id !== dataUser.user_id &&
        !friendsList.some(({ friend_id }) => friend_id === user_id)
    );

  const searchNonFriends = () => {
    search
      ? searchParams.set("newFriends", search)
      : searchParams.delete("newFriends");
    setSearchParams(searchParams);
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

  const filteredNonFriends = nonFriends.filter(
    ({ nickname, username }) =>
      nickname.toLowerCase().includes(search.toLowerCase()) ||
      username.toLowerCase().includes(search.toLowerCase())
  );

  const viewLoading = isLoading;
  const viewNonFriends = !isLoading && filteredNonFriends.length > 0;
  const viewNotFound =
    !isLoading && filteredNonFriends.length === 0 && isFilter;

  const addNewFriend = async ({ user }) => {
    const chat_id = crypto.randomUUID();

    const newFriend = infoFriend({ friend: user, chat_id });
    const usersNewChat = [
      infoUserForChat({ user: dataUser }),
      infoUserForChat({ user }),
    ];
    const newChat = infoChat({
      chat_id,
      name: user.nickname,
      users: usersNewChat,
    });

    const oldChatsUser = [...chatsUser];
    const oldFriendsUser = [...friendsUser];

    const newFriendsUser = [...oldFriendsUser, newFriend];
    const newChatsUser = [...oldChatsUser, newChat];

    joinRoomChat({ room: chat_id });
    setFriendsUser(newFriendsUser);
    setChatsUser(newChatsUser);
    const updatedNonFriends = getNonFriendsUser(users, newFriendsUser);
    setNonFriends(updatedNonFriends);

    const changeInfoChatFriends = ({ chatIdUpdate }) => {
      const newChatUpdate = infoChat({
        chat_id: chatIdUpdate,
        name: user.nickname,
        users: usersNewChat,
      });
      const newChatsUpdate = [...oldChatsUser, newChatUpdate];

      const newFriendUpdate = infoFriend({
        friend: user,
        chat_id: chatIdUpdate,
      });
      const newFriendsUpdate = [...oldFriendsUser, newFriendUpdate];

      setChatsUser(newChatsUpdate);
      setFriendsUser(newFriendsUpdate);
      joinRoomChat({ room: chatIdUpdate });
    };

    const revertAllChanges = () => {
      setChatsUser([...oldChatsUser]);
      setFriendsUser([...oldFriendsUser]);

      const revertNonFriends = getNonFriendsUser(users, oldFriendsUser);
      setNonFriends(revertNonFriends);
    };

    const createChatFriends = async () => {
      await createChat({ token, friend_id: user.user_id, chat_id });
    };

    try {
      await sendRequestFriend({ token, user_id_friend: user.user_id, t });
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

  return (
    <div className="scrollbar-liwr-500 dark:scrollbar-perl-300 flex flex-col gap-10 h-full rounded-lg sm:dark:bg-perl-500 sm:bg-liwr-400 px-6 py-8">
      <InputSearch
        search={search}
        setSearch={setSearch}
        disabled={loadingFriends || isLoading}
        text={t("friends.addNewFriends")}
        className={"max-w-[350px]"}
      />

      {viewLoading && <SpinnerLoading className={"h-full"} />}
      {viewNonFriends && (
        <div className="grid gap-3 overflow-y-auto">
          {filteredNonFriends.map((user) => (
            <div
              className="px-4 w-full h-12 rounded-lg bg-liwr-600/30 dark:bg-perl-600 flex justify-between items-center"
              key={user.nickname}
            >
              <div className="flex gap-2 items-center">
                <div className="w-7 h-7 rounded-full overflow-hidden">
                  <img
                    className="w-full h-full object-cover"
                    src={user.avatar_url}
                    alt={user.nickname}
                  />
                </div>
                <span className="truncate">
                  <p className="text-sm font-medium text-liwr-800 dark:text-perl-100 leading-none">
                    {user.nickname}
                  </p>
                  <p className="font-light text-xs text-liwr-700 dark:text-perl-200 leading-none">
                    {user.username}
                  </p>
                </span>
              </div>
              <IconAdd onClick={() => addNewFriend({ user })} />
            </div>
          ))}
        </div>
      )}
      {viewNotFound && (
        <div className="grid gap-3 overflow-y-auto">
          <h1 className="text-liwr-100 dark:text-perl-100 text-sm text-center">
            {search === ""
              ? t("friends.noMoreFriends")
              : t("friends.newFriendsNotFound")}
          </h1>
        </div>
      )}

      {errorFields.error && (
        <div className="min-h-10 flex items-center justify-center">
          <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
            {errorFields.message}
          </p>
        </div>
      )}
    </div>
  );
};

export { AddFriends };
