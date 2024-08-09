import { useOutletContext, useParams } from "react-router"
import { GroupPanel } from "../Panel/GroupPanel"
import { useEffect, useState } from "react";
import { CHAT as C } from "@constants";
import { ChatGroups } from "../../../components/Chat/ChatGroups";
import { ViewChatNotFound } from "./ViewChatNotFound";

const ViewMessages = ({ groupsRefined }) => {
  const { group_id , chat_id } = useParams()
  const { chats, dataUser } = useOutletContext();
  const { sendMessageChat, messages, chatsGroups } = chats;
  const [chatCurrent, setChatCurrent] = useState(null);
  const [groupCurrent, setGroupCurrent] = useState(null)
  const [view, setView] = useState("");

  useEffect(() => {
    getCurrentChat();
  }, [chat_id, group_id, chatsGroups, chatCurrent]);

  const getCurrentChat = () => {
    const newChatCurrent = chatsGroups.find((c) => c.chat_id === chat_id)
    const newGroupCurrent = groupsRefined.find((g) => g.group_id === group_id)
    setChatCurrent(newChatCurrent)
    setGroupCurrent(newGroupCurrent)

    if (newChatCurrent && chat_id) {
      setView(C.FOUND);
    } else if (!newChatCurrent && chat_id && group_id) {
      setView(C.NOT_FOUND);
    } else {
      setView("")
    }
  }

  return (
    <div className="scrollbar-liwr-300 dark:scrollbar-perl-300 grid h-full max-w-[1111px] gap-6 lg:gap-x-0 xl:gap-6 sm:grid-cols-[218px_1fr] lg:grid-cols-1 xl:grid-cols-[218px_1fr] 2xl:grid-cols-[318px_1fr]">
      <GroupPanel groupsRefined={groupsRefined} />
      {(view === C.FOUND ) && (
        <ChatGroups
          user={dataUser}
          chat={chatCurrent}
          group={groupCurrent}
          sendMessageChat={sendMessageChat}
          messages={messages}
        />
      )}
      {(view === C.NOT_FOUND ) && (
        <ViewChatNotFound/>
      )}
    </div>
  )
}

export { ViewMessages }