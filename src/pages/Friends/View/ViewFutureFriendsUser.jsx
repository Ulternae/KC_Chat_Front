import { useTranslation } from "react-i18next";
import { AddFriends } from "../Accion/AddFriends";

const ViewFutureFriendsUser = () => {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={
          "rounded-lg grid max-w-[1111px] gap-5 md:gap-0 md:grid-cols-[1fr_350px] sm:bg-gradient-to-b sm:dark:from-perl-800 sm:dark:to-perl-500 sm:from-liwr-200 sm:to-liwr-400 sm:bg-liwr-400 sm:dark:bg-perl-500"
        }
      >
        <div
          className={
            "rounded-lg sm:col-span-1 min-h-[510px] bg-gradient-to-b dark:from-perl-800 dark:to-perl-500 from-liwr-200 to-liwr-400 bg-liwr-400 dark:bg-perl-500 sm:bg-transparent sm:dark:bg-transparent sm:bg-none sm:dark:bg-none"
          }
        >
          <div className={"grid h-full py-8 pl-6"}>
            <h1 className="text-base sm:text-xl ms:text-2xl font-semibold leading-none text-liwr-900 dark:text-perl-200 w-2/3 self-start">
              {t("friends.noHaveFriends")}
            </h1>
            <div className="w-full my-20 sm:my-32 md:my-0">
              <img src="parrot.png" alt="Parrot invite a add friends" />
            </div>
          </div>
        </div>
        <div className="rounded-lg sm:col-span-1 w-full min-h-[580px] bg-liwr-400 dark:bg-perl-500 sm:bg-transparent sm:dark:bg-transparent h-[630px] mt-auto">
          <AddFriends />
        </div>
      </div>
    </>
  );
};

export { ViewFutureFriendsUser };
