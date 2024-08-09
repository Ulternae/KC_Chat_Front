import React from "react";
import { useTranslation } from "react-i18next";

const GroupsNotFound = ({ activator }) => {
  const { t } = useTranslation();
  const entriesWithInfo = Object.entries(activator).filter(
    ([_, value]) => value !== ""
  );

  const hasInfo = entriesWithInfo.length > 0;
  return (
    <>
      <div className="flex flex-col md:justify-center md:flex-row gap-y-5">
        <img className="mx-auto w-full max-w-96 md:mx-0" src="salamander.png" />
        {!hasInfo && (
          <p className="md:mt-10 md:-ml-16 md:text-start h-auto text-lg text-center font-medium text-liwr-900 dark:text-perl-100">
            {t('groups.noMoreGroups')}
          </p>
        )}
        {hasInfo && (
          <span className="md:mt-10 md:-ml-16 md:text-start h-auto text-lg text-center font-medium text-liwr-900 dark:text-perl-100">
            {t("groups.notHaveGroupsSearch")}{" "}
            {entriesWithInfo.map(([key, value], index) => (
              <React.Fragment key={key}>
                {index > 0 && ", "}
                {t(`general.${key}`).toLowerCase()}{" "}
                <span className="font-bold">{value}</span>
              </React.Fragment>
            ))}
          </span>
        )}
      </div>
    </>
  );
};

export { GroupsNotFound };
