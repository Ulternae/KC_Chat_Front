const InputAccountText = ({ title, text }) => {
  return (
    <div className="transition-colors duration-300 relative scrollbar-liwr-500 dark:scrollbar-perl-300 overflow-x-hidden min-h-16 ">
      <div className="absolute py-[2px] left-4 w-32 rounded-bl-lg rounded-tr-lg bg-liwr-500 dark:bg-perl-100 px-3">
        <p className="text-sm font-semibold text-liwr-100 dark:text-perl-800">
          {title}
        </p>
      </div>
      <div className="pt-3">
        <div className="overflow-x-scroll w-full overflow-hidden min-h-16 border-2 border-liwr-500/20 dark:border-perl-300/70 bg-liwr-400 dark:bg-perl-600  rounded-lg flex items-center md:px-8  py-4 px-4 ">
          <div>
            <p className="text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InputAccountText };

