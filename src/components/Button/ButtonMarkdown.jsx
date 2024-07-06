const ButtonMarkdown = ({ className, icon: Icon, isDisabled = false, ...props }) => {
  return (
    <button
      {...props}
      disabled={isDisabled}
      className={
        `${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} flex items-center  h-7 w-7 p-1 justify-center rounded-lg transition-colors duration-300 hover:bg-liwr-300 hover:dark:bg-perl-300 ${className}`
      }
    >
      <Icon />
    </button>
  );
};

export { ButtonMarkdown };
