import { useState } from "react";
import { IconArrowRightLight } from "../../../assets/IconArrowRightLight";
import { IconTrash } from "../../../assets/IconTrash";
import { useTranslation } from "react-i18next";
import { PERMISSIONS as P } from "../../../constants";
import { useOutletContext } from "react-router";
import { SearchParticipants } from "./SearchParticipants";

const Participants = ({ canEdit, newInfo, setNewInfo }) => {
  const { t } = useTranslation();
  const [showInfoParticipant, setShowInfoParticipant] = useState(null);
  const [showParticipants, setShowParticipants] = useState(false);
  const { friends } = useOutletContext();
  const { friendsUser } = friends;

  const toggleShowNewParticipants = () => {
    setShowParticipants((prev) => !prev);
  };

  const toogleInfo = (id) => {
    setShowInfoParticipant((prev) => (prev === id ? null : id));
  };

  const deleteParticipant = (friend_id) => {
    setNewInfo((prev) => prev.filter((p) => p.friend_id !== friend_id));
  };

  const changePermisionFriend = (friend_id) => {
    setNewInfo((prev) =>
      prev.map((p) => {
        if (p.friend_id === friend_id) {
          const isModerator = Number(p.is_moderator);
          const newInfoParticipant = {
            ...p,
            is_moderator: isModerator ? "0" : "1",
            permissions: isModerator ? P.USER : P.MODERATOR,
          };
          return newInfoParticipant;
        }
        return p;
      })
    );
  };

  const addNewParticipant = (participant) => {
    const newParticipant = friendsUser.find(
      (f) => f.friend_id === participant.friend_id
    );
    newParticipant.is_moderator = 0;
    newParticipant.permissions = P.USER;
    setNewInfo((prev) => [...prev, newParticipant]);
  };

  const nonParticipants = friendsUser.filter(
    (f) => !newInfo.some((p) => p.friend_id === f.friend_id)
  );

  return (
    <>
      <div
        className={`${!canEdit ? " overflow-x-hidden overflow-y-auto" : ""} ${
          showParticipants ? "min-h-[400px]" : ""
        } ml-auto max-w-[400px] grid gap-3 grid-rows-[repeat(auto-fill,44px)] relative scrollbar-liwr-200 dark:scrollbar-perl-300`}
      >
        {newInfo.map((p) => {
          const isModerator = Number(p.is_moderator);
          return (
            <div
              key={p.friend_id}
              className=" relative ml-auto w-full md:max-w-[400px] xl:max-w-[340px] h-11 rounded-lg flex"
            >
              <div
                className={`z-10 w-4 rounded-l-lg ${
                  isModerator
                    ? "bg-grp-orchid-200 dark:bg-grp-orchid-400"
                    : "bg-grp-amber-200 dark:bg-grp-amber-400"
                }`}
                onClick={() => toogleInfo(p.friend_id)}
              />
              <div className="shadow-liwr-inset dark:shadow-perl-inset z-20 px-2 rounded-lg -ml-2 bg-liwr-400 dark:bg-perl-600 w-full flex gap-3 items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    className="w-8 h-8 rounded-lg object-cover"
                    src={p.avatar_url}
                  />
                  <p className="leading-none text-liwr-900 dark:text-perl-100 font-medium text-ellipsis overflow-hidden">
                    {p.nickname}
                  </p>
                </div>
                {canEdit && (
                  <IconArrowRightLight
                    className="cursor-pointer fill-liwr-500 dark:fill-perl-200 w-3 h-3"
                    onClick={() => toogleInfo(p.friend_id)}
                  />
                )}
              </div>
              {showInfoParticipant === p.friend_id && (
                <div className="absolute z-20 left-4 rounded-lg -top-10 [@media(min-width:770px)]:-top-0 [@media(min-width:770px)]:z-0 [@media(min-width:770px)]:-left-[194px] w-[200px] h-11 flex items-center bg-liwr-200 dark:bg-perl-400 px-4 rounded-l-lg">
                  <IconTrash
                    className="cursor-pointer fill-liwr-500 dark:fill-perl-200 h-5 w-4"
                    onClick={() => deleteParticipant(p.friend_id)}
                  />
                  <div className="h-full w-1 bg-liwr-400 dark:bg-perl-300 rounded-l-2xl mx-4" />
                  <p
                    className={`mr-2 font-medium cursor-pointer ${
                      isModerator
                        ? "text-grp-orchid-200 dark:text-grp-orchid-400"
                        : "text-grp-amber-200 dark:text-grp-amber-400"
                    }`}
                    onClick={() => changePermisionFriend(p.friend_id)}
                  >
                    {t(`general.${p.permissions}`)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
        {canEdit && (
          <div className="inline-flex ml-auto mt-4">
            <button
              className="min-h-10 focus:outline-none cursor-pointer text-liwr-900 dark:text-perl-200 rounded-l-lg rounded-r-sm bg-liwr-500/50 dark:bg-perl-400 font-medium px-4 py-2"
              onClick={toggleShowNewParticipants}
            >
              {t("groupView.addParticipants")}
            </button>
          </div>
        )}

        {showParticipants && (
          <SearchParticipants
            className=" flex flex-col gap-8 rounded-lg z-30 -top-2 -left-2 -right-2 -bottom-2 absolute w-[calc(100%+16px)] h-[calc(100%+16px)] min-h-[500px] bg-liwr-400/95 dark:bg-perl-600/95 px-4 py-8"
            closeView={() => setShowParticipants(false)}
            participants={nonParticipants}
            addParticipant={addNewParticipant}
            typeFilter="nickname"
            classNamePortal="grid gap-3 max-h-[440px] overflow-x-hidden overflow-y-auto"
            messageAddAllParticipants={t("groupView.allParticipantsAdded")}
          />
        )}
      </div>
    </>
  );
};

export { Participants };
