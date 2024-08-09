import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router";
import { MessagesLoading } from "./Loading";
import { ViewErrorFetch } from "./View/ViewErrorFetch";
import { useTranslation } from "react-i18next";
import { ViewMessages } from "./View/ViewMessages";
import { ViewAddGroups } from "./View/ViewAddGroups";

const MessagesGroups = () => {
  const { t } = useTranslation();
  const data = useParams();
  const showChat = Object.keys(data).length > 1;
  const { chats, groups, avatars } = useOutletContext();
  const { avatarsUser } = avatars;
  const [isLoading, setLoading] = useState(true);

  const {
    chatsGroups,
    loadingChat,
    isGetAllMessages,
    errorFetchChats,
    messages,
  } = chats;
  const { groupsUser, loadingGroups, errorFetchGroups } = groups;

  const [groupsRefined, setGroupsRefined] = useState([]);

  useEffect(() => {
    if (isGetAllMessages) {
      loadViewChats();
    }
  }, [isGetAllMessages, chatsGroups, messages, groupsUser, chats]);

  const loadViewChats = () => {
    const sortedMessages = messages.sort(
      (a, b) => new Date(a.send_at) - new Date(b.send_at)
    );

    const chatsIdsUpdate = new Set();
    const groupsIdsUpdate = new Set();

    const idsChats = chatsGroups.map(({ chat_id }) => chat_id);
    sortedMessages
      .toReversed()
      .forEach((message) => chatsIdsUpdate.add(message.room));
    idsChats.forEach((id) => chatsIdsUpdate.add(id));

    [...chatsIdsUpdate].forEach((idG) => {
      const group = groupsUser.find((g) => g.chats_ids?.includes(idG));
      if (group) groupsIdsUpdate.add(group.group_id);
    });
    groupsUser.forEach((g) => groupsIdsUpdate.add(g.group_id));

    const groupsOrdened = [...groupsIdsUpdate]
      .map((g_id) => groupsUser.find((g) => g.group_id === g_id))
      .filter((g) => g !== undefined);

    const orderChatMap = {};
    [...chatsIdsUpdate].forEach((item, index) => {
      orderChatMap[item] = index;
    });
    
    const newGroupsRefined = groupsOrdened.map((g) => {
      const chats_ids = g.chats_ids ? g.chats_ids.split(",") : [];
      const sortedChats = chats_ids.sort((a, b) => {
        return orderChatMap[a] - orderChatMap[b];
      });
    
      const avatar_url =
        avatarsUser.find((a) => a.avatar_id === g.avatar_id)?.url || null;

      const chats_details = sortedChats
        .map((c) => chatsGroups.find(({ chat_id }) => chat_id === c) || null)
        .filter((chat) => chat !== null);

      return {
        ...g,
        chats_details,
        avatar_url,
      };
    });

    setGroupsRefined(newGroupsRefined);
    setLoading(false);
  };

  const hasGroups = groupsUser.length > 0;
  const loadingMessages = isLoading || loadingChat || loadingGroups;
  const viewInviteGroups = !hasGroups && !loadingMessages;
  const viewGroups = hasGroups && !loadingMessages;

  if (errorFetchChats.error)
    return (
      <ViewErrorFetch
        message={errorFetchChats.message}
        secondaryMessage={t("errorBack.errorObtainMessages")}
        status={errorFetchChats.type}
      />
    );

  if (errorFetchGroups.error)
    return (
      <ViewErrorFetch
        message={errorFetchGroups.message}
        secondaryMessage={t("errorBack.errorObtainGroups")}
        status={errorFetchGroups.type}
      />
    );

  if (loadingMessages) return <MessagesLoading showChat={showChat} />;
  if (viewInviteGroups) return <ViewAddGroups />;
  if (viewGroups) return <ViewMessages groupsRefined={groupsRefined} />;

};

export { MessagesGroups };
