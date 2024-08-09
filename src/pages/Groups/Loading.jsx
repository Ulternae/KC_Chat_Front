import { IconFlagGroupBottom } from "../../assets/IconFlagGroupBottom";
import { IconFlagGroupTop } from "../../assets/IconFlagGroupTop";

const GroupsLoading = () => {
  const percentages = [
    "120px",
    "150px",
    "70px",
    "160px",
    "170px",
    "115px",
    "110px",
    "140px",
    "145px",
  ];

  return (
    <div className="animate-pulse transition-colors duration-300 h-full flex flex-col gap-6 max-w-[1111px] scrollbar-liwr-400 dark:scrollbar-perl-300">
      <div className="h-full rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 px-2 sm:px-4 md:px-6 py-6 w-full">
        <div className="mb-2 w-[210px] h-4 bg-liwr-500/50 dark:bg-perl-300/70 rounded-xl " />
        <div className="grid gap-8 pt-8 pb-2">
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <div className="bg-liwr-500/50 dark:bg-perl-300/70 h-8 w-8 rounded-lg" />
            <div className="bg-liwr-500/50 dark:bg-perl-300/70 w-full h-8 max-w-96 rounded-lg" />
            <div className="bg-liwr-500/50 dark:bg-perl-300/70 w-full h-8 max-w-96 rounded-lg" />
          </div>
          <div className="max-h-[468px] overflow-x-hidden overflow-y-auto">
            <div className="w- grid gap-x-4 gap-y-2 grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
              {percentages.map((p, index) => (
                <div
                  key={index}
                  className="overflow-hidden border-2 border-liwr-400/50 dark:border-perl-300/50 max-w-lg relative min-h-20 bg-liwr-200 dark:bg-perl-400/70 rounded-lg grid grid-cols-[42px_1fr]"
                >
                  <div className="border-r-2 border-r-liwr-400/50 dark:border-r-perl-300/50" />
                  <div className="px-4  flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                      <div className="rounded-full w-7 h-7 bg-liwr-600/55 dark:bg-[#4b5161]" />
                      <div
                        style={{ maxWidth: p }}
                        className="w-[120px] h-3 bg-liwr-600/55 dark:bg-perl-200/45 rounded-xl "
                      />
                    </div>
                  </div>
                  <IconFlagGroupTop
                    className={
                      "fill-liwr-400 dark:fill-perl-300 absolute max-w-72 -top-[1px] -right-[1px]"
                    }
                  />
                  <IconFlagGroupBottom
                    className={
                      "fill-liwr-400 dark:fill-perl-300 absolute max-w-52 -bottom-[1px] -left-[1px]"
                    }
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[72px] rounded-lg bg-gradient-to-b from-liwr-200 dark:from-perl-800 to-liwr-400 dark:to-perl-500 px-2 sm:px-4 md:px-6 py-6 w-full flex items-center">
        <div className="w-[180px] h-4 bg-liwr-500/50 dark:bg-perl-300/70 rounded-xl " />
      </div>
    </div>
  );
};

export { GroupsLoading };
