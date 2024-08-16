import { useOutletContext } from "react-router";

const GroupsErrorView = () => {
  const { groups } = useOutletContext();
  const { errorFetchGroups } = groups;
  
  return (
    <div className="rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 w-full">
      <div className="md:grid md:grid-cols-3 flex flex-col justify-between h-full gap-y-8">
        <img className="md:col-span-3 w-full max-w-[700px]" src="headerSalamander.png" />
        <p className="md:col-start-2 md:col-end-4 md:row-start-2 md:row-end-3 px-2 sm:px-10 md:px-0 md:pl-24 md:pr-10 xl:px-10 xl:pl-10 text-center max-w-[550px] sm:text-start text-liwr-800 dark:text-perl-100 font-semibold text-2xl leading-none">{errorFetchGroups.message}</p>
        <img
          className="md:col-start-1 md:col-end-3 md:row-start-2 md:row-end-3 px-2 sm:px-10 pb-10 w-full max-w-[500px] object-contain"
          src="salamander.png"
        />
      </div>
    </div>
  );
};

export { GroupsErrorView };
