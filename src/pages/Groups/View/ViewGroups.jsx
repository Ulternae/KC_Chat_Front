import { useState } from "react";
import { AccordionGroups } from "../../../components/Accordion/AccordionGroups";
import { InputSearch } from "../../../components/Input/InputSearch";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router";
import { GroupCardView } from "../../../components/Groups/GroupCardView";
import { IconMessage } from "../../../assets/IconMessage";
import { IconWarning } from "../../../assets/IconWarning";
import { IconAdd } from "../../../assets/IconAdd";
import { IconAddGroup } from "../../../assets/IconAddGroup";
import { GroupsNotFound } from "../../../components/Groups/GroupsNotFound";
import { OPTIONS_PARTICIPANTS as OP } from "@constants";
import { addMembersInGroup } from "@services/groups/addMembersInGroup";
import { getToken } from "@token";

const ViewGroups = () => {
  const defaultSearch = { name: "", category: "" };
  const navigate = useNavigate()
  const token = getToken()
  const { dataUser, groups } = useOutletContext();
  const { nickname } = dataUser;
  const { t } = useTranslation();
  const { groupsUser, setGroupsUser, groupNonUser, setGroupNonUser } = groups;
  const [openSection, setOpenSection] = useState(1);
  const [searchNonGroups, setSearchNonGroups] = useState(defaultSearch);
  const [searchGroups, setSearchGroups] = useState(defaultSearch);

  const handleSearch = ({ type, set, value }) => {
    set((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const handleSearchNonGroupName = (value) =>
    handleSearch({ type: "name", set: setSearchNonGroups, value });

  const handleSearchNonGroupCategory = (value) =>
    handleSearch({ type: "category", set: setSearchNonGroups, value });

  const handleSearchGroupName = (value) =>
    handleSearch({ type: "name", set: setSearchGroups, value });

  const handleSearchGroupCategory = (value) =>
    handleSearch({ type: "category", set: setSearchGroups, value });

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleAddGroup = async ({ group_id }) => {
    const newGroupForAdd = groupNonUser.find((g) => g.group_id === group_id);
    const newUserId = dataUser.user_id.concat(":0")
    const newUserDetails = {
      ...dataUser,
      friend_id: dataUser.user_id,
      is_moderator: 0,
      permissions: OP.USER,
    };

    newGroupForAdd.user_ids = newGroupForAdd.user_ids.concat(newUserId)
    newGroupForAdd.detailsUsers = [
      ...newGroupForAdd.detailsUsers,
      newUserDetails
    ]

    if (newUserDetails) {
      setGroupsUser((prev) => [...prev, newGroupForAdd])
      setGroupNonUser((prev) => prev.filter((g) => g.group_id !== group_id));
    
      try {
        await addMembersInGroup({
          t,
          token,
          groupId: group_id,
          membersGroup: [dataUser.user_id],
        })
      } catch (error) {
        setGroupsUser((prev) => prev.filter((g) => g.group_id !== group_id));
      }
    }
  }
  const groupsUserFilter = groupsUser.filter(
    (g) =>
      g.name.toLowerCase().includes(searchGroups.name.toLowerCase()) &&
      g.category.toLowerCase().includes(searchGroups.category.toLowerCase())
  );

  const nonGroupsUserFilter = groupNonUser.filter(
    (g) =>
      g.name.toLowerCase().includes(searchNonGroups.name.toLowerCase()) &&
      g.category.toLowerCase().includes(searchNonGroups.category.toLowerCase())
  );

  const handleCreateGroup = () => navigate("/groups/createGroup");
  const activatorGroups = searchGroups
  const activatorNonGroups = searchNonGroups

  return (
    <div className="h-full flex flex-col gap-6 scrollbar-liwr-200 dark:scrollbar-perl-300 max-w-[1111px]">
      <AccordionGroups
        title={`${t("groups.title")} ${nickname}`}
        section={1}
        openSection={openSection}
        toggleSection={toggleSection}
        classNameChildren="grid gap-8 pt-8 pb-2"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <div
            className="bg-liwr-500 dark:bg-perl-300 h-8 w-8 rounded-lg grid place-content-center cursor-pointer"
            onClick={handleCreateGroup}
          >
            <IconAdd />
          </div>
          <InputSearch
            search={searchGroups.name}
            setSearch={handleSearchGroupName}
            text={t("search.searchByName")}
            className="w-full max-w-96"
            classNameInput="bg-liwr-500 dark:bg-perl-300 text-liwr-100 dark:text-perl-200 w-full h-8 rounded-lg pl-4 pr-12 text-sm"
          />
          <InputSearch
            search={searchGroups.category}
            setSearch={handleSearchGroupCategory}
            text={t("search.searchByCategory")}
            className="w-full max-w-96"
            classNameInput="bg-liwr-500 dark:bg-perl-300 text-liwr-100 dark:text-perl-200 w-full h-8 rounded-lg pl-4 pr-12 text-sm"
          />
        </div>
        <div className="max-h-[468px] overflow-x-hidden overflow-y-auto">
          <div className=" grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {groupsUserFilter.length === 0 && (
              <GroupsNotFound activator={activatorGroups}/>
            )}
            {groupsUserFilter.length > 0 &&
              groupsUserFilter.map((group) => (
                <GroupCardView key={group.group_id} groupInfo={group}>
                  <IconMessage
                    className=" cursor-pointer fill-liwr-500 dark:fill-perl-200"
                    onClick={() => navigate(`/messages/groups/${group.group_id}`)}
                  />
                  <div className="w-full bg-liwr-300 dark:bg-perl-300 h-1 rounded-lg" />
                  <IconWarning
                    onClick={() => navigate(`/groups/${group.group_id}`)}
                    className="z-10 mx-auto cursor-pointer fill-liwr-500 dark:fill-perl-200"
                  />
                </GroupCardView>
              ))}
          </div>
        </div>
      </AccordionGroups>

      <AccordionGroups
        title={t('groups.groupsPublic')}
        section={2}
        openSection={openSection}
        toggleSection={toggleSection}
        classNameChildren="grid gap-8 pt-8 pb-4"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <InputSearch
            search={searchNonGroups.name}
            setSearch={handleSearchNonGroupName}
            text={t("search.searchByName")}
            className="w-full max-w-96"
            classNameInput="bg-liwr-500 dark:bg-perl-300 text-liwr-100 dark:text-perl-200 w-full h-8 rounded-lg pl-4 pr-12 text-sm"
          />
          <InputSearch
            search={searchNonGroups.category}
            setSearch={handleSearchNonGroupCategory}
            text={t("search.searchByCategory")}
            className="w-full max-w-96"
            classNameInput="bg-liwr-500 dark:bg-perl-300 text-liwr-100 dark:text-perl-200 w-full h-8 rounded-lg pl-4 pr-12 text-sm"
          />
        </div>
        <div className="max-h-[468px] overflow-x-hidden overflow-y-auto">
          <div className=" grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
            {nonGroupsUserFilter.length === 0 && (
              <GroupsNotFound activator={activatorNonGroups}/>
            )}
            {nonGroupsUserFilter.map((g) => (
              <GroupCardView key={g.group_id} groupInfo={g}>
                <IconAddGroup
                  className="w-5 h-5"
                  onClick={() => handleAddGroup(({group_id: g.group_id}))}
                />
              </GroupCardView>
            ))}
          </div>
        </div>
      </AccordionGroups>
    </div>
  );
};

export { ViewGroups };