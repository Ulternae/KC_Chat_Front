import { useTranslation } from "react-i18next";
import { IconClose } from "../../../assets/IconClose";
import { avatarNotFoundError } from "../../../utils/avatarNotFoundError";
import { SelectAvatarError } from "./Error";
import { SelectAvatarLoading } from "./Loading";

const SelectAvatarPortal = ({ setPortal, avatar, setAvatar, avatarImgs, errorAvatar, isLoadingAvatar }) => {
  const { t } = useTranslation();

  const changeAvatarSelected = ({ avatar_id, url }) => {
    setAvatar({ avatar_url: url, avatar_id: avatar_id });
  };

  const closePortal = () => setPortal(false);

  if (isLoadingAvatar ) return <SelectAvatarLoading setPortal={setPortal}/>
  if (errorAvatar.error) return <SelectAvatarError text={errorAvatar.message} setPortal={setPortal}/>
  
  return (
    <div
      onClick={closePortal}
      className="scrollbar-liwr-500 dark:scrollbar-perl-300 absolute inset-0 bg-liwr-200/50 dark:bg-perl-800/50 max-w-[1111px] bg-opacity-50 flex justify-center items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative pl-4 pr-2 py-8 sm:pl-14 sm:pr-8 sm:py-10 w-full h-auto max-h-[400px] h-sm:max-h-[500px] h-md:max-h-[680px] bg-liwr-100 shadow-liwr-focus dark:shadow-perl-focus rounded-lg dark:bg-perl-800 rounded-11/12 max-w-[639px] sm:max-w-[680px] flex flex-col gap-4"
      >
        <div className="px-1 grid grid-cols-[30px_1fr] gap-4 w-full">
          <div className="w-8 h-8 overflow-hidden">
            <img
              className="bg-liwr-900 dark:bg-perl-200 w-full h-full object-cover rounded-l-full rounded-br-full"
              src={avatar.avatar_url}
              onError={avatarNotFoundError}
            />
          </div>
          <div className="h-10">
            <h1 className="text-sm font-semibold text-liwr-900 dark:text-perl-100 leading-none">
              {t('avatar.title')}
            </h1>
            <h1 className="text-sm font-light text-liwr-900 dark:text-perl-100 leading-none">
            {t('avatar.selectNewAvatar')}
            </h1>
          </div>
          <IconClose
            onClick={closePortal}
          />
        </div>

          <div className="pl-1 pr-[6px] sm:pl-1 sm:pr-5 overflow-x-hidden flex flex-wrap gap-4 py-2 justify-between">
            {avatarImgs.map(({ avatar_id, url }) => (
              <div key={avatar_id}>
                <img
                  className={`transition-opacity duration-300 text-center content-center leading-none text-xs px-[6px] rounded-full w-24 h-24 hover:opacity-100 ${avatar_id === avatar.avatar_id ? 'opacity-100 bg-liwr-900 dark:bg-perl-200' : 'opacity-50 dark:bg-perl-400 bg-liwr-700'}`}
                  src={url}
                  alt={`Avatar ${avatar_id}`}
                  onClick={() => changeAvatarSelected({ avatar_id, url })}
                  onError={avatarNotFoundError}
                />
              </div>
            ))}
            
          </div>
      </div>
    </div>
  );
};

export { SelectAvatarPortal };
