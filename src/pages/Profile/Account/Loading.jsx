import { InputAccountLoading } from "../../../components/Input/InputAccount";

const AccountLoading = () => {

  return (
    <div className="transition-colors duration-300 w-full flex flex-col gap-6 h-full min-h-[700px] bg-liwr-400 dark:bg-perl-500/50 rounded-md px-4 py-8 sm:px-8 sm:max-w-full 2xl:max-w-[700px]">
      <div className="flex items-center justify-between">
        <div className="w-24 h-6 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl"></div>
        <div className="w-32 h-10 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl"></div>
      </div>
      <div>
        <div className="flex items-end gap-3">
          <div className="w-16 h-16 rounded-full bg-liwr-500 dark:bg-perl-300 p-[2px] overflow-hidden">
          </div>
          <div className="w-16 h-4 mb-2 bg-liwr-900/40 dark:bg-perl-200/50 rounded-xl"></div>

        </div>
        <div className="mt-6 mb-10 h-1 w-full rounded-lg bg-liwr-500 dark:bg-perl-300"></div>
        <div className="grid gap-5 ">
          <InputAccountLoading />
          <InputAccountLoading />
          <InputAccountLoading />
        </div>
      </div>
    </div>
  );
};

export { AccountLoading };
