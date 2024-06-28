import { useOutletContext, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { InputSearch } from "@components/Input/InputSearch";
import { getUsers } from "@services/users/getUsers";
import { IconAdd } from "@assets/IconAdd";
import { SpinnerLoading } from "@components/Loading/SpinnerLoading";
import { sendRequestFriend } from "@services/friends/sendRequestFriend";
import { getToken } from "@token";

const AddFriends = ({
  dataFriends,
  setDataFriends,
  loading,
  changeStates = false,
}) => {
  const token = getToken();
  const defaultErrorFields = { error: false, message: "", status: "" };
  const { t } = useTranslation();
  const { dataUser, idFriends, setIdFriends } = useOutletContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [dataUsers, setDataUsers] = useState([]);
  const [errorFields, setErrorFields] = useState(defaultErrorFields);
  const [filteredUser, setFilteredUser] = useState([]);
  const newFriendsParams = searchParams.get("newFriends");
  const [searchFriend, setSearchFriend] = useState(newFriendsParams || "");
  const [isFilter, setFilter] = useState(false);

  useEffect(() => {
    const fetchUsers = async (excludeFriends = false) => {
      try {
        const { users } = await getUsers({ t });
        if (dataUser) {
          const filteredUsers = users.filter(
            ({ user_id }) =>
              user_id !== dataUser.user_id &&
              (!excludeFriends ||
                !dataFriends.some((friend) => friend.user_id === user_id))
          );
          setFilteredUser(filteredUsers);
          setDataUsers(filteredUsers);
        }
      } catch (error) {
        setErrorFields({ ...error });
      } finally {
        setLoading(false);
        setFilter(true);
      }
    };

    if (!loading) {
      fetchUsers(dataFriends.length > 0);
    }
  }, [loading, dataFriends, dataUser]);

  useEffect(() => {
    if (isFilter) {
      if (searchFriend) {
        searchParams.set("newFriends", searchFriend);
      } else {
        searchParams.delete("newFriends");
      }
      setSearchParams(searchParams);

      setFilteredUser(
        dataUsers.filter(
          ({ nickname, username }) =>
            nickname.toLowerCase().includes(searchFriend.toLowerCase()) ||
            username.toLowerCase().includes(searchFriend.toLowerCase())
        )
      );
    }
  }, [searchFriend, dataUsers, isFilter]);

  const addFriend = async ({ user }) => {
    if (changeStates) {
      setIdFriends([...idFriends, user.user_id]);
    }
    const previousDataFriends = [...dataFriends];
    const previousDataUsers = [...dataUsers];

    const newDataFriends = Array.from(new Set([...dataFriends, user]));
    setDataFriends(newDataFriends);

    const newDataUsers = dataUsers.filter(
      ({ user_id }) => user_id !== user.user_id
    );

    setDataUsers(newDataUsers);
    setErrorFields(defaultErrorFields);

    try {
      await sendRequestFriend({ token, user_id_friend: user.user_id, t });
    } catch (error) {
      if (error.status !== 409) {
        setErrorFields({ ...error });
        setDataFriends(previousDataFriends);
        setDataUsers(previousDataUsers);
      } else {
        setErrorFields(defaultErrorFields);
      }
    }
  };

  return (
    <div className="scrollbar-liwr-500 dark:scrollbar-perl-300 flex flex-col gap-10 h-full rounded-lg sm:dark:bg-perl-500 sm:bg-liwr-400 px-6 py-8">
      <InputSearch
        search={searchFriend}
        setSearch={setSearchFriend}
        disabled={loading || isLoading}
        text={t("friends.addNewFriends")}
        className={"max-w-[350px]"}
      />
      {isLoading ? (
        <SpinnerLoading className={"h-full"} />
      ) : (
        <div className="grid gap-3 overflow-y-auto">
          {filteredUser.length > 0 &&
            filteredUser.map((user) => (
              <div
                className="px-4 w-full h-12 rounded-lg bg-liwr-700 dark:bg-perl-600 flex justify-between items-center"
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
                    <p className="text-sm text-liwr-100 dark:text-perl-100 leading-none">
                      {user.nickname}
                    </p>
                    <p className="font-light text-xs text-liwr-100/50 dark:text-perl-200 leading-none">
                      {user.username}
                    </p>
                  </span>
                </div>
                <IconAdd onClick={() => addFriend({ user })} />
              </div>
            ))}
          {isFilter && filteredUser.length === 0 && (
            <h1 className="text-liwr-100 dark:text-perl-100 text-sm text-center">
              {searchFriend === ""
                ? t("friends.noMoreFriends")
                : t("friends.newFriendsNotFound")}
            </h1>
          )}
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
