import { IconSearch } from "@assets/IconSearch";

const InputSearch = ({ search , setSearch , text , className = '', classNameInput = 'bg-liwr-600 text-liwr-100 dark:bg-perl-300 dark:text-perl-100 w-full h-10 rounded-lg pl-4 pr-12 text-sm ',...props}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        className={`focus:outline-none ${classNameInput}`}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={text}
        { ...props }
      />
      <IconSearch className={"absolute right-4 top-0 bottom-0 h-full"} />
    </div>
  );
};

export { InputSearch };
