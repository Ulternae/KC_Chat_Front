import { useOutletContext, useParams } from "react-router";
import { ChatUser } from "../../../components/Chat/ChatUser";
import { ViewWarningChat } from "./ViewWarningChat";
import { useEffect, useState } from "react";
import { ChatPanel } from "../Panel/ChatPanel";
import { CHAT as C} from "@constants";

const ViewChats = ({ chatsUserRefined }) => {
  const { chat_id_user } = useParams();
  const { chats, dataUser } = useOutletContext();
  const { sendMessageChat, messages, chatsUser } = chats;
  const [chatCurrent, setChatCurrent] = useState(null);
  const [view, setView] = useState("");

  useEffect(() => {
    getCurrentChat();
  }, [chat_id_user, chatsUser, chatCurrent]);
  // Dependencies necessaries for listen the new chats add through chatNotFound

  const getCurrentChat = () => {
    const newChatCurrent = chatsUserRefined.filter(
      ({ chat_id }) => chat_id === chat_id_user
    )[0];
    setChatCurrent(newChatCurrent);

    if (newChatCurrent && chat_id_user) {
      setView(C.FOUND);
    } else if (!newChatCurrent && chat_id_user) {
      setView(C.NOT_FOUND);
    }
  };

  const avatarChatCurrent =
    chatCurrent?.users.filter((user) => user.nickname !== dataUser.nickname)[0]
      ?.avatar_url || "";

  return (
    <div className="grid h-full max-w-[1111px] sm:gap-x-6 lg:gap-x-0 xl:gap-x-6 grid-rows-[auto_auto_740px] sm:grid-rows-[2fr_3fr] grid-cols-[218px_1fr] lg:grid-cols-1 lg:grid-rows-[auto_auto_740px] xl:grid-cols-[218px_1fr] xl:grid-rows-[2fr_3fr] 2xl:grid-cols-[318px_1fr]">
      <ChatPanel chatsUserRefined={chatsUserRefined} />
      {(view === C.FOUND ) && (
        <ChatUser
          user={dataUser}
          chat={chatCurrent}
          sendMessageChat={sendMessageChat}
          avatar={avatarChatCurrent}
          messages={messages}
          isGroup={false}
        />
      )}
      {(view === C.NOT_FOUND ) && (
        <ViewWarningChat setChatCurrent={setChatCurrent} />
      )}
    </div>
  );
};

export { ViewChats };
