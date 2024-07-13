import { Outlet, useOutletContext, useParams } from "react-router";
import { MessagesLoading } from "./Loading";
import { ViewErrorFetchMessages } from "./View/ViewErrorFetchMessages";

const Messages = () => {
  const data = useParams();
  const showChat = Object.keys(data).length > 0;

  const { dataUser, loading, sockets, friends, chats } = useOutletContext();
  const { loadingChat, errorFetchChats } = chats;

  if (errorFetchChats.error) return <ViewErrorFetchMessages errorFetch={errorFetchChats} />
  if (loadingChat && loading) return <MessagesLoading showChat={showChat} />;

  return (
    <Outlet
      context={{
        loading: loadingChat && loading,
        showChat,
        dataUser,
        sockets,
        friends,
        chats,
      }}
    />
  );
};

export { Messages };
