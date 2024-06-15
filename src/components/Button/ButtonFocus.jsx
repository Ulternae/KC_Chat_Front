const ButtonFocus = ({ text, className, ...props }) => {
  return (
    <button
      className={`transition-colors duration-300 dark:text-liwr-900 text-perl-100 px-4 rounded-md py-2 bg-liwr-900 dark:bg-perl-100  ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export { ButtonFocus };
