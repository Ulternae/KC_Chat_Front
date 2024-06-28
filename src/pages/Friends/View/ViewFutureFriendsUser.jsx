import { useTranslation } from "react-i18next";
import { AddFriends } from "../FriendsUser/AddFriends";
import { useEffect, useState } from "react";
import { SearchFriends } from "../FriendsUser/SearchFriends";
import { useOutletContext } from "react-router";
import { getUsers } from "@services/users/getUsers";

const ViewFutureFriendsUser = () => {
  const { t } = useTranslation();
  const { idFriends } = useOutletContext();
  const [viewTransition, setViewTransition] = useState(false);
  const [isFriendsVisible, setIsFriendsVisible] = useState(false);
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

  useEffect(() => {
    if (dataFriends.length > 0 && !viewTransition) {
      setViewTransition(true);
      setTimeout(() => {
        setIsFriendsVisible(true);
      }, 300);
    }
  }, [dataFriends, viewTransition]);

  return (
    <>
      <div
        className={`rounded-lg grid max-w-[1111px] gap-5 md:gap-0 md:grid-cols-[1fr_350px] ${
          isFriendsVisible
            ? ""
            : "sm:bg-gradient-to-b sm:dark:from-perl-800 sm:dark:to-perl-500 sm:from-liwr-200 sm:to-liwr-400 sm:bg-liwr-400 sm:dark:bg-perl-500"
        }`}
      >
        <div
          className={`rounded-lg sm:col-span-1 min-h-[510px] ${
            isFriendsVisible
              ? ""
              : "bg-gradient-to-b dark:from-perl-800 dark:to-perl-500 from-liwr-200 to-liwr-400 bg-liwr-400 dark:bg-perl-500"
          } sm:bg-transparent sm:dark:bg-transparent sm:bg-none sm:dark:bg-none`}
        >
          <div
            className={`signalsAddFriends grid h-full transition-opacity duration-300 py-8 pl-6 ${
              viewTransition ? "opacity-0" : "opacity-100"
            } ${isFriendsVisible ? "hidden" : ""}`}
          >
            <h1 className="text-base sm:text-xl ms:text-2xl font-semibold leading-none text-liwr-900 dark:text-perl-200 w-2/3 self-start">
              {t("friends.noHaveFriends")}
            </h1>
            <div className="w-full my-20 sm:my-32 md:my-0">
              <img src="parrot.png" alt="Parrot invite a add friends"/>
            </div>
          </div>
          <div
            className={`signalsFriends ${
              isFriendsVisible ? "" : "hidden"
            } md:pr-6  w-full h-full transition-opacity duration-300 ${
              viewTransition ? "opacity-100" : "opacity-0"
            }`}
          >
            <SearchFriends dataFriends={dataFriends} />
          </div>
        </div>
        <div className="rounded-lg sm:col-span-1 w-full  min-h-[580px] bg-liwr-400 dark:bg-perl-500 sm:bg-transparent sm:dark:bg-transparent h-[630px] mt-auto">
          <AddFriends
            dataFriends={dataFriends}
            setDataFriends={setDataFriends}
            loading={isLoading}
          />
        </div>
      </div>
    </>
  );
};

export { ViewFutureFriendsUser };
