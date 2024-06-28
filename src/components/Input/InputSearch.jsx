import { IconSearch } from "@assets/IconSearch";

const InputSearch = ({ search , setSearch , text , className = '', ...props}) => {
  return (
    <div className={`relative ${className}`}>
      <input
        className="focus:outline-none bg-liwr-900 text-liwr-100 dark:bg-perl-300 dark:text-perl-100 w-full h-10 rounded-lg pl-4 pr-12 text-sm "
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={text}
        { ...props }
      />
      <IconSearch className={"absolute right-4 top-0 bottom-0 h-10"} />
    </div>
  );
};

export { InputSearch };
