import { AccordionCard } from "@components/Accordion/AccordionCard"
import { ACCION_THEME } from "../../../constants"
import { MarkdownDescription } from "../../../components/Markdown/MarkdownDescription"
import { useTranslation } from "react-i18next"
import { FormText } from "../../../components/Form/FormText"
import { FormInput } from "../../../components/Form/FormInput"
import { FormLayout } from "../../../components/Form/FormLayout"

const AccordionContent = ({ theme, infoAccordion, fields, setFields }) => {
  const { t } = useTranslation()
  const { openSection, toggleSection, section } = infoAccordion

  return (
    <AccordionCard
      statusColor={`fill-${ACCION_THEME[theme]}/50`}
      section={section}
      openSection={openSection}
      toggleSection={toggleSection}
      name={'Content'}

    >
      <FormLayout >
        <FormText text={t('general.title')} />
        <FormInput
          text={t('groups.setTitle')}
          type={'title'}
          fields={fields}
          setFields={setFields}
        />
      </FormLayout>

      <FormLayout classname="relative pt-2 flex flex-col" >
        <FormText text={t('general.description')} />
        <MarkdownDescription
          setFieldsContent={setFields}
        />
      </FormLayout>

      <FormLayout>
        <FormText text={t('general.category')} />
        <FormInput
          text={t('groups.setCategory')}
          type={'category'}
          fields={fields}
          setFields={setFields}
        />
      </FormLayout>

    </AccordionCard>
  )
}

export { AccordionContent } 