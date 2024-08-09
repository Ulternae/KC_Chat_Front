import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { IconGroup } from "@assets/IconGroup";
import { addMembersInGroup } from "@services/groups/addMembersInGroup";
import { ButtonFocus } from "@components/Button/ButtonFocus";
import { CardGroupAction } from "@components/Card/CardGroupAction";
import { OPTIONS_PARTICIPANTS as OP } from "@constants";
import { getToken } from "@token";

const ViewAddGroups = () => {
  const { t } = useTranslation();
  const { groups, avatars, dataUser } = useOutletContext();
  const { setGroupsUser, setGroupNonUser, groupNonUser } = groups;
  const { avatarsUser } = avatars;
  const [newGroup, setNewGroup] = useState([]);
  const token = getToken() 

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
      setNewGroup((prev) => [...prev, newGroupForAdd])
      setGroupNonUser((prev) => prev.filter((g) => g.group_id !== group_id));
    
      try {
        await addMembersInGroup({
          t,
          token,
          groupId: group_id,
          membersGroup: [dataUser.user_id],
        })
      } catch (error) {
        setNewGroup((prev) => prev.filter((g) => g.group_id !== group_id));
        
      }
    }
  };

  const confirmNewGroups = () => {
    setGroupsUser(newGroup);
  };

  const confirmAvailable = newGroup.length !== 0;
  return (
    <div className="scrollbar-liwr-200 dark:scrollbar-perl-300 min-h-[525px] grid grid-rows-[55px_1fr] max-w-[1111px]">
      <div className="bg-liwr-500 dark:bg-perl-600 rounded-t-lg" />
      <div className="h-full bg-liwr-400 dark:bg-perl-500 rounded-b-lg py-8 lg:py-12 xl:py-14 grid grid-cols-1 sm:grid-cols-[1fr_2fr] lg:gap-x-6 gap-y-16 lg:grid-cols-1 xl:sm:grid-cols-[1fr_2fr]">
        <div className="pl-4 pr-4 sm:pl-6 sm:pr-0 lg:pl-12 lg:pr-12 xl:pl-14 xl:pr-0 w-full sm:min-w-[300px] lg:min-w-[400px] flex flex-col gap-16 ">
          <span className=" text-liwr-100 dark:text-perl-100">
            <h1 className="font-semibold text-2xl leading-none">
              {t("groups.notHaveGroups")}
            </h1>
            <h2 className="text-lg leading-none">
              {t("groups.inviteJoinGroup")}
            </h2>
          </span>
          <div className=" w-full gap-2 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(280px,1fr))]">
            {groupNonUser.slice(0, 6).map((g) => {
              const avatar =
                avatarsUser.find((a) => a.avatar_id === g.avatar_id) || [];
              return (
                <CardGroupAction
                  key={g.group_id}
                  group={g}
                  action={() => handleAddGroup({ group_id: g.group_id })}
                  icon={IconGroup}
                  avatar={avatar}
                />
              );
            })}
            {!confirmAvailable && <div className="h-[76px]" />}

            {confirmAvailable && (
              <ButtonFocus
                text={"Confirm"}
                className=" w-full max-w-[300px] xl:max-w-[344px] lg:col-span-2 xl:col-span-1 ml-auto mt-10 text-sm"
                onClick={confirmNewGroups}
              />
            )}
          </div>
        </div>
        <div className="flex justify-end items-end ">
          <img className="w-full ml-auto max-w-[550px]" src="crocodile.png" />
        </div>
      </div>
    </div>
  );
};

export { ViewAddGroups };
