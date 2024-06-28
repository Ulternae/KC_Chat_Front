import { useOutletContext } from "react-router";
import { FriendsLoading } from "./Loading";
import { ViewFriendsUser } from "./View/ViewFriendsUser";
import { ViewFutureFriendsUser } from "./View/ViewFutureFriendsUser";
import { getToken } from "@token";
import { getFriends } from "@services/friends/getFriends";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

const Friends = () => {

  const { loading, idFriends, setIdFriends, dataUser } = useOutletContext();
  const [ isLoading, setLoading ] = useState(loading)
  const { t } = useTranslation()
  const token = getToken()
  
  useEffect(() => {
    const consultDatabaseFriends = async () => {
      setLoading(true)
      const dataFriendsDatabase = await getFriends({ token, t });
        const dataFlat = Object.values(dataFriendsDatabase).flat();
        const dataFriends = dataFlat.map(({ user_id, friend_id }) =>
          user_id === dataUser.user_id ? friend_id : user_id
        );
        setIdFriends(dataFriends)
      setLoading(false)
    }
    
    if (idFriends.length === 0) {
      consultDatabaseFriends()
    }

  }, [])

  if (isLoading) return <FriendsLoading />;

  if (!isLoading && idFriends) {
    if (idFriends.length > 0) return <ViewFriendsUser/>
    if (idFriends.length === 0) return <ViewFutureFriendsUser />;
  }

};

export { Friends };
