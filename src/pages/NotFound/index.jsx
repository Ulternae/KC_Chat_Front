import { Dog } from "@assets/Dog";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="h-full w-full grid place-content-center bg-liwr-200 dark:bg-perl-800 px-6 py-6 min-h-screen relative">
      <div className="grid  grid-rows-[80px_1fr_80px] mt-8 gap-5 sm:grid-rows-2 sm:grid-cols-12 sm:max-w-[1024px] sm:max-h-[525px]">
        <span className="font-semibold dark:text-perl-100 text-liwr-900 text-4xl xl:text-5xl sm:col-start-1 sm:col-end-7 sm:self-center sm:text-end">
          <h1>{t("notFound.pageNotFound")}</h1>
        </span>
        <div className="md:w-[500px] m-auto w-full sm:h-full sm:col-start-7 sm:col-end-13 sm:row-start-1 sm:row-end-3">
          <Dog hidden={false} className="w-full" />
        </div>
      </div>
    </div>
  );
};

export { NotFound };
