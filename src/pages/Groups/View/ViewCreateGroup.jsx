import { useEffect, useState } from "react";
import { RANDOM_AVATAR, VERIFY_ACCION, MARKDOWN, RANDOM_COLOR } from "../../../constants";
import { AccordionContent } from "@groupNew/GroupNewInput/AccordionContent";
import { AccordionParticipants } from "@groupNew/GroupNewInput/AccordionParticipants";
import { AccordionSettings } from "@groupNew/GroupNewInput/AccordionSettings";
import { AccordionChats } from "@groupNew/GroupNewInput/AccordionChats";
import { useTranslation } from "react-i18next";
import { PreviewCreateGroup } from "@components/GroupNew/GroupNewPreviewView";

const ViewCreateGroup = () => {
  const { t } = useTranslation();

  const defaultFieldsContent = {
    title: "",
    description: MARKDOWN.DEFAULT,
    category: "",
  };
  const defaultFieldsSettings = {
    avatar_id: RANDOM_AVATAR(),
    is_public: true,
    color: RANDOM_COLOR() 
  };
  const defaultFieldsChat = { 
    chat_name: "",
    participants: [],
    chat_id: crypto.randomUUID(),
  };

  const [openSection, setOpenSection] = useState(null);

  const [fieldsContent, setFieldsContent] = useState(defaultFieldsContent);
  const [fieldsParticipants, setFieldsParticipants] = useState([]);
  const [fieldsSettings, setFieldsSettings] = useState(defaultFieldsSettings);
  const [fieldsChats, setFieldsChats] = useState([defaultFieldsChat]);

  const [themeContent, setThemeContent] = useState(VERIFY_ACCION.INITIAL);
  const [themeFriends, setThemeFriends] = useState(VERIFY_ACCION.INITIAL);
  const [themeSettings, setThemeSettings] = useState(VERIFY_ACCION.INITIAL);
  const [themeChats, setThemeChats] = useState(VERIFY_ACCION.INITIAL);

  useEffect(() => {
    verifyFieldsObject({
      fields: fieldsContent,
      setTheme: setThemeContent,
      validateSpecial: defaultFieldsContent.description,
    });
  }, [fieldsContent]);

  useEffect(() => {
    verifyFieldsArray({
      fields: fieldsParticipants,
      setTheme: setThemeFriends,
    });
  }, [fieldsParticipants]);

  useEffect(() => {
    verifyFieldsObject({
      fields: fieldsSettings,
      setTheme: setThemeSettings,
      validateSpecial: null,
    });
  }, [fieldsSettings]);

  useEffect(() => {
    verifyFieldsDeepChats({ fields: fieldsChats, setTheme: setThemeChats });
  }, [fieldsChats]);

  const verifyFieldsObject = ({ fields, setTheme, validateSpecial = "" }) => {
    const dataFields = Object.entries(fields);
    const fieldsLength = dataFields.length;
    const valuesLength = dataFields.filter(
      ([_, value]) => value !== "" && value !== validateSpecial
    ).length;

    if (fieldsLength === valuesLength) {
      setTheme(VERIFY_ACCION.CORRECT);
    }
    if (fieldsLength > valuesLength && valuesLength === 0) {
      setTheme(VERIFY_ACCION.INITIAL);
    }
    if (fieldsLength > valuesLength && valuesLength > 0) {
      setTheme(VERIFY_ACCION.PARTIAL);
    }
  };

  const verifyFieldsArray = ({ fields, setTheme }) => {
    switch (fields.length) {
      case 0:
        setTheme(VERIFY_ACCION.INITIAL);
        break;
      case 1:
        setTheme(VERIFY_ACCION.PARTIAL);
        break;
      default:
        setTheme(VERIFY_ACCION.CORRECT);
        break;
    }
  };

  const verifyFieldsDeepChats = ({ fields, setTheme }) => {
    let missingData = 0;
    fields.forEach((field) => {
      const dataFields = Object.values(field);
      dataFields.forEach((data) => {
        if (data.length === 0) {
          missingData++;
        }
      });
    });

    switch (missingData) {
      case 0:
        setTheme(VERIFY_ACCION.CORRECT);
        break;
      case 1:
        setTheme(VERIFY_ACCION.INITIAL);
        break;
      default:
        setTheme(VERIFY_ACCION.PARTIAL);
        break;
    }
  };

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const infoAccordionCard = (section) => ({
    openSection: openSection,
    toggleSection: toggleSection,
    section,
  });

  return (
    <>
      <div className="scrollbar-liwr-200 dark:scrollbar-perl-300 max-w-[1111px]">
        <p className="mb-12 h-11 rounded-lg px-4 inline-flex items-center dark:bg-perl-550 bg-liwr-400 font-semibold text-base text-liwr-900 dark:text-perl-100">
          {t("groups.createGroup")}
        </p>
        <div className="flex flex-col md:flex-row md:flex-wrap gap-x-8 gap-y-12">
          <div className="flex flex-col gap-y-3 flex-1 md:min-w-[300px] md:max-w-[400px] w-full">
            <AccordionContent
              fields={fieldsContent}
              setFields={setFieldsContent}
              theme={themeContent}
              infoAccordion={infoAccordionCard(1)}
            />
            <AccordionParticipants
              fields={fieldsParticipants}
              setFields={setFieldsParticipants}
              theme={themeFriends}
              infoAccordion={infoAccordionCard(2)}
            />
            <AccordionSettings
              fields={fieldsSettings}
              setFields={setFieldsSettings}
              theme={themeSettings}
              infoAccordion={infoAccordionCard(3)}
            />
            <AccordionChats
              fields={fieldsChats}
              setFields={setFieldsChats}
              theme={themeChats}
              infoAccordion={infoAccordionCard(4)}
              participants={fieldsParticipants}
            />
          </div>
          <PreviewCreateGroup 
            content={fieldsContent}
            participants={fieldsParticipants}
            settings={fieldsSettings}
            chats={fieldsChats}
          />
        </div>
      </div>
    </>
  );
};

export { ViewCreateGroup };
