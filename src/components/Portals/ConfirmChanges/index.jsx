import { useTranslation } from "react-i18next";
import { ButtonFocus } from "../../Button/ButtonFocus";
import { LayoutBasePortal } from "../Layouts/LayoutBase";
import { LoadingSpinner } from "@loading/LoadingSpinner";
import { useNavigate } from "react-router";

const ConfirmChangesPortal = ({ loading, errorFields, setPortal }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const handleAccion = () => {
    if (errorFields.error) {
      navigate("/groups");
    } else {
      setPortal(false);
    }
  };
  return (
    <LayoutBasePortal
      className="z-30"
      setPortal={setPortal}
      secondaryClassname="w-full"
    >
      {loading && <LoadingSpinner className="h-[272px]" />}
      {!loading && (
        <div className="grid grid-cols-[1fr_2fr]">
          <div className="flex flex-col gap-4">
            <h1 className="leading-none text-center font-medium text-lg text-liwr-900 dark:text-perl-100">
              {errorFields.message || t("groupView.updateSuccess")}
            </h1>
            <ButtonFocus text={t("buttons.confirm")} onClick={handleAccion} />
          </div>
          <img className=" ml-auto max-w-[300px]" src="salamander.png" />
        </div>
      )}
    </LayoutBasePortal>
  );
};

export { ConfirmChangesPortal };
