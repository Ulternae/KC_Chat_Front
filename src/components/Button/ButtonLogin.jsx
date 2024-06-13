const ButtonLogin = ({ text, ...props }) => {

  return (
    <button
      {...props}
      className="px-2 font-medium text-liwr-900 dark:text-perl-100 bg-liwr-100 dark:bg-perl-600 rounded min-w-28 h-10 flex justify-self-end place-content-center items-center text-sm"
    >
      { text}
    </button>
  );
};

export { ButtonLogin };
