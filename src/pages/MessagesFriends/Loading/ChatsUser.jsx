const ChatsUserLoading = () => {
  return (
    <>
      <aside className="col-span-2 sm:col-span-1 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-span-1 bg-liwr-400 dark:bg-perl-600 w-full h-full px-4 py-8 rounded-t-lg flex flex-col gap-6">
        <div className="bg-liwr-500/50 dark:bg-perl-200/20 rounded-lg w-24 h-4" />
        <nav className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:flex sm:flex-col gap-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:flex xl:flex-col">
          {["1/2", "2/5", "2/3", "1/2"].map((width, index) => (
            <div
              key={index}
              className="flex items-center gap-2 h-10 px-4 bg-liwr-400 dark:bg-perl-500 rounded-lg shadow-liwr-inset"
            >
              <div className="w-5 h-5 bg-liwr-500/50 dark:bg-perl-200/20 rounded-full" />
              <div
                className={`w-${width} h-3 bg-liwr-500/50 dark:bg-perl-200/20 rounded-md`}
              />
            </div>
          ))}
        </nav>
      </aside>

      <header className="col-span-2 sm:col-span-1 sm:col-start-1 sm:col-end-2 lg:col-span-2 lg:row-span-1 xl:col-span-1 xl:row-span-1 xl:col-start-1 xl:col-end-2 bg-liwr-300 dark:bg-perl-500 w-full h-full px-4 py-8 rounded-b-lg flex flex-col gap-6">
        <div className="bg-liwr-500/50 dark:bg-perl-200/20 rounded-lg w-24 h-4" />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:flex sm:flex-col gap-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:flex xl:flex-col">
          {["1/2", "2/5", "2/3", "1/2", "2/5", "1/2"].map((width, index) => (
            <div
              key={index}
              className="flex items-center gap-2 h-10 px-4 bg-liwr-400 dark:bg-perl-500 rounded-lg shadow-liwr-inset"
            >
              <div className="w-5 h-5 bg-liwr-500/50 dark:bg-perl-200/20 rounded-full" />
              <div
                className={`w-${width} h-3 bg-liwr-500/50 dark:bg-perl-200/20 rounded-md`}
              />
            </div>
          ))}
        </div>
      </header>
    </>
  );
};

export { ChatsUserLoading };
