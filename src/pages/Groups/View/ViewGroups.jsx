import { useEffect, useState } from 'react';
import { COLORS_USERS, RANDOM_AVATAR, VERIFY_ACCION } from '../../../constants';
import { AccordionContent } from '../Accordion/AccordionContent';
import { AccordionParticipants } from '../Accordion/AccordionParticipants';
import { AccordionSettings } from '../Accordion/AccordionSettings';
import { AccordionChats } from '../Accordion/AccordionChats';
import { useTranslation } from 'react-i18next';

const ViewGroups = () => {
  const { t } = useTranslation()
  const defaultFieldsContent = {
    title: '',
    description: '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1,"textFormat":0}],"direction":null,"format":"","indent":0,"type":"root","version":1}}',
    category: ''
  }
  const defaultFieldsSettings = {
    avatar_id: RANDOM_AVATAR(),
    is_public: true,
    color: COLORS_USERS.CRIMSON
  }

  const [openSection, setOpenSection] = useState(3);

  const [fieldsContent, setFieldsContent] = useState(defaultFieldsContent)
  const [fieldsParticipants, setFieldsParticipants] = useState([])
  const [fieldsSettings, setFieldsSettings] = useState(defaultFieldsSettings)
  const [fieldsChats, setFieldsChats] = useState([])

  const [themeContent, setThemeContent] = useState(VERIFY_ACCION.INITIAL)
  const [themeFriends, setThemeFriends] = useState(VERIFY_ACCION.INITIAL)
  const [themeSettings, setThemeSettings] = useState(VERIFY_ACCION.INITIAL)
  const [themeChats, setThemeChats] = useState(VERIFY_ACCION.INITIAL)

  useEffect(() => {
    verifyFieldsObject({ fields: fieldsContent, setTheme: setThemeContent, validateSpecial: defaultFieldsContent.description })
  }, [fieldsContent])

  useEffect(() => {
    verifyFieldsArray({ fields: fieldsParticipants, setTheme: setThemeFriends })
  }, [fieldsParticipants])

  useEffect(() => {
    verifyFieldsObject({ fields: fieldsSettings, setTheme: setThemeSettings, validateSpecial: null })
  }, [fieldsSettings])

  useEffect(() => {
    verifyFieldsArray({ fields: fieldsChats, setTheme: setThemeChats })
  }, [fieldsChats])

  const verifyFieldsObject = ({ fields, setTheme, validateSpecial = '' }) => {
    const dataFields = Object.entries(fields)
    const fieldsLength = dataFields.length
    const valuesLength = dataFields.filter(([_, value]) => value !== '' && value !== validateSpecial).length

    if (fieldsLength === valuesLength) {
      setTheme(VERIFY_ACCION.CORRECT)
    }
    if (fieldsLength > valuesLength && valuesLength === 0) {
      setTheme(VERIFY_ACCION.INITIAL)
    }
    if (fieldsLength > valuesLength && valuesLength > 0) {
      setTheme(VERIFY_ACCION.PARTIAL)
    }

  }

  const verifyFieldsArray = ({ fields, setTheme }) => {
    switch (fields.length) {
      case 0: setTheme(VERIFY_ACCION.INITIAL); break;
      case 1: setTheme(VERIFY_ACCION.PARTIAL); break;
      default: setTheme(VERIFY_ACCION.CORRECT); break;
    }
  }

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const infoAccordionCard = (section) => ({
    openSection: openSection,
    toggleSection: toggleSection,
    section
  })

  return (
    <>
      <div className='flex flex-col gap-y-4 scrollbar-liwr-200 dark:scrollbar-perl-300'>
        <div>{t('groups.createGroup')}</div>
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
        />
      </div>
    </>
  );
};

export { ViewGroups };

