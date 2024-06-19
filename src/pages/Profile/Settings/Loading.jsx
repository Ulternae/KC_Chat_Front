const SettingsLoading = () => {
  return (
    <section className="animate-pulse transition-colors duration-300 w-full flex flex-col gap-16 h-full min-h-[620px] bg-liwr-400 dark:bg-perl-500/50 rounded-md px-4 py-8 sm:px-8 sm:max-w-full 2xl:max-w-[700px]">
      
      <header className="w-36 h-6 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl" />
      
      <section>
        <h2 className="w-24 h-6 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl" />
        <hr className="h-1 mb-10 mt-2 w-full rounded-lg bg-liwr-500 dark:bg-perl-300 border-none" />
        
        <div className="grid gap-2">
          {Array(2).fill(null).map((_, index) => (
            <div key={index} className="w-64 h-11 bg-liwr-200 dark:bg-perl-700 rounded-lg flex items-center justify-between gap-2 px-2 border-2 border-transparent">
              <span className="w-24 h-4 bg-liwr-500/50 dark:bg-perl-300 rounded-lg" />
              <span className="w-24 h-6 bg-liwr-900/40 dark:bg-perl-200/50 rounded-bl-lg rounded-tr-lg" />
            </div>
          ))}
        </div>
      </section>

      <section className="mt-2"> 
        <h2 className="w-24 h-6 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl" />
        <hr className="h-1 mb-10 mt-2 w-full rounded-lg bg-liwr-500 dark:bg-perl-300 border-none" />
        
        <div className="grid gap-2 sm:flex sm:gap-6">
          {["bg-liwr-700 dark:bg-perl-100/50", "bg-warn-500 dark:bg-warn-400/50"].map((bgClass, index) => (
            <button key={index} className={`h-9 transition-colors duration-300 flex items-center justify-center px-4 w-44 rounded-md py-2 ${bgClass}`}>
              <span className="w-4/5 h-4 bg-liwr-500/30 dark:bg-perl-300/30 rounded-lg" />
            </button>
          ))}
        </div>
      </section>
      
      <footer className="mt-auto">
        <button className="h-9 transition-colors duration-300 flex items-center justify-center px-4 w-32 rounded-md py-2 bg-liwr-200 dark:bg-perl-700">
          <span className="w-4/5 h-4 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl" />
        </button>
      </footer>
      
    </section>
  );
};

export { SettingsLoading };
