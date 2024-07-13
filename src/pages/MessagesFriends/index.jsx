import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { ViewAddFriendsChats } from "./View/ViewAddFriendsChats";
import { MessagesLoading } from "../Messages/Loading";
import { ViewChats } from "./View/ViewChats";

const MessagesFriends = () => {
  const { loading, chats, showChat } = useOutletContext();
  const {
    chatsUser,
    messages,
    loadingChat,
    isGetAllMessages,
  } = chats;
  const [chatsUserRefined, setChatsUserRefined] = useState([]);
  const [isLoading, setLoading] = useState(true);
  
  useEffect(() => {
    if (isGetAllMessages) {
      loadViewChats();
    }
  }, [isGetAllMessages, chatsUser, messages]);


  const loadViewChats = () => {
    const sortedMessages = messages.slice().sort((a, b) => new Date(a.send_at) - new Date(b.send_at));

    const chatsIdsUpdate = new Set();
    const idsChats = chatsUser.map(({ chat_id }) => chat_id);
    sortedMessages.toReversed().forEach((message) => {
      chatsIdsUpdate.add(message.room);
    });
    idsChats.forEach((id) => chatsIdsUpdate.add(id));
    const chatUpdate = [...chatsIdsUpdate].map(
      (id) => chatsUser.filter(({ chat_id }) => chat_id === id)[0]
    );
    setChatsUserRefined(chatUpdate);
    setLoading(false);
  };

  const inviteAddFriends = chatsUserRefined.length === 0;

  const loadingMessages = loading || loadingChat || !isGetAllMessages || isLoading
  const inviteFriendsChats = inviteAddFriends && !loadingMessages
  const viewChats = !inviteAddFriends && !loadingMessages

  if (loadingMessages) return <MessagesLoading showChat={showChat}/>;
  if (inviteFriendsChats) return <ViewAddFriendsChats />;
  if (viewChats) return (<ViewChats chatsUserRefined = {chatsUserRefined} />)
  
};

export { MessagesFriends };
