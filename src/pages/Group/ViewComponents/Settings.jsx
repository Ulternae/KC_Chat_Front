import { useTranslation } from "react-i18next";
import { MANAGEMENT_GROUPS as MG, COLORS_USERS as CU } from "@constants";
import { SelectOptionsPersonalized } from "../../../components/Select/SelectOptionsPersonalized";
import { IconColorView } from "../../../assets/IconColorView";
import { CardViewSettingsGroup } from "../../../components/Card/CardViewSettingsGroup";

const Settings = ({ permission, newInfo, setNewInfo, canEdit }) => {
  const { color, is_public } = newInfo;

  const { t } = useTranslation();
  const typeManagement = is_public ? MG.PUBLIC : MG.PRIVATE;

  const handleChangeTypeManagement = (type) => {
    setNewInfo((prev) => ({
      ...prev,
      is_public: type === MG.PUBLIC ? 1 : 0,
    }));
  };

  const handleChangeTypeColor = (colorSelected) => {
    setNewInfo((prev) => ({
      ...prev,
      color: colorSelected,
    }));
  };

  return (
    <div className="grid gap-3 mt-auto">
      <SelectOptionsPersonalized className="grid gap-4">
        <CardViewSettingsGroup
          primaryText={t("general.management")}
          secondaryText={t(`management.${typeManagement}`)}
          canEdit={canEdit}
        />
        {canEdit && (
          <div className="w-full rounded-lg bg-liwr-500/50 dark:bg-perl-400 py-4">
            {Object.values(MG).map((type) => {
              const isSelected = type === typeManagement;
              return (
                <div
                  key={type}
                  className={`px-6 h-10 flex gap-2 items-center cursor-pointer hover:bg-liwr-500/60 hover:dark:bg-perl-300 ${
                    isSelected ? "dark:bg-perl-400 bg-liwr-500/40" : ""
                  }`}
                  onClick={() => handleChangeTypeManagement(type)}
                >
                  <p
                    className={`${
                      isSelected ? "text-liwr-900 dark:text-perl-100" : "text-liwr-800 dark:text-perl-200"
                    }`}
                  >
                    {t(`management.${type}`)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </SelectOptionsPersonalized>

      <SelectOptionsPersonalized className={"grid gap-4"}>
        <CardViewSettingsGroup
          primaryText={t("general.color")}
          secondaryText={t(`colorsUsers.${color}`)}
          canEdit={canEdit}
        >
          <IconColorView
            className={`fill-grp-${color}-100 dark:fill-grp-${color}-300`}
            secondaryColor={`fill-grp-${color}-200 dark:fill-grp-${color}-400`}
          />
        </CardViewSettingsGroup>

        {canEdit && (
          <div className="w-full rounded-lg bg-liwr-500/50 dark:bg-perl-400 py-4">
            {Object.values(CU).map((colorUser) => {
              const isSelected = colorUser === color;
              return (
                <div
                  key={colorUser}
                  className={`px-6 h-10 flex gap-2 items-center cursor-pointer hover:bg-liwr-500/60 hover:dark:bg-perl-300 ${
                    isSelected ? "dark:bg-perl-400 bg-liwr-500/40" : ""
                  }`}
                  onClick={() => handleChangeTypeColor(colorUser)}
                >
                  <div className={`w-4 h-4 rounded-sm bg-grp-${colorUser}-100 dark:bg-grp-${colorUser}-400`}/>
                  <p className={`dark:text-grp-${colorUser}-400 text-grp-${colorUser}-100`}>
                    {t(`colorsUsers.${colorUser}`)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </SelectOptionsPersonalized>

      <CardViewSettingsGroup
        primaryText={t("general.permissions")}
        secondaryText={t(`permission.${permission}`)}
      />
    </div>
  );
};

export { Settings };
