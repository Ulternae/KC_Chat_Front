import { LoadingSpinner } from "@loading/LoadingSpinner";
import { IconFlagChat } from "../../../assets/IconFlagChat";

const ChatLoading = () => {
  return (
    <main className="h-sm:max-h-[715px] h-md:max-h-[740px] min-h-[525px] max-h-[740px] relative grid grid-rows-[55px_1fr] w-full h-full">
      <header className="bg-liwr-500 w- dark:bg-perl-600 rounded-t-lg px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-liwr-600/80 dark:bg-perl-200/20 rounded-full w-7 h-7" />
          <div className="bg-liwr-600/80 dark:bg-perl-200/20 rounded-lg w-32 h-4" />
        </div>
        <div className="bg-liwr-600/80 dark:bg-perl-200/20 rounded-lg w-44 h-4"/>
      </header>
      <section className="px-4 sm:px-8 py-6 bg-liwr-400 dark:bg-perl-500 rounded-b-lg flex flex-col gap-4">
        <div className="z-10 min-w-[200px] max-w-[380px] w-2/3 lg:h-20 h-16 rounded-lg bg-liwr-300 dark:bg-perl-300 px-4 flex flex-col gap-2 justify-center">
          <div className="w-full h-4 lg:h-5 bg-liwr-200/40 dark:bg-perl-200/10 rounded-lg" />
          <div className="w-1/2 h-4 lg:h-5 bg-liwr-200/40 dark:bg-perl-200/10 rounded-lg" />
        </div>
        <div className="z-10 min-w-[120px] max-w-[180px] w-1/3 lg:h-12 h-8 rounded-lg bg-liwr-300 dark:bg-perl-300 px-4 flex flex-col gap-2 justify-center">
          <div className="w-2/3 h-4 lg:h-5 bg-liwr-200/40 dark:bg-perl-200/10 rounded-lg" />
        </div>
        <div className="z-10 min-w-[190px] max-w-[340px] w-1/2 lg:h-20 h-16 rounded-lg bg-liwr-600 dark:bg-perl-600 px-4 self-end flex flex-col gap-2 justify-center items-end">
          <div className="w-full h-4 lg:h-5 bg-liwr-500/80 dark:bg-perl-200/20 rounded-lg" />
          <div className="w-1/2 h-4 lg:h-5 bg-liwr-500/80 dark:bg-perl-200/20 rounded-lg" />
        </div>
        <div className="z-10 min-w-[160px] max-w-[250px] w-1/3 lg:h-14 h-10 rounded-lg bg-liwr-600 dark:bg-perl-600 px-4 self-end flex flex-col gap-2 justify-center items-end">
          <div className="w-4/5 h-4 lg:h-5 bg-liwr-500/80 dark:bg-perl-200/20 rounded-lg" />
        </div>
        <div className="z-10 min-w-[180px] max-w-[290px] w-2/5 lg:h-14 h-10 rounded-lg bg-liwr-600 dark:bg-perl-600 px-4 self-end flex flex-col gap-2 justify-center items-end">
          <div className="w-11/12 h-4 lg:h-5 bg-liwr-500/80 dark:bg-perl-200/20 rounded-lg" />
        </div>
        <div className="z-10 min-w-[190px] max-w-[340px] w-1/2 lg:h-20 h-16 rounded-lg bg-liwr-300 dark:bg-perl-300 flex flex-col gap-2 justify-center px-4">
          <div className="w-full h-4 lg:h-5 bg-liwr-200/40 dark:bg-perl-200/10 rounded-lg" />
          <div className="w-1/2 h-4 lg:h-5 bg-liwr-200/40 dark:bg-perl-200/10 rounded-lg" />
        </div>
        <div className="z-10 mt-auto w-full h-24 rounded-lg bg-liwr-300 dark:bg-perl-300 flex flex-col gap-2 justify-center px-4 py-4">
          <div className="w-44 h-4 lg:h-5 bg-liwr-200/40 dark:bg-perl-200/10 rounded-lg" />
          <div className="w-5 h-4 lg:h-5 bg-liwr-200/40 dark:bg-perl-200/10 rounded-full mt-auto self-end" />
        </div>
      </section>
      <IconFlagChat
        className={`w-[240px] h-[300px] sm:h-[460px] sm:w-[377px] absolute fill-liwr-200 dark:fill-perl-400 top-5 sm:top-1`}
      />
      <div className="absolute m-auto h-full w-full top-0 left-0 right-0 bottom-0 text-blue-50 grid place-content-center">
        <LoadingSpinner />
      </div>
    </main>
  );
};

export { ChatLoading };
