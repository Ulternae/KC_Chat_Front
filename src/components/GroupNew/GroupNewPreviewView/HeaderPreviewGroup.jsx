import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";

const HeaderPreviewGroup = ({ className, info }) => {
  const { t } = useTranslation();
  const { title, avatar_id } = info;
  const { avatars } = useOutletContext();
  const { avatarsUser, loadingAvatars, errorFetchAvatars } = avatars;

  const isConditionValid = (input, condition) => input !== condition;

  return (
    <div className={`${className} flex gap-x-4`}>
      <div className="w-16 h-16 rounded-full bg-liwr-400 dark:bg-perl-500 overflow-hidden">
        {!errorFetchAvatars.error && !loadingAvatars && (
          <img
            src={
              avatarsUser.find((avatar) => avatar.avatar_id === avatar_id).url
            }
            className="object-cover w-full h-full"
          />
        )}
      </div>
      <div className="self-center">
        <h1
          className={`text-lg font-semibold leading-none ${
            isConditionValid(title, "")
              ? "text-liwr-900 dark:text-perl-100"
              : "text-liwr-900/50 dark:text-perl-100/50"
          }`}
        >
          {title || t("groupChatPreview.setTitle")}
        </h1>
        
      </div>
    </div>
  );
};

export { HeaderPreviewGroup };
