import { IconTriangle } from "@assets/IconTriangle";

const CardGroupAction = ({ group, avatar, icon: Icon, action }) => {
  const { color, category, name, detailsUsers } = group;

  return (
    <div className="grid grid-cols-[1fr_48px] w-full h-11 ">
      <div className="relative bg-liwr-200 dark:bg-perl-600 rounded-l-lg rounded-r-[4px] z-10 h-11 flex  items-center px-3 gap-2">
        {avatar?.url ? (
          <img
            className="bg-liwr-100 w-8 h-8 object-cover rounded-full cursor-pointer"
            src={avatar?.url}
            alt="Non groups user avatar"
          />
        ) : (
          <div className="bg-liwr-100 dark:bg-perl-300 w-8 h-8 object-cover rounded-full" />
        )}

        <span className="flex flex-col max-w-[120px]">
          <p className=" text-sm font-normal text-liwr-800 dark:text-perl-100 leading-none truncate">
            {name}
          </p>
          <p className="font-light text-xs text-liwr-700 dark:text-perl-200 leading-none truncate">
            {category}
          </p>
        </span>
        <div className="absolute bottom-0 right-0 flex gap-1">
          <p
            className={`font-semibold absolute right-4 bottom-1 mb-2 leading-none text-xs text-grp-${color}-200 dark:text-grp-${color}-200`}
          >
            +{detailsUsers.length}
          </p>
          <IconTriangle
            className={`absolute bottom-2 right-2 fill-grp-${color}-200 dark:fill-grp-${color}-400`}
          />
        </div>
      </div>

      <div
        className="bg-liwr-300 dark:bg-perl-400 rounded-lg -ml-3 z-0 pl-3 h-11 flex items-center justify-center cursor-pointer"
        onClick={action}
      >
        <Icon className="fill-liwr-100 dark:fill-perl-200 h-6 w-6" />
      </div>
    </div>
  );
};

export { CardGroupAction };
