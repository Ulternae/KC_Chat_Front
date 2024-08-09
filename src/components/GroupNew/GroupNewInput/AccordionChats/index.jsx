import { useTranslation } from "react-i18next";
import { AccordionCard } from "@components/Accordion/AccordionCard";
import { ACCION_THEME, OPTIONS_PARTICIPANTS as OP } from "@constants";

import { useEffect, useRef, useState } from "react";
import { AccordionChatView } from "./view";

const AccordionChats = ({
  fields,
  theme,
  infoAccordion,
  setFields,
  participants,
}) => {
  const { t } = useTranslation();
  const { openSection, toggleSection, section } = infoAccordion;
  const [openSectionChat, setOpenSectionChat] = useState(null);
  const orderParticipants = useRef([]);

  useEffect(() => {
    const users = participants.filter((p) => p.permissions === OP.USER);
    const moderators = participants.filter(
      (p) => p.permissions === OP.MODERATOR
    );
    orderParticipants.current = [...users, ...moderators];
  }, [participants]);

  const defaultFieldsChat = {
    chat_name: "",
    participants: [],
    chat_id: crypto.randomUUID(),
  };

  const handleNewChat = () => {
    setFields([...fields, defaultFieldsChat]);
  };

  const sectionChat = {
    openSectionInfoAccordion: openSection,
    openSectionChat,
    setOpenSectionChat,
  };

  const infoAccordionChat = {
    fields,
    setFields,
    participants: orderParticipants.current
  };

  return (
    <AccordionCard
      statusColor={` fill-${ACCION_THEME[theme]}/50`}
      section={section}
      openSection={openSection}
      toggleSection={toggleSection}
      name={t("general.chat")}
    >
      {fields.map((chat, index) => (
        <AccordionChatView
          key={index}
          sectionChat={sectionChat}
          infoAccordionChat={infoAccordionChat}
          index={index}
          chat={chat}
        />
      ))}
      <div
        className="mt-4 cursor-pointer text-sm font-light w-full min-h-11 grid text-liwr-900 dark:text-perl-100 place-content-center rounded-lg bg-liwr-200 dark:bg-perl-500"
        onClick={handleNewChat}
      >
        <p>{t("groupChat.addChat")}</p>
      </div>
    </AccordionCard>
  );
};

export { AccordionChats };
