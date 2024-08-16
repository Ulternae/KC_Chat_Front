import { FormLayout } from "@components/Form/FormLayout";
import { FormText } from "@components/Form/FormText";
import { FormSelect } from "@components/Form/FormSelect";
import { OPTIONS_PARTICIPANTS as OP } from "@constants";
import { SelectOptionsPersonalized } from "@components/Select/SelectOptionsPersonalized";
import { ChatInputViewParticipants } from "@components/Chat/ChatInputViewParticipants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ButtonSecondary } from "@components/Button/ButtonSecondary";
import { ButtonFocus } from "@components/Button/ButtonFocus";

const AddNewChat = ({
  className,
  participants,
  setNewInfoChats,
  setShowSection,
}) => {
  const { t } = useTranslation();

  const chatInfoDefault = {
    chat_id: crypto.randomUUID(),
    is_group: 1,
    chat_name: "",
    participants: [],
  };
  const [newChat, setNewChat] = useState(chatInfoDefault);
  const [selectParticipants, setSelectParticipants] = useState(OP.ALL);

  useEffect(() => {
    filterParticipants();
  }, [selectParticipants, participants]);

  const filterParticipants = () => {
    const users = participants.filter((p) => p.permissions === OP.USER);
    const moderators = participants.filter(
      (p) => p.permissions === OP.MODERATOR
    );

    setNewChat((prev) => {
      if (selectParticipants === OP.USER) {
        return { ...prev, participants: [...users] };
      } else if (selectParticipants === OP.MODERATOR) {
        return { ...prev, participants: [...moderators] };
      } else if (selectParticipants === OP.ALL) {
        return { ...prev, participants: [...users, ...moderators] };
      } else {
        return prev;
      }
    });
  };

  const getParticipantIsUser = ({ permissions }) => OP.USER === permissions;

  const nonParticipants = participants.filter(
    (participant) =>
      !newChat.participants.some(
        (participantChat) => participantChat.friend_id === participant.friend_id
      )
  );

  const isEnoughParticipants = participants.length > 0;
  const handleDeleteParticipantInChat = ({ participant }) => {
    setSelectParticipants(OP.PERSONALIZED);

    setNewChat((prev) => {
      const newParticipants = prev.participants.filter(
        (p) => p.friend_id !== participant.friend_id
      );
      console.log({ newParticipants });
      const users = newParticipants.filter((p) => p.permissions === OP.USER);
      const moderators = newParticipants.filter(
        (p) => p.permissions === OP.MODERATOR
      );
      return {
        ...prev,
        participants: [...users, ...moderators],
      };
    });
  };

  const handleAddParticipantInChat = ({ participant }) => {
    setNewChat((prev) => {
      const newParticipants = [...prev.participants, participant];
      const users = newParticipants.filter((p) => p.permissions === OP.USER);
      const moderators = newParticipants.filter(
        (p) => p.permissions === OP.MODERATOR
      );
      return {
        ...prev,
        participants: [...users, ...moderators],
      };
    });
  };

  const handleAddNewChat = () => {
    setNewInfoChats((prev) => {
      const newChatsIds = [...prev.chats_ids.split(","), newChat.chat_id].join(
        ","
      );
      const newChatAdd = {
        ...newChat,
        name: newChat.name
          ? newChat.name
          : `${t("general.chat")} ${prev.chats_group.length + 2}`,
        users: newChat.participants,
      };
      return {
        chats_ids: newChatsIds,
        chats_group: [...prev.chats_group, newChatAdd],
      };
    });
    setShowSection(false);
  };
  return (
    <div className={className}>
      <FormLayout>
        <FormText text={t("groupChat.nameLabel")} />
        <input
          type="text"
          placeholder={t("groupChat.namePlaceholder")}
          className="placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/40 text-liwr-900 dark:text-perl-100 text-sm w-full h-[40px] focus:outline-none rounded-lg px-5 py-3 border-none bg-liwr-300 dark:bg-perl-400"
          value={newChat.chat_name}
          onChange={(e) =>
            setNewChat((prev) => ({ ...prev, chat_name: e.target.value }))
          }
        />
      </FormLayout>
      <FormSelect
        options={Object.values(OP)}
        selected={selectParticipants}
        setSelected={setSelectParticipants}
        typeTranslate={"groupChat"}
        className="bg-liwr-300 dark:bg-perl-400 p-4 rounded-lg w-full grid gap-1"
      />
      <SelectOptionsPersonalized
        className={"grid gap-5"}
        closeViewOptions={false}
      >
        <div className="bg-liwr-300 dark:bg-perl-400 h-auto min-h-10 w-2/3 max-w-[490px] ml-auto rounded-lg flex items-center justify-end px-4 py-2">
          <p className="text-liwr-900 dark:text-perl-100 text-sm">
            {t("groupChat.previewParticipants")}
          </p>
        </div>
        <div className="bg-liwr-300 dark:bg-perl-600 px-2 py-6 w-full rounded-lg">
          {!isEnoughParticipants && (
            <p className="text-sm text-center text-liwr-900/50 dark:text-perl-100/40 font-medium">
              {t("groupChat.needMoreParticipants")}{" "}
              <span className="text-liwr-900/90 dark:text-perl-100/80">
                {" "}
                ( {t("groupChat.setParticipants")} )
              </span>
            </p>
          )}
          {isEnoughParticipants && (
            <>
              <div className="bg-liwr-100 dark:bg-perl-550 h-5 rounded-l-lg rounded-tr-[4px] ml-auto max-w-[190px] px-2 flex gap-4 items-center justify-end">
                {(selectParticipants === OP.MODERATOR ||
                  selectParticipants === OP.ALL ||
                  selectParticipants === OP.PERSONALIZED) && (
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-grp-orchid-200 dark:bg-grp-orchid-400" />
                    <p className="text-sm font-semibold leading-none text-grp-orchid-200 dark:text-grp-orchid-400">
                      {t("general.moderators")}
                    </p>
                  </div>
                )}
                {(selectParticipants === OP.USER ||
                  selectParticipants === OP.ALL ||
                  selectParticipants === OP.PERSONALIZED) && (
                  <div className="flex gap-2 items-center">
                    <div className="w-2 h-2 rounded-full bg-grp-amber-200 dark:bg-grp-amber-400" />
                    <p className="text-sm font-semibold leading-none text-grp-amber-200 dark:text-grp-amber-400">
                      {t("general.users")}
                    </p>
                  </div>
                )}
              </div>
              <div className="grid gap-6 mt-4 p-3">
                {selectParticipants === OP.PERSONALIZED &&
                  nonParticipants.length !== 0 && (
                    <>
                      <p className=" text-liwr-900 dark:text-perl-100 text-sm font-light">
                        {t("general.excludeParticipants")}
                      </p>
                      <div className="grid gap-2 max-h-[280px] overflow-x-hidden overflow-y-auto">
                        {nonParticipants.map((participant) => {
                          const participantIsUser = getParticipantIsUser({
                            permissions: participant.permissions,
                          });

                          return (
                            <ChatInputViewParticipants
                              buttonIsAdd={true}
                              key={participant.friend_id}
                              participant={participant}
                              accion={() =>
                                handleAddParticipantInChat({
                                  participant,
                                })
                              }
                              participantIsUser={participantIsUser}
                            />
                          );
                        })}
                      </div>
                    </>
                  )}

                {newChat.participants.length === 0 && (
                  <p className="text-sm text-center text-liwr-900/50 dark:text-perl-100/40 font-medium">
                    {t("groupChat.needMoreParticipants")}{" "}
                  </p>
                )}

                {newChat.participants.length > 0 && (
                  <div className="grid gap-4">
                    <p className=" text-liwr-900 dark:text-perl-100 text-sm font-light">
                      {t("general.participants")}
                    </p>
                    <div className="grid gap-2 max-h-[280px] overflow-x-hidden overflow-y-auto">
                      {newChat.participants.map((participant) => {
                        const participantIsUser = getParticipantIsUser({
                          permissions: participant.permissions,
                        });

                        return (
                          <ChatInputViewParticipants
                            key={participant.friend_id}
                            participant={participant}
                            accion={() =>
                              handleDeleteParticipantInChat({
                                participant,
                              })
                            }
                            participantIsUser={participantIsUser}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </SelectOptionsPersonalized>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
        <ButtonSecondary
          text={t("buttons.cancel")}
          onClick={() => setShowSection(false)}
        />
        <ButtonFocus text={t("buttons.confirm")} onClick={handleAddNewChat} />
      </div>
    </div>
  );
};

export { AddNewChat };
