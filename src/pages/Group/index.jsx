import { useOutletContext, useParams } from "react-router"
import { GroupNotFound } from "./View/GroupNotFound"
import { GroupUser } from "./View/GroupUser"
import { Loading } from "./Loading"

const Group = () => {
  const { groups, chats } = useOutletContext()
  const { groupsUser, loadingGroups } = groups
  const { chatsGroups, loadingChat } = chats;
  const { group_id } = useParams()

  if (loadingGroups || loadingChat) return <Loading />;

  const currentGroup = groupsUser.find((g) => g.group_id === group_id);

  if (!currentGroup) return <GroupNotFound />;

  const combinedChatInfo = {
    ...currentGroup,
    chats_group: currentGroup.chats_ids
      ? currentGroup.chats_ids.split(",").map((chatId) =>
          chatsGroups.find((cg) => cg.chat_id === chatId)
        ).filter((c) => c)
      : [],
  };

  return <GroupUser currentGroup={combinedChatInfo} />;
}

export { Group } 