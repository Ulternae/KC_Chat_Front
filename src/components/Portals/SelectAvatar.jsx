import { useState, useEffect } from "react";
import { ButtonSecondary } from "../Button/ButtonSecondary";
import { useTranslation } from "react-i18next";
import { useOutletContext } from "react-router";
import { getAvatars } from "../../services/avatars/getAvatars";
import { getToken } from "../../token";

const SelectAvatarPortal = ({ setPortal, avatar, setAvatar }) => {
  const resetError = { error: false, message: "" };
  const token = getToken();
  const { t } = useTranslation();
  const { loading } = useOutletContext();
  const [error, setError] = useState(resetError);
  const [isLoading, setIsLoading] = useState(loading);
  const [imgs, setImgs] = useState([]);

  useEffect(() => {
    const getAvatar = async () => {
      const data = await getAvatars({ token, t });
      setImgs(data);
    };
    getAvatar();
  }, []);

  return (
    <div className="scrollbar-liwr-500 dark:scrollbar-perl-300 absolute inset-0 bg-liwr-200/50 dark:bg-perl-800/50 max-w-[1111px] bg-opacity-50 flex justify-center items-center">
      <div className="w-full h-full max-h-[400px] h-sm:max-h-[500px] h-md:max-h-[680px] bg-liwr-100 shadow-liwr-focus dark:shadow-perl-focus rounded-lg dark:bg-perl-800 px-4 py-8 sm:px-14 sm:py-10 roundedw-11/12 max-w-[639px] sm:max-w-[680px] grid gap-4">
        <div className="px-1 grid grid-cols-[30px_1fr] gap-4 w-full">
          <div className="w-8 h-8 overflow-hidden ">
            <img
              className="w-full h-full object-cover rounded-l-full rounded-br-full"
              src={avatar.avatar_url}
              alt=""
            />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-liwr-900 dark:text-perl-100 leading-none">
              Avatar
            </h1>
            <h1 className="text-sm font-light text-liwr-900 dark:text-perl-100 leading-none">
              Select new avatar that you want
            </h1>
          </div>
        </div>

        <div className=" overflow-x-hidden flex flex-wrap gap-4 py-2 px-1 justify-between">
          {imgs.map(({ avatar_id, url }) => (
            <div key={avatar_id}>
              <img
                className={`rounded-lg w-24 h-24 hover:opacity-100 ${avatar_id === avatar.avatar_id ? 'opacity-100 shadow-liwr-focus dark:shadow-perl-focus' : 'opacity-50'}`}
                src={url}
                alt=""
              />
            </div>
          ))}
          {imgs.map(({ avatar_id, url }) => (
            <div key={avatar_id}>
              <img
                className={`rounded-lg w-24 h-24 hover:opacity-100 ${avatar_id === avatar.avatar_id ? 'opacity-100 shadow-liwr-focus dark:shadow-perl-focus' : 'opacity-50'}`}
                src={url}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { SelectAvatarPortal };
