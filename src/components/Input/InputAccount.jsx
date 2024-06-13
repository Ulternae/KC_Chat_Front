const InputAccountText = ({ title, text }) => {
  return (
    <div className="transition-colors duration-300 relative scrollbar-liwr-500 dark:scrollbar-perl-300 overflow-x-hidden min-h-16 ">
      <div className="absolute py-[2px] left-4 w-32 rounded-bl-lg rounded-tr-lg bg-liwr-500 dark:bg-perl-100 px-3">
        <p className="text-sm font-semibold text-liwr-100 dark:text-perl-800">
          {title}
        </p>
      </div>
      <div className="pt-3">
        <div className="overflow-x-scroll w-full overflow-hidden min-h-16 border-2 border-liwr-500/20 dark:border-perl-300/70 bg-liwr-400 dark:bg-perl-600 rounded-lg flex items-center md:px-8  py-4 px-4 ">
          <div>
            <p className="text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1">
              {text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputAccountLoading = () => {
  return (
    <div className="transition-colors scrollbar-liwr-500 dark:scrollbar-perl-300 overflow-hidden duration-300 relative min-h-16 ">
      <div className="absolute py-[2px] left-4 w-32 rounded-bl-lg rounded-tr-lg bg-liwr-900/40 dark:bg-perl-200/50 px-3 ">
        <div className="w-6/12 h-3 my-1  bg-liwr-100/70 dark:bg-perl-800/70 rounded-lg"></div>
      </div>
      <div className="pt-3">
        <div className="bg-liwr-300 dark:bg-perl-700 rounded-lg overflow-x-scroll w-full overflow-hiddenh-16 dark:border-perl-300/70 flex items-center md:px-8 py-4 px-4">
          <div className="w-6/12 h-4 mt-2 bg-liwr-500/50 dark:bg-perl-300 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
};

export { InputAccountText, InputAccountLoading };
