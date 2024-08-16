import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { AccordionPersonalized } from "../../../components/Accordion/AccordionPersonalized";
import { IconArrowRightLight } from "../../../assets/IconArrowRightLight";
import { IconMessagesGroup } from "../../../assets/IconMessagesGroup";
import { IconTrash } from "../../../assets/IconTrash";
import { IconClose } from "../../../assets/IconClose";
import { useTranslation } from "react-i18next";
import { SearchParticipants } from "./SearchParticipants";

import { AddNewChat } from "./AddNewChat";

const Chats = ({
  canEdit,
  newInfo,
  setNewInfo,
  infoParticipants,
  currentGroup,
}) => {
  const { t } = useTranslation();
  const { chats_ids, chats_group } = newInfo;
  const { chats } = useOutletContext();
  const { chatsGroups, loadingChat } = chats;
  const [showAddParticipants, setShowAddParticipants] = useState(false);
  const [sectionCurrent, setSectionCurrent] = useState(null);
  const [showCreateChat, setShowCreateChat] = useState(false);
  const { group_id } = currentGroup;
  const navigate = useNavigate();

  console.log({ chats_group})
  useEffect(() => {
    if (!loadingChat) {
      const chatsUser = chats_ids
        ?.split(",")
        .map((c) => chatsGroups.find((cg) => cg.chat_id === c));
      setNewInfo((prev) => ({ ...prev, chats_group: chatsUser }));
    }
  }, [loadingChat]);

  if (chats_ids === null) return;

  const toggleSection = (section) => {
    setSectionCurrent((prev) => (prev === section ? null : section));
  };

  const toogleShowInfoParticipants = () => {
    setShowAddParticipants((prev) => !prev);
  };

  const deleteParticipantInChat = ({ user_id, chat_id }) => {
    setNewInfo((prev) => ({
      ...prev,
      chats_group: chats_group.map((chat) => {
        if (chat.chat_id === chat_id) {
          const newInfo = {
            ...chat,
            users: chat.users.filter((u) => u.user_id !== user_id),
          };
          return newInfo;
        }
        return chat;
      }),
    }));
  };

  const deleteChat = (chat_id) => {
    setNewInfo((prev) => ({
      chats_ids: prev.chats_ids
        ? prev.chats_ids
            .split(",")
            .filter((c) => c !== chat_id)
            .join(",")
        : null,
      chats_group: prev.chats_group.filter(
        (chats) => chats.chat_id !== chat_id
      ),
    }));
  };

  const addNewParticipant = (participant, identifier) => {
    const newParticipant = participant;
    newParticipant.user_id = participant.friend_id;
    setNewInfo((prev) => ({
      ...prev,
      chats_group: chats_group.map((chat) => {
        if (chat.chat_id === identifier) {
          const newsUsers = [...chat.users, newParticipant];
          return { ...chat, users: newsUsers };
        }
        return chat;
      }),
    }));
  };

  return (
    <>
      <div className={`flex flex-col gap-3 ${showCreateChat ? "hidden" : ""}`}>
        {chats_group &&
          chats_group.map((c) => {
            const participantsForAddInChat = infoParticipants.filter(
              (participant) =>
                !c.users.some((user) => user.user_id === participant.friend_id)
            );

            return (
              <AccordionPersonalized
                className="shadow-liwr-inset dark:shadow-perl-inset px-2 sm:px-6 py-4 max-w-[400px] min-h-11 bg-liwr-400 dark:bg-perl-500 rounded-lg flex flex-col gap-6"
                key={c.chat_id}
                section={sectionCurrent}
                sectionElement={c.chat_id}
                openSection={() => toggleSection(c.chat_id)}
              >
                <div className="flex items-center justify-between">
                  <p className="leading-none font-medium text-liwr-700 dark:text-perl-100">
                    {c.name}
                  </p>
                  <div className="flex gap-1">
                    <IconMessagesGroup
                      secondaryFill="fill-liwr-100 dark:fill-perl-200"
                      className="cursor-pointer fill-liwr-500 dark:fill-perl-100 w-4 h-[13px] z-20"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/messages/groups/${group_id}/${c.chat_id}`);
                      }}
                    />
                    <IconArrowRightLight className="rotate-90 cursor-pointer fill-liwr-500 dark:fill-perl-100 w-3 h-3" />
                  </div>
                </div>
                <div className="relative">
                  <div
                    className={`${
                      showAddParticipants ? "min-h-[380px]" : ""
                    } grid gap-2 grid-rows-[repeat(auto-fill,40px)]`}
                  >
                    {c.users.length > 0 ? (
                      <>
                        {c.users.map((u) => {
                          return (
                            <div
                              className="bg-liwr-500/20 rounded-lg px-4 py-2 flex items-center justify-between"
                              key={u.user_id}
                            >
                              <div className="flex gap-2 items-center">
                                <img
                                  className="w-6 h-6 rounded-full object-cover"
                                  src={u.avatar_url}
                                />
                                <p className="text-liwr-900 dark:text-perl-100 leading-none text-sm">
                                  {u.nickname}
                                </p>
                              </div>
                              {canEdit && (
                                <IconClose
                                  className="cursor-pointer w-4 fill-liwr-100 dark:fill-perl-200"
                                  onClick={() =>
                                    deleteParticipantInChat({
                                      user_id: u.user_id,
                                      chat_id: c.chat_id,
                                    })
                                  }
                                />
                              )}
                            </div>
                          );
                        })}
                      </>
                    ) : (
                      <div className="grid place-content-center">
                        <p className="text-liwr-700 dark:text-perl-200 text-sm text-center">
                          {t("groupView.warningChatWithoutParticipants")}
                        </p>
                      </div>
                    )}
                  </div>
                  {canEdit && (
                    <div className="mt-4 grid grid-cols-[1fr_40px] gap-3">
                      <button
                        className="transition-colors duration-300 min-h-10 focus:outline-none cursor-pointer text-liwr-700 hover:text-liwr-900 dark:text-perl-200 hover:dark:text-perl-100 rounded-lg bg-liwr-500/50 dark:bg-perl-400 font-medium text-sm px-4 py-2 leading-none"
                        onClick={toogleShowInfoParticipants}
                      >
                        {t("groupView.addParticipantsInChat")}
                      </button>
                      <div className="bg-liwr-500/50 dark:bg-perl-400 rounded-lg grid place-content-center">
                        <IconTrash
                          className="w-4 h-7 cursor-pointer fill-liwr-100 dark:fill-perl-200"
                          onClick={() => deleteChat(c.chat_id)}
                        />
                      </div>
                    </div>
                  )}
                  {showAddParticipants && (
                    <SearchParticipants
                      className=" shadow-liwr-inset dark:shadow-perl-inset bg-liwr-400/90 dark:bg-perl-500/90 px-4 py-4 absolute top-0 right-0 bottom-0 left-0 rounded-lg flex flex-col gap-8"
                      closeView={() => setShowAddParticipants(false)}
                      participants={participantsForAddInChat}
                      addParticipant={addNewParticipant}
                      typeFilter={"nickname"}
                      classNamePortal="grid gap-3 max-h-[370px] overflow-x-hidden overflow-y-auto"
                      identifier={c.chat_id}
                      messageAddAllParticipants={t(
                        "groupView.allParticipantsAddedChat",
                        { chat_name: c.name }
                      )}
                    />
                  )}
                </div>
              </AccordionPersonalized>
            );
          })}
        {canEdit && (
          <div>
            <button
              className="mt-4 min-h-10 focus:outline-none cursor-pointer text-liwr-900 dark:text-perl-200 rounded-r-lg rounded-l-sm bg-liwr-500/50 dark:bg-perl-400 font-medium px-4 py-2"
              onClick={() => setShowCreateChat(true)}
            >
              {t("groupView.createNewChat")}
            </button>
          </div>
        )}
      </div>
      {showCreateChat && (
        <AddNewChat
          className="max-w-[460px] py-6 px-4 shadow-liwr-inset dark:shadow-perl-inset z-20 [min-width:1000px]:mr-8 lg:mr-0 xl:mr-8 bg-liwr-400 dark:bg-perl-600 rounded-lg flex flex-col gap-4"
          participants={infoParticipants}
          setNewInfoChats={setNewInfo}
          setShowSection={setShowCreateChat}
        />
      )}
    </>
  );
};

export { Chats };
