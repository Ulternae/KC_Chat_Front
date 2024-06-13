const ButtonSettings = ({ icon: Icon, text, ...props }) => {
  return (
    <button
      className="flex gap-3 items-center h-12 ml-4 transition-colors duration-300 hover:fill-liwr-900 hover:dark:fill-perl-100 fill-liwr-800 dark:fill-perl-200 text-liwr-800 dark:text-perl-200 hover:text-liwr-900 dark:hover:text-perl-100"
      {...props}
    >
      <Icon />
      <p className="text-sm font-semibold  ">{text}</p>
    </button>
  );
};

export { ButtonSettings };
