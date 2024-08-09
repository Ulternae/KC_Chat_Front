import { AddFriends } from "../Accion/AddFriends";
import { SearchFriends } from "../Accion/SearchFriends";

const ViewFriendsUser = () => {
  return (
    <>
      <div className={"rounded-lg grid max-w-[1111px] gap-5 md:gap-0 md:grid-cols-[1fr_350px]"}>
        <div className={" rounded-lg min-h-[510px]"}>
          <div className={"md:pr-6  w-full h-full transition-opacity duration-300"}>
            <SearchFriends />
          </div>
        </div>
        <div className="rounded-lg w-full  min-h-[580px] bg-liwr-400 dark:bg-perl-500 h-[630px] mt-auto">
          <AddFriends />
        </div>
      </div>
    </>
  );
};

export { ViewFriendsUser };
