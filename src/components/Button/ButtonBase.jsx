const ButtonBase = ({ className, text, ...props }) => {

  return (
    <button
      {...props}
      className={`transition-colors duration-300 text-liwr-900 dark:text-perl-100 px-4 py-2  bg-liwr-100 dark:bg-perl-600 rounded-md min-w-28  ${className}`}
    >
      { text}
    </button>
  );
};

export { ButtonBase };
