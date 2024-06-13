import { useOutletContext } from "react-router";
import { Dog } from "../../assets/Dog";
import { DefaultLoading } from "./Loading";
import { useTranslation } from "react-i18next";

const Default = () => {
  const { loading, dataUser } = useOutletContext();

  const { t } = useTranslation();
  const { username } = dataUser;

  if (loading) return <DefaultLoading />;

  return (
    <div className="w-full grid md:justify-end place-content-center lg:pr-24">
      <div className="grid  grid-rows-[80px_1fr_80px] mt-8 gap-5 sm:grid-rows-2 sm:grid-cols-12 sm:max-w-[1024px] sm:max-h-[525px]">
        <span className="overflow-hidden font-semibold dark:text-perl-100 text-liwr-900 text-4xl xl:text-5xl sm:col-start-1 sm:col-end-7 sm:self-center sm:text-end">
          <h1>{t("general.welcome")}</h1>
          <h1 className="truncate">{username}</h1>
        </span>
        <div className="m-auto w-full sm:h-full sm:col-start-7 sm:col-end-13 sm:row-start-1 sm:row-end-3">
          <Dog />
        </div>
        <span className="mt-10 text-end sm:col-start-2 sm:col-end-8 sm:row-start-2 sm:self-center dark:text-perl-100 text-liwr-900">
          <h3 className="text-2xl xl:text-3xl">{t("general.chatRealTime")}</h3>
          <h1 className="font-semibold text-3xl xl:text-5xl">
            {t("general.kanbanConnect")}
          </h1>
        </span>
      </div>
    </div>
  );
};

export { Default };
