import { Outlet, useOutletContext, useParams } from "react-router";
import { MessagesLoading } from "./Loading";

const Messages = () => {
  const { dataUser, chats, loading } = useOutletContext();
  const { chatsUser, chatsGroups, loadingChat, sendMessageChat, messages } = chats;

  const data = useParams();
  const showChat = Object.keys(data).length > 0;

  if (loadingChat && loading) return <MessagesLoading showChat={showChat} />;

  return (
    <Outlet
      context={{
        loading: loadingChat && loading,
        chatsUser,
        chatsGroups,
        sendMessageChat,
        dataUser,
        messages,
      }}
    />
  );
};

export { Messages };
