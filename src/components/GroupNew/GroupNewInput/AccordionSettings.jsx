import { useOutletContext } from "react-router";
import { AccordionCard } from "@components/Accordion/AccordionCard";
import {
  ACCION_THEME,
  COLORS_USERS,
  MANAGEMENT_GROUPS,
} from "../../../constants";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LoadingSpinner } from "@loading/LoadingSpinner";
import { SelectOptionsPersonalized } from "../../Select/SelectOptionsPersonalized";
import { FormText } from "../../Form/FormText";
import { FormLayout } from "../../Form/FormLayout";
import { IconArrowBold } from "../../../assets/IconArrowBold";
import { IconFlagGroupTop } from "../../../assets/IconFlagGroupTop";
import { avatarNotFoundError } from "../../../utils/avatarNotFoundError";

const AccordionSettings = ({ fields, theme, infoAccordion, setFields }) => {
  const { t } = useTranslation();
  const { avatars } = useOutletContext();
  const { avatarsUser, loadingAvatars, errorFetchAvatars } = avatars;
  const { openSection, toggleSection, section } = infoAccordion;
  const [avatarSelected, setAvatarSelected] = useState([]);

  useEffect(() => {
    if (!loadingAvatars) {
      setAvatarSelected(avatarsUser[fields.avatar_id]);
    }
  }, [loadingAvatars]);

  const handleChangeColor = ({ color }) => {
    setFields({ ...fields, color });
  };

  const handleChangeManagement = ({ managementType }) => {
    const is_public = MANAGEMENT_GROUPS.PUBLIC === managementType;
    setFields({ ...fields, is_public });
  };

  const handleChangeAvatar = ({ avatar }) => {
    setAvatarSelected(
      (prev) =>
        avatarsUser.find(
          (avatarUser) => avatarUser.avatar_id === avatar.avatar_id
        ) || prev
    );
    setFields({ ...fields, avatar_id: avatar.avatar_id });
  };

  const typeGroup = fields.is_public
    ? MANAGEMENT_GROUPS.PUBLIC
    : MANAGEMENT_GROUPS.PRIVATE;

  return (
    <AccordionCard
      statusColor={` fill-${ACCION_THEME[theme]}/50`}
      section={section}
      openSection={openSection}
      toggleSection={toggleSection}
      name={t("general.settings")}
    >
      {loadingAvatars && <LoadingSpinner className={"h-[240px]"} />}
      {!loadingAvatars && errorFetchAvatars.error && (
        <div className="pb-4 pt-8">
          <p className="text-sm text-center text-warn-800 dark:text-warn-100 font-medium">
            {errorFetchAvatars.message}
          </p>
        </div>
      )}
      {!loadingAvatars && !errorFetchAvatars.error && (
        <div className="h-[240px] relative flex flex-wrap gap-x-3 gap-y-2">
          <SelectOptionsPersonalized>
            <div className="mx-auto my-auto w-20 h-20 bg-liwr-300 dark:bg-perl-600 rounded-tr-lg rounded-bl-lg rounded-br-xl rounded-tl-3xl p-2">
              <img
                className="w-full h-full object-cover rounded-tr-[4px] rounded-tl-[20px] rounded-br-lg rounded-bl-[4px]"
                src={avatarSelected.url}
                onError={avatarNotFoundError}
              />
            </div>
            <div className="pt-2 pb-4 w-full max-w-[270px] sm:max-w-[480px] md:max-w-[270px] h-full absolute z-20 top-0 right-0 bottom-0">
              <FormText text={t("avatar.title")} />
              <div className="relative rounded-lg grid bg-liwr-300 dark:bg-perl-600 h-full w-full overflow-x-hidden overflow-y-auto">
                <IconFlagGroupTop
                  className={`z-[8] fill-grp-${fields.color}-100 dark:fill-grp-${fields.color}-400 absolute left-11 top-0 -right-[1px]`}
                />

                <div className="px-4 py-6 gap-2 grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] sm:grid-cols-[repeat(auto-fit,minmax(56px,1fr))] md:grid-cols-[repeat(auto-fit,minmax(40px,1fr))]">
                  {avatarsUser.map((avatar) => (
                    <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-10 md:h-10" key={avatar.avatar_id}>
                      <img
                        className={`transition-opacity duration-300 hover:opacity-100 ${
                          avatarSelected.avatar_id === avatar.avatar_id
                            ? "shadow-liwr-focus dark:shadow-perl-100 opacity-100"
                            : "opacity-50 "
                        } rounded-tr-[4px] rounded-bl-[4px] rounded-tl-[20px] rounded-br-lg object-cover w-full h-full`}
                        src={avatar.url}
                        onError={avatarNotFoundError}
                        onClick={() => handleChangeAvatar({ avatar })}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </SelectOptionsPersonalized>
          <div className="flex flex-col flex-1 min-w-44 gap-y-2">
            <FormLayout>
              <FormText text={t("general.color")} />

              <SelectOptionsPersonalized className=" bg-liwr-300 dark:bg-perl-600 w-full h-[40px] rounded-lg">
                <div className="min-h-10 cursor-pointer px-5 py-3 flex justify-between items-center">
                  <p className=" text-sm text-liwr-900 dark:text-perl-100 leading-none">
                    {t(`colorsUsers.${fields.color}`)}
                  </p>
                  <div
                    className={`h-4 w-4 rounded-md bg-grp-${fields.color}-200 dark:bg-grp-${fields.color}-400`}
                  />
                </div>

                <div className="z-20 relative mt-2 py-4 bg-liwr-300 dark:bg-perl-600 rounded-lg">
                  {Object.values(COLORS_USERS).map((color) => (
                    <div
                      className={`flex px-5 py-3 h-10 cursor-pointer hover:bg-liwr-200 hover:dark:bg-perl-500 ${
                        color === fields.color
                          ? "bg-liwr-200/60 dark:bg-perl-400"
                          : ""
                      }`}
                      key={color}
                      onClick={() => handleChangeColor({ color })}
                    >
                      <p
                        className={`text-sm font-semibold dark:font-medium text-grp-${color}-200 dark:text-grp-${color}-400`}
                      >
                        {t(`colorsUsers.${color}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </SelectOptionsPersonalized>
            </FormLayout>
            <FormLayout>
              <FormText text={t("general.management")} />
              <SelectOptionsPersonalized className="bg-liwr-300 dark:bg-perl-600 w-full h-[40px] rounded-lg">
                <div className="min-h-10 cursor-pointer px-5 py-3 flex justify-between items-center">
                  <p className=" text-sm text-liwr-900 dark:text-perl-100 leading-none">
                    {t(`management.${typeGroup}`)}
                  </p>
                  <IconArrowBold className={"w-3 h-3 "} />
                </div>

                <div className="mt-2 py-4 bg-liwr-300 dark:bg-perl-600 rounded-lg">
                  {Object.values(MANAGEMENT_GROUPS).map((managementType) => (
                    <div
                      className={`flex px-5 py-3 h-10 cursor-pointer hover:bg-liwr-200 hover:dark:bg-perl-500 ${
                        (
                          fields.is_public
                            ? managementType === MANAGEMENT_GROUPS.PUBLIC
                            : managementType === MANAGEMENT_GROUPS.PRIVATE
                        )
                          ? "bg-liwr-200/60 dark:bg-perl-400"
                          : ""
                      }`}
                      key={managementType}
                      onClick={() => handleChangeManagement({ managementType })}
                    >
                      <p className="text-sm font-semibold dark:font-medium text-liwr-900 dark:text-perl-100 leading-none">
                        {t(`management.${managementType}`)}
                      </p>
                    </div>
                  ))}
                </div>
              </SelectOptionsPersonalized>
            </FormLayout>
          </div>
        </div>
      )}
    </AccordionCard>
  );
};

export { AccordionSettings };
