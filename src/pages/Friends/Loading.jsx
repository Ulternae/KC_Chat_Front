const FriendsLoading = () => {
  return (
    <section className="animate-pulse rounded-lg grid max-w-[1111px] gap-5 md:gap-0 md:grid-cols-[1fr_350px]">
      <div className="md:pr-6 w-full h-full">
        <header className="px-6 py-8 flex flex-col gap-12 bg-gradient-to-b dark:from-perl-800 dark:to-perl-700/50 from-liwr-200 to-liwr-400 bg-liwr-400 dark:bg-perl-500 w-full h-full rounded-lg">
          <div className="max-w-[350px] bg-liwr-600 dark:bg-perl-300 w-full h-10 rounded-lg pl-4 pr-12 flex items-center">
            <div className="w-3/4 h-4 bg-liwr-100/40 dark:bg-perl-200/50 rounded-xl"></div>
          </div>
          <main className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-3">
            {Array(11)
              .fill(null)
              .map((_, index) => (
                <article
                  key={index}
                  className="px-4 w-full h-12 rounded-lg bg-liwr-300 dark:bg-perl-700 flex gap-2 items-center"
                >
                  <div className="w-7 h-7 bg-liwr-200/40 dark:bg-perl-300 rounded-full" />
                  <div className="w-2/3 h-3 bg-liwr-200/20 dark:bg-perl-300 rounded-lg" />
                </article>
              ))}
          </main>
        </header>
      </div>
      <aside className="rounded-lg transition-colors duration-300 w-full min-h-[580px] h-[630px] mt-auto">
        <div className="transition-colors bg-liwr-400 dark:bg-perl-500/50 duration-300 flex flex-col gap-10 h-full rounded-lg px-6 py-8">
          <div className="max-w-[350px] bg-liwr-600 dark:bg-perl-300 w-full h-10 rounded-lg pl-4 pr-12 flex items-center">
            <div className="w-3/4 h-4 bg-liwr-100/40 dark:bg-perl-200/50 rounded-xl"></div>
          </div>
          <div className="grid gap-3">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <article
                  key={index}
                  className="px-4 w-full h-12 rounded-lg bg-liwr-300 dark:bg-perl-700 flex gap-2 items-center"
                >
                  <div className="w-7 h-7 bg-liwr-200/40 dark:bg-perl-300 rounded-full" />
                  <div className="w-2/3 h-3 bg-liwr-200/20 dark:bg-perl-300 rounded-lg" />
                </article>
              ))}
          </div>
        </div>
      </aside>
    </section>
  );
};

export { FriendsLoading };
