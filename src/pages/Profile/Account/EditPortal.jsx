const EditAccountPortal = ({ setPortal, setEditAccount }) => {
  return (
    <div className="absolute inset-0 bg-liwr-200/50 dark:bg-perl-800/50 max-w-[1111px] bg-opacity-50 flex justify-center items-center">
      <div className="bg-liwr-100 shadow-liwr-focus dark:shadow-perl-focus rounded-lg dark:bg-perl-800 px-14 py-10 roundedw-11/12 max-w-[700px] grid gap-4">
        <h1 className="text-lg font-semibold text-liwr-900 dark:text-perl-100">
          Edit Account
        </h1>
        <p className="text-liwr-900 dark:text-perl-100 text-sm font-light">
          For editing the account it is necessary to enter password or verified
          account
        </p>

        <div className="transition-colors duration-300 mt-6 relative scrollbar-liwr-500 dark:scrollbar-perl-300 overflow-x-hidden min-h-16 ">
          <div className="absolute px-3 py-[2px] left-4 w-32 rounded-md bg-liwr-100 dark:bg-perl-800">
            <p className="text-liwr-900 dark:text-perl-100 text-sm font-medium">
              Password
            </p>
          </div>
          <div className="pt-3">
            <div className="overflow-x-scroll w-full overflow-hidden min-h-16 border-2 border-liwr-500/20 dark:border-perl-300/70 bg-liwr-400 dark:bg-perl-600 rounded-lg flex items-center md:px-8  py-4 px-4 ">
              <div>
                <p className="text-ellipsis text-sm text-liwr-900 dark:text-perl-100 mt-1 -mb-1">
                  ******************
                </p>
              </div>
            </div>
          </div>
        </div>
        <button onClick={() => setPortal(false)}>Close</button>
        <button onClick={() => setEditAccount(true)}>Confirm</button>
      </div>
    </div>
  );
};

export { EditAccountPortal };
