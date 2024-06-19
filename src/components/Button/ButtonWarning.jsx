const ButtonWarning = ({ text, className, ...props }) => {
  return (
    <button
      className={`transition-colors duration-300 dark:text-perl-800 text-liwr-900 px-4 rounded-md py-2 bg-warn-500 dark:bg-warn-400  ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export { ButtonWarning };
