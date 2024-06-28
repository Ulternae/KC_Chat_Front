import { useTranslation } from "react-i18next";
import { AddFriends } from "../FriendsUser/AddFriends";
import { useEffect, useState } from "react";
import { SearchFriends } from "../FriendsUser/SearchFriends";
import { useOutletContext } from "react-router";
import { getUsers } from "@services/users/getUsers";

const ViewFriendsUser = () => {
  const { t } = useTranslation();
  const { idFriends } = useOutletContext();
  const [dataFriends, setDataFriends] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const getDataFriends = async () => {
    try {
      setLoading(true);
      const data = await getUsers({ t });
      const { users } = data;
      if (users.length > 0) {
        const newDataFriends = idFriends.map((user_id) =>
          users.find((user) => user.user_id === user_id)
        );
        setDataFriends(newDataFriends);
      }
    } catch (error) {
      setDataFriends([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFriends();
  }, [idFriends]);

  return (
    <>
      <div className={"rounded-lg grid max-w-[1111px] gap-5 md:gap-0 md:grid-cols-[1fr_350px]"}>
        <div className={" rounded-lg min-h-[510px]"}>
          <div className={"md:pr-6  w-full h-full transition-opacity duration-300"}>
            <SearchFriends dataFriends={dataFriends} loading={isLoading} />
          </div>
        </div>
        <div className="rounded-lg w-full  min-h-[580px] bg-liwr-400 dark:bg-perl-500 h-[630px] mt-auto">
          <AddFriends
            dataFriends={dataFriends}
            setDataFriends={setDataFriends}
            loading={isLoading}
            changeStates={true}
          />
        </div>
      </div>
    </>
  );
};

export { ViewFriendsUser };
