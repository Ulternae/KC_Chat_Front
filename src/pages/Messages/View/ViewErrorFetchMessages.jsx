import { useTranslation } from "react-i18next";
import { Bear } from "@assets/Bear";

const ViewErrorFetchMessages = ({ errorFetch }) => {
  const { t } = useTranslation();

  return (
    <main className="relative pt-10 sm:pt-0 lg:pt-10 xl:pt-0 grid grid-rows-[55px_1fr] col-span-2 sm:col-span-1 sm:col-start-2 lg:col-span-2  xl:col-span-1  xl:col-start-2 w-full h-full">
      <header className="bg-liwr-500 w- dark:bg-perl-600 rounded-t-lg "></header>
      <section className="py-6 bg-liwr-400 dark:bg-perl-500 rounded-b-lg flex flex-col justify-center sm:justify-between gap-32 sm:gap-12">
        <span className="pl-4 sm:pl-8  text-liwr-100 dark:text-perl-100">
          <h1 className="font-semibold text-2xl leading-none">
            {errorFetch.message}
          </h1>
          <h2 className="text-lg leading-none">
            {t("general.status")} : {errorFetch.type}
          </h2>
        </span>
        <div>
          <Bear className={"ml-auto max-w-[550px]"} />
        </div>
      </section>
    </main>
  );
};

export { ViewErrorFetchMessages };
