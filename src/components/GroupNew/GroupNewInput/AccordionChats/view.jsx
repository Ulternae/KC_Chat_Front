import { useTranslation } from "react-i18next";
import { IconMinimize } from "@assets/IconMinimize";
import { IconCopy } from "@assets/IconCopy";
import { OPTIONS_PARTICIPANTS as OP } from "@constants";
import { ChatInputViewParticipants } from "@components/Chat/ChatInputViewParticipants";
import { FormSelect } from "@components/Form/FormSelect";
import { SelectOptionsPersonalized } from "@components/Select/SelectOptionsPersonalized";
import { FormLayout } from "@components/Form/FormLayout";
import { FormText } from "@components/Form/FormText";
import { useEffect, useState } from "react";

const AccordionChatView = ({ sectionChat, infoAccordionChat, index, chat }) => {
  const { t } = useTranslation();

  const { openSectionInfoAccordion, openSectionChat, setOpenSectionChat } =
    sectionChat;
  const { fields, setFields, participants } = infoAccordionChat;
  const [selectParticipants, setSelectParticipants] = useState(OP.ALL);

  const currentFieldsChat = fields.find((field) => field.chat_id === chat.chat_id)
  useEffect(() => {
    filterParticipants();
  }, [selectParticipants, participants]);

  const isEnoughParticipants = participants.length > 0;

  const toggleSectionChat = (section) => {
    setOpenSectionChat(openSectionInfoAccordion === section ? null : section);
  };

  const handleChangeChat = ({ index, e }) => {
    const newFields = [...fields];
    newFields[index].chat_name = e.target.value;
    setFields(newFields);
  };

  const handleDeleteChat = ({ chat }) => {
    setFields((prev) =>
      prev.filter((chatUser) => chatUser.chat_id !== chat.chat_id)
    );
  };

  const handleCopyChat = ({ chat }) => {
    const newChat = { ...chat, chat_id: crypto.randomUUID() };
    setFields((prev) => [...prev, newChat]);
  };

  const handleDeleteParticipantInChat = ({participant}) => {
    setSelectParticipants(OP.PERSONALIZED);
    setFields((prev) => 
      prev.map((field) => {
        if (field.chat_id === chat.chat_id) {
          const newParticipants = field.participants.filter(
            (fieldParticipant) => fieldParticipant.friend_id !== participant.friend_id
          );
          const users = newParticipants.filter((p) => p.permissions === OP.USER);
          const moderators = newParticipants.filter((p) => p.permissions === OP.MODERATOR);
          return { ...field, participants: [...users, ...moderators] };
        } else {
          return field;
        }
      })
    );
  };

  const handleAddParticipantInChat = ({participant}) => {
    setFields((prev) =>
      prev.map((field) => {
        if (field.chat_id === chat.chat_id) {
          const newParticipants = [...field.participants, participant];
          const users = newParticipants.filter((p) => p.permissions === OP.USER);
          const moderators = newParticipants.filter((p) => p.permissions === OP.MODERATOR);
          return { ...field, participants: [...users, ...moderators] };
        } else {
          return field;
        }
      })
    );
  };

  const getParticipantIsUser = ({ permissions }) =>
    OP.USER === permissions;

  const filterParticipants = () => {
    const users = participants.filter((p) => p.permissions === OP.USER);
    const moderators = participants.filter((p) => p.permissions === OP.MODERATOR);

    setFields((prev) => 
      prev.map((field) => {
        if (field.chat_id === chat.chat_id) {
          if (selectParticipants === OP.USER) {
            return { ...field, participants: [...users] };
          } else if (selectParticipants === OP.MODERATOR) {
            return { ...field, participants: [...moderators] };
          } else if (selectParticipants === OP.ALL) {
            return { ...field, participants: [...users, ...moderators] };
          } else {
            return field;
          }
        } else {
          return field;
        }
      })
    );
  };

  const nonParticipants = participants.filter(
    (participant) =>
      !currentFieldsChat.participants.some(
        (participantChat) => participantChat.friend_id === participant.friend_id
      )
  );

  return (
    <div
      className="bg-liwr-200 dark:bg-perl-500 w-full rounded-lg  h-full"
      key={index}
    >
      <div
        className={
          openSectionChat !== index
            ? "flex flex-col gap-2 justify-center"
            : "hidden"
        }
      >
        <div className="flex gap-2 items-center">
          <IconCopy
            className={"ml-4 fill-liwr-700 dark:fill-perl-200 cursor-pointer"}
            onClick={() => handleCopyChat({ chat })}
          />
          <div
            className="z-10 h-8 w-full flex items-center"
            onClick={() => toggleSectionChat(index)}
          >
            <p className="z-0 text-xs text-liwr-900 dark:text-perl-100 w-full">
              {currentFieldsChat.chat_name !== ""
                ? currentFieldsChat.chat_name
                : `${t("general.chat")} ${index + 1}`}
            </p>
          </div>
        </div>
      </div>
      <div
        className={
          openSectionChat === index
            ? "relative flex flex-col gap-2 px-4 py-6"
            : "hidden"
        }
      >
        <FormLayout>
          <FormText text={t("groupChat.nameLabel")} />
          <input
            type="text"
            placeholder={t("groupChat.namePlaceholder")}
            className="placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/40 text-liwr-900 dark:text-perl-100 text-sm w-full h-[40px] focus:outline-none rounded-lg px-5 py-3 border-none bg-liwr-300 dark:bg-perl-600"
            value={fields[index].chat_name}
            onChange={(e) => handleChangeChat({ index, e })}
          />
        </FormLayout>
        <IconMinimize
          className={
            "fill-liwr-100 dark:fill-perl-200 absolute top-3 right-4 h-[6px] w-[10px] cursor-pointer"
          }
          onClick={() => toggleSectionChat(null)}
        />
        <FormSelect
          options={Object.values(OP)}
          selected={selectParticipants}
          setSelected={setSelectParticipants}
          typeTranslate={"groupChat"}
        />
        <SelectOptionsPersonalized
          className={"grid gap-2"}
          closeViewOptions={false}
        >
          <div className="bg-liwr-300 dark:bg-perl-600 h-auto min-h-10 w-2/3 max-w-[490px] ml-auto rounded-lg flex items-center justify-end px-4 py-2">
            <p className="text-liwr-900 dark:text-perl-100 text-sm">
              {t("groupChat.previewParticipants")}
            </p>
          </div>
          <div className="bg-liwr-300 dark:bg-perl-600 px-2 py-2 w-full rounded-lg">
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
                {(selectParticipants === OP.MODERATOR || selectParticipants === OP.ALL || selectParticipants === OP.PERSONALIZED) && (

                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-grp-orchid-200 dark:bg-grp-orchid-400" />
                      <p className="text-sm font-semibold leading-none text-grp-orchid-200 dark:text-grp-orchid-400">
                        {t("general.moderators")}
                      </p>
                    </div>
                  )}
                {(selectParticipants === OP.USER || selectParticipants === OP.ALL || selectParticipants === OP.PERSONALIZED) && (
                    <div className="flex gap-2 items-center">
                      <div className="w-2 h-2 rounded-full bg-grp-amber-200 dark:bg-grp-amber-400" />
                      <p className="text-sm font-semibold leading-none text-grp-amber-200 dark:text-grp-amber-400">
                        {t("general.users")}
                      </p>
                    </div>
                  )}
                </div>
                <div className="grid gap-6 mt-4 p-3">
                  {selectParticipants === OP.PERSONALIZED && nonParticipants.length !== 0 && (
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

                  {currentFieldsChat.participants.length === 0 && (
                    <p className="text-sm text-center text-liwr-900/50 dark:text-perl-100/40 font-medium">
                      {t("groupChat.needMoreParticipants")}{" "}
                    </p>
                  )}

                  {currentFieldsChat.participants.length > 0 && (
                    <div className="grid gap-4">
                      <p className=" text-liwr-900 dark:text-perl-100 text-sm font-light">
                        {t("general.participants")}
                      </p>
                      <div className="grid gap-2 max-h-[280px] overflow-x-hidden overflow-y-auto">
                        {currentFieldsChat.participants.map((participant) => {
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
        <div className="grid place-content-center  w-full h-[40px] rounded-lg px-5 py-2 bg-liwr-300 dark:bg-perl-600">
          <button
            className="text-warn-100 dark:text-warn-500 text-sm"
            onClick={() => handleDeleteChat({ chat })}
          >
            {t("groupChat.deleteChat")}
          </button>
        </div>
      </div>
    </div>
  );
};

export { AccordionChatView };
