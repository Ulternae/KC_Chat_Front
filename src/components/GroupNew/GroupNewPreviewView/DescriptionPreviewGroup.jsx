import { useTranslation } from "react-i18next";
import { MARKDOWN } from "../../../constants";
import { MarkdownView } from "../../../components/Markdown/MarkdownView";

const DescriptionPreviewGroup = ({ className, info }) => {
  const isConditionValid = (input, condition) => input !== condition;
  const { description } = info;
  const { t } = useTranslation();
  return (
    <div className={`${className} flex flex-col gap-y-2`}>
      <h1 className="text-base font-medium leading-none text-liwr-900 dark:text-perl-100">
        {t("general.description")}
      </h1>
      <div className=" text-sm text-liwr-800 dark:text-perl-200 leading-none w-full">
        {isConditionValid(description, MARKDOWN.DEFAULT) ? (
          <MarkdownView data={description} />
        ) : (
          <h1 className="text-liwr-900/50 dark:text-perl-100/50 ">
            {t("groupChatPreview.setDescription")}
          </h1>
        )}
      </div>
    </div>
  );
};

export { DescriptionPreviewGroup };
