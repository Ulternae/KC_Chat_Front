const ChatsUserLoading = () => {
  return (
    <>
      <aside className="max-h-[525px] sm:max-h-[663px] lg:max-h-[380px] xl:max-h-full bg-liwr-400 dark:bg-perl-600 w-full h-full px-4 py-8 rounded-lg flex flex-col gap-6">
        <div className="bg-liwr-500/50 dark:bg-perl-200/20 rounded-lg w-24 h-4" />
        <nav className="mt-2 grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:flex sm:flex-col gap-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:flex xl:flex-col">
          {["1/2", "2/5", "2/3", "1/2" ,"1/2" , "2/5" , "2/3" , "2/3"].map((width, index) => (
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
    </>
  );
};

export { ChatsUserLoading };
