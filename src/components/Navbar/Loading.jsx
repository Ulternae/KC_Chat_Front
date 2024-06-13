const NavbarLoading = () => {
  return (
    <>
      <div className="animate-pulse flex justify-between items-center">
        <div className="dark:bg-perl-500 bg-liwr-400 rounded-lg w-32 h-7"></div>
        <div className="gap-6 flex items-center">
          <div className="flex h-[18px] w-[18px] dark:bg-perl-500 bg-liwr-400 rounded"></div>
          <div className="flex h-[18px] w-[18px] dark:bg-perl-500 bg-liwr-400 rounded"></div>
          <div className="w-10 h-10 rounded-full dark:bg-perl-500 bg-liwr-400 p-[2px]"></div>
        </div>
      </div>
    </>
  );
};

export { NavbarLoading };
