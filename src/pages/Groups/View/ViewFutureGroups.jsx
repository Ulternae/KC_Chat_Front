import { ButtonFocus } from "@components/Button/ButtonFocus";
import { GroupCardView } from "@components/Groups/GroupCardView";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useOutletContext } from "react-router";
import { getToken } from "../../../token";
import { addMembersInGroup } from "../../../services/groups/addMembersInGroup";
import { OPTIONS_PARTICIPANTS as OP } from "../../../constants";
import { IconAddGroup } from "../../../assets/IconAddGroup";

const ViewFutureGroups = () => {
  const navigate = useNavigate();
  const { dataUser, groups } = useOutletContext();
  const token = getToken();
  const { t } = useTranslation();
  const [newGroups, setNewGroups] = useState([]);

  const { setGroupsUser, setGroupNonUser, groupNonUser } = groups;

  const handleAddNewGroup = async ({ group_id }) => {
    const newGroupForAdd = groupNonUser.find((g) => g.group_id === group_id);
    const newUserId = dataUser.user_id.concat(":0");
    const newUserDetails = {
      ...dataUser,
      friend_id: dataUser.user_id,
      is_moderator: 0,
      permissions: OP.USER,
    };

    newGroupForAdd.user_ids = newGroupForAdd.user_ids.concat(newUserId);
    newGroupForAdd.detailsUsers = [
      ...newGroupForAdd.detailsUsers,
      newUserDetails,
    ];

    if (newGroupForAdd) {
      setNewGroups((prev) => [...prev, newGroupForAdd]);
      setGroupNonUser((prev) => prev.filter((g) => g.group_id !== group_id));

      try {
        await addMembersInGroup({
          t,
          token,
          groupId: group_id,
          membersGroup: [dataUser.user_id],
        });
      } catch (error) {
        setNewGroups((prev) => prev.filter((g) => g.group_id !== group_id));
      }
    }
  };

  const handleConfirmNewGroups = () => {
    setGroupsUser(newGroups);
  };

  const hasNewGroups = newGroups.length > 0;
  const hasGroupNonUser = groupNonUser.length > 0;
  return (
    <div className="transition-colors duration-300 max-w-[1111px] grid gap-x-4 gap-y-12 sm:grid-cols-[minmax(240px,1fr)_minmax(188px,400px)_112px] sm:grid-rows-[120px_1fr]">
      <div className="row-start-1 row-end-2 col-start-1 col-end-3 sm:col-start-2 sm:col-end-3 flex sm:gap-4 items-center">
        <h1 className="sm:text-end text-liwr-700 dark:text-perl-200 font-semibold text-xl leading-none">
          {t("groups.inviteCreateJoin")}
        </h1>
      </div>

      <div className="col-start-1 col-end-3 sm:col-end-2 sm:row-start-1 sm:row-end-3 flex flex-col justify-between">
        <img className="w-full" src="headerSalamander.png" />
        <img
          className="pr-10 w-full max-w-[500px] object-contain"
          src="salamander.png"
        />
      </div>
      <ButtonFocus
        text={t('groups.createGroup')}
        className={
          "ml-auto sm:m-auto w-32 leading-none h-16 font-medium text-base row-start-3 row-end-4 col-start-1 col-end-3 sm:row-start-1 sm:row-end-2 sm:col-start-3 sm:col-end-4"
        }
        onClick={() => navigate("/groups/createGroup")}
      />
      <section className="flex flex-col gap-8 h-[490px] justify-between col-start-1 col-end-3 sm:col-start-2 sm:col-end-4 scrollbar-liwr-300 dark:scrollbar-perl-400 mt-auto">
        <h2 className=" text-liwr-700 dark:text-perl-200 font-semibold text-base ">
          {t("groups.joinPublic")}
        </h2>
        <div className="max-h-[394px] overflow-x-hidden overflow-y-auto">
          {!hasGroupNonUser && (
            <div className="h-72">
              <p className=" text-liwr-700 dark:text-perl-100">
                {t("groupChat.noMoreGroupsForAdd")}
              </p>
            </div>
          )}
          <div className="grid gap-x-3 gap-y-2">
            {hasGroupNonUser && (
              <>
                {groupNonUser.map((group) => (
                  <GroupCardView
                    key={group.group_id}
                    groupInfo={group}
                    handleAddNewGroup={handleAddNewGroup}
                  >
                    <IconAddGroup
                      className="w-5 h-5"
                      onClick={() => handleAddNewGroup({ group_id: group.group_id })}
                    />
                  </GroupCardView>
                ))}
              </>
            )}
          </div>
        </div>
        {!hasNewGroups && <div className="h-10"></div>}
        {hasNewGroups && (
          <ButtonFocus
            text={"Confirm"}
            className={"w-full max-w-[300px] text-base"}
            onClick={handleConfirmNewGroups}
          />
        )}
      </section>
    </div>
  );
};

export { ViewFutureGroups };
