import { useOutletContext } from "react-router";
import { FriendsLoading } from "./Loading";
import { ViewFriendsUser } from "./View/ViewFriendsUser";
import { ViewFutureFriendsUser } from "./View/ViewFutureFriendsUser";
import { useEffect, useState } from "react";

const Friends = () => {
  const { dataUser, friends } = useOutletContext();
  const [isLoading, setLoading] = useState(false);
  const [hasFetchedFriends, setHasFetchedFriends] = useState(false);
  const { friendsUser, fetchFriendsData, loadingFriends } = friends;

  useEffect(() => {
    if (!loadingFriends && friendsUser.length === 0 && !hasFetchedFriends) {
      getFriends();
    }
  }, []);

  const getFriends = async () => {
    setLoading(true);
    await fetchFriendsData(dataUser.user_id);
    setLoading(false);
    setHasFetchedFriends(true);
  };

  const viewLoading = loadingFriends || isLoading;
  const viewFutureFriends = !viewLoading && friendsUser.length === 0;
  const viewFriends = !viewLoading && friendsUser.length > 0;

  if (viewLoading) return <FriendsLoading />;
  if (viewFutureFriends) return <ViewFutureFriendsUser />;
  if (viewFriends) return <ViewFriendsUser />;

  return null;
};

export { Friends };
