import { Outlet, useOutletContext } from "react-router";

const ProfileLoading = () => {
  const { loading, dataUser } = useOutletContext();

  return (
    <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row gap-8 ">
      <aside className="animate-pulse lg:grid lg:grid-cols-[repeat(2,minmax(280px,320px))] lg:place-content-center lg:grid-rows-[110px_50px] lg:gap-x-10 lg:gap-y-4 xl:flex m-auto lg:m-0 h-full w-full sm:max-w-full md:max-w-[300px] lg:max-w-full xl:max-w-[380px] bg-liwr-400 dark:bg-perl-500/50 rounded-lg md:px-8 py-8 px-4 flex flex-col">
        <header className=" mb-8 lg:flex lg:justify-center lg:flex-col lg:mb-0 xl:mb-8 lg:row-start-1 lg:row-end-3">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-liwr-500/50 dark:bg-perl-300 p-[2px] overflow-hidden"></div>
            <div className="w-1/3 h-6 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl"></div>
          </div>
        </header>

        <nav className="mb-8 flex-grow lg:col-start-1 lg:col-end-2 lg:row-start-1 ">
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-3 ">
            <li className="w-full h-12 bg-liwr-300 dark:bg-perl-700 rounded-lg flex items-center gap-2 px-4">
              <div className="w-6 h-6 bg-liwr-500/50 dark:bg-perl-300 rounded-full"></div>
              <div className="w-2/3 h-4 bg-liwr-500/50 dark:bg-perl-300 rounded-lg"></div>
            </li>
            <li className="w-full h-12 bg-liwr-300 dark:bg-perl-700 rounded-lg flex items-center gap-2 px-4">
              <div className="w-6 h-6 bg-liwr-500/50 dark:bg-perl-300 rounded-full"></div>
              <div className="w-5/12 h-4 bg-liwr-500/50 dark:bg-perl-300 rounded-lg"></div>
            </li>
          </ul>
        </nav>

        <div className="w-1/3 h-6 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl m-auto"></div>
      </aside>

      <main className="flex-1">
        <Outlet context={{ dataUser, loading }} />
      </main>
    </div>
  );
};

export { ProfileLoading };
