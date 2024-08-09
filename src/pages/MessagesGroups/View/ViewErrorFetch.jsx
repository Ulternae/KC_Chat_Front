import { useTranslation } from "react-i18next";
const ViewErrorFetch = ({ message, secondaryMessage, status }) => {
  const { t } = useTranslation();
  return (
    <main className="max-w-[1111px] grid grid-rows-[55px_1fr] w-full h-full">
      <header className="bg-liwr-500 w- dark:bg-perl-600 rounded-t-lg "></header>
      <section className="py-6 bg-liwr-400 dark:bg-perl-500 rounded-b-lg flex flex-col justify-center sm:justify-between gap-32 sm:gap-12">
        <span className="pl-4 sm:pl-8  text-liwr-100 dark:text-perl-100">
          <h1 className="font-semibold text-2xl leading-none">{message}</h1>
          <span className="flex gap-4">
            <h2 className="text-lg leading-none">{secondaryMessage}</h2>
            <h2 className="text-lg leading-none">
              {t("general.status")} : {status}
            </h2>
          </span>
        </span>
        <div>
          <img className="w-full ml-auto max-w-[550px]" src="crocodile.png" />
        </div>
      </section>
    </main>
  );
};

export { ViewErrorFetch };
