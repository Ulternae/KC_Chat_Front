import { IconMessage } from "@assets/IconMessage";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { InputSearch } from "@components/Input/InputSearch";
import { useTranslation } from "react-i18next";
import { SpinnerLoading } from "@components/Loading/SpinnerLoading";

const SearchFriends = ({ dataFriends, loading }) => {
  const dataFriendsUnique = dataFriends.filter((item, index, self) =>
    index === self.findIndex((t) => t.user_id === item.user_id)
  );
    const navigate = useNavigate();
  const [isLoading, setLoading] = useState(loading)
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredFriends, setFilteredUser] = useState(dataFriendsUnique);
  const getFriendsParams = searchParams.get("getFriends");
  const [searchFriends, setSearchFriends] = useState(getFriendsParams || "");
  const [isFilter , setFilter] = useState(false)
  const onGetMessagesFriend = ({ user }) => {
    navigate(`/messages/friends/${user.user_id}`);
  };

  useEffect(() => {
    setLoading(true)
    if (searchFriends) {
      searchParams.set("getFriends", searchFriends);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("getFriends");
      setSearchParams(searchParams);
    }

    setFilteredUser(
      dataFriendsUnique.filter(
        ({ username, nickname }) =>
          nickname.toLowerCase().includes(searchFriends.toLowerCase()) ||
          username.toLowerCase().includes(searchFriends.toLowerCase())
      )
    );
    setLoading(false)
    setFilter(true)
  }, [searchFriends, dataFriends]);

  return (
    <div className="scrollbar-liwr-500 dark:scrollbar-perl-300  px-6 py-8 flex flex-col gap-12 bg-gradient-to-b dark:from-perl-800 dark:to-perl-500 from-liwr-200 to-liwr-400 bg-liwr-400 dark:bg-perl-500 w-full h-full rounded-lg">
      <InputSearch
        search={searchFriends}
        setSearch={setSearchFriends}
        text={t("friends.findYourFriends")}
        className={"w-full max-w-[350px]"}
      />
      {!isLoading && (
        <div className=" max-h-[600px] overflow-y-scroll overflow-x-hidden grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-3 ">
          {filteredFriends.map((user, index) => (
            <div
              className="px-4 w-full h-12 rounded-lg bg-liwr-700 dark:bg-perl-600 flex justify-between items-center"
              key={index}
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
              <IconMessage onClick={() => onGetMessagesFriend({ user })} />
            </div>
          ))}

          {dataFriends.length > 0 && isFilter && filteredFriends.length === 0 && (
            <h1 className="text-liwr-100 dark:text-perl-100 text-sm text-center ">
              {t("friends.friendNotFound")}
            </h1>
          )}
        </div>
      )}
      {isLoading && <SpinnerLoading className={"h-full"} />}
    </div>
  );
};

export { SearchFriends };
