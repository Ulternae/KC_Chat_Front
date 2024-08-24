const Loading = () => {
  const percentagesParticipants = [
    "120px",
    "150px",
    "70px",
    "160px",
    "170px",
    "115px",
    "110px",
  ];

  const percentagesChats = ["120px", "170px", "70px"];

  const percentagesSettings = [
    ["84px", "94px"],
    ["50px", "104px"],
    ["78px", "64px"],
  ];

  return (
    <>
      <div className="animate-pulse transition-colors duration-300 scrollbar-liwr-200 dark:scrollbar-perl-300 max-w-[1111px] px-0 sm:px-8 py-16 rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-3 relative">
        <div className="xl:col-span-2 pb-16 md:pb-0 lg:pb-16 xl:pb-0 md:pr-8 lg:pr-0 xl:pr-8 flex flex-col gap-8">
          <div className="grid gap-4 grid-cols-[48px_1fr] justify-center">
            <div className="w-12 h-12 rounded-full bg-liwr-400 dark:bg-perl-300/80" />
            <div className="flex justify-center flex-col gap-2">
              <div className="w-48 h-4 bg-liwr-600/40 dark:bg-perl-200/50 rounded-xl" />
              <div className="w-2/3 h-4 bg-liwr-600/40 dark:bg-perl-200/50 rounded-xl" />
            </div>
          </div>
          <div className="grid gap-6">
            <div className="w-48 h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
            <div className="grid gap-2">
              <div className="w-full h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
              <div className="w-full h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
              <div className="w-2/3 h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
            </div>
            <div className="grid gap-2">
              <div className="w-3/4 h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
              <div className="w-3/4 h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
              <div className="w-full h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
            </div>
            <div className="w-48 h-3 bg-liwr-600/20 dark:bg-perl-200/30 rounded-xl" />
          </div>
        </div>
        <div className="ml-auto flex flex-col gap-3 w-full max-w-[400px] mb-8">
          {percentagesParticipants.map((p) => (
            <div
              key={crypto.randomUUID()}
              className="flex w-full h-11 rounded-xl"
            >
              <div className="w-5 rounded-l-lg -mr-2 bg-liwr-600/50 dark:bg-perl-200/30 h-11" />
              <div className=" w-full rounded-lg bg-liwr-400 dark:bg-perl-400 h-11 flex items-center px-2 gap-3">
                <div className="w-8 h-8 rounded-lg bg-liwr-600/40 dark:bg-perl-200/30" />
                <div
                  style={{ maxWidth: p }}
                  className={`w-full h-3 bg-liwr-600/40 dark:bg-perl-200/30 rounded-xl`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-auto w-full xl:col-span-2 max-w-[400px] flex flex-col gap-3">
          {percentagesChats.map((p) => (
            <div
              key={crypto.randomUUID()}
              className="flex w-full h-11 rounded-xl"
            >
              <div className=" w-full rounded-lg bg-liwr-400 dark:bg-perl-400 h-11 flex items-center justify-between px-2 gap-3">
                <div
                  style={{ maxWidth: p }}
                  className={`w-full h-3 bg-liwr-600/40 dark:bg-perl-200/30 rounded-xl`}
                />
                <div className="w-8 h-4 rounded-lg bg-liwr-600/40 dark:bg-perl-200/30" />
              </div>
            </div>
          ))}
        </div>
        <div className="sm:pl-8 w-full pt-8 mt-auto gap-3 max-w-[388px] ml-auto flex flex-col">
          {percentagesSettings.map(([p1, p2]) => (
            <div
              key={crypto.randomUUID()}
              className="relative rounded-l-lg min-h-8 items-center bg-liwr-400 dark:bg-perl-500 grid grid-cols-[repeat(auto-fit,minmax(144px,1fr))]"
            >
              <div className="w-full min-w-36 bg-liwr-600/40 dark:bg-perl-400 h-8 rounded-l-lg border-r-2 border-liwr-300 dark:border-perl-300 rounded-r-sm px-4 flex items-center justify-between">
                <div
                  style={{ maxWidth: p1 }}
                  className="w-full  h-3 bg-liwr-100/20 dark:bg-perl-200/150 rounded-xl"
                />
              </div>
              <div className="min-w-36 w-full h-8 px-4 flex justify-between items-center">
                <div
                  style={{ maxWidth: p2 }}
                  className="w-full h-3 bg-liwr-100/20 dark:bg-perl-200/150 rounded-xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export { Loading };
