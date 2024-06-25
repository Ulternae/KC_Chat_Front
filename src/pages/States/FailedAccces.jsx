import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { Dog } from "../../assets/Dog";
import { ButtonFocus } from "@/components/Button/ButtonFocus";

const FailedAccess = ({ error }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const errorType401 = error.type === 401;

  return (
    <>
    <div className=" w-full grid md:justify-end place-content-center lg:pr-24">
      <div className="grid grid-rows-[80px_1fr_200px] mt-8 gap-5  sm:grid-rows-2 sm:grid-cols-12 sm:max-w-[1024px] sm:max-h-[525px]">
        <h1 className="font-semibold dark:text-perl-100 text-liwr-900 text-2xl sm:text-4xl xl:text-5xl sm:col-start-1 sm:col-end-7 sm:self-center sm:text-end">
          {error.message}
        </h1>
        <div className="m-auto w-full sm:h-full sm:col-start-7 sm:col-end-13 sm:row-start-1 sm:row-end-3">
          <Dog hidden={false} />
        </div>
        <span className="mt-10 text-end sm:col-start-2 sm:col-end-8 sm:row-start-2 sm:self-center dark:text-perl-100 text-liwr-900">
          <h3 className="text-xl sm:text-2xl xl:text-3xl mb-7">
            {t(`errorType.unauthorized.${error.type}`)}
          </h3>
          <ButtonFocus
            className="h-12 text-sm xl:text-lg"
            text={
              errorType401 ? `${t("register.title")}` : `${t("login.title")}`
            }
            onClick={() =>
              errorType401 ? navigate("/account") : navigate("/login")
            }
          />
        </span>
      </div>
    </div>
    </>
  );
};

export { FailedAccess };
