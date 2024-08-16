import { useOutletContext } from "react-router";
import { avatarNotFoundError } from "@utils/avatarNotFoundError";
import {
  PERMISSIONS as P,
  SECTION_HEADER_GROUP as SHG,
  MARKDOWN as M,
} from "@constants";
import { IconAdd } from "@assets/IconAdd";
import { IconEdit } from "@assets/IconEdit";
import { IconCloseBold } from "@assets/IconCloseBold";
import { MarkdownView } from "@components/Markdown/MarkdownView";
import { MarkdownPersonalized } from "@components/Markdown/MarkdownPersonalized";
import { ConditionalView } from "../../../components/Conditional/ConditionalView";

const CloseAccion = ({ close, className }) => (
  <IconCloseBold
    className={`cursor-pointer w-3 fill-liwr-500 dark:fill-perl-200 ${className}`}
    onClick={() => close(null)}
  />
);

const Header = ({
  permission,
  info,
  newInfo,
  setNewInfo,
  toogleEdit,
  currentEdit,
}) => {
  const { avatars } = useOutletContext();
  const { loadingAvatars, avatarsUser } = avatars;

  const avatarCurrent = avatarsUser.find(
    (a) => a.avatar_id === newInfo.avatar_id
  );
  const canEdit = permission === P.ADMIN || permission === P.MODERATOR;
  const newDescription = (info) =>
    setNewInfo((prev) => ({ ...prev, description: info }));
  const hasContentDescription = M.DEFAULT !== newInfo.description;

  return (
    <div className="relative grid gap-8">
      <header className=" grid gap-4 grid-cols-[48px_1fr]">
        <ConditionalView conditional={loadingAvatars || !avatarCurrent?.url}>
          <div className="w-12 h-12 rounded-full object-cover bg-liwr-400" />
          <div className="flex items-center">
            <div className="relative">
              <img
                className=" w-12 h-12 rounded-full object-cover bg-liwr-400"
                onClick={() => canEdit && toogleEdit(SHG.AVATAR)}
                src={avatarCurrent?.url}
              />
              {canEdit && (
                <IconAdd
                  className="cursor-pointer absolute bottom-0 right-0 stroke-liwr-100 dark:stroke-perl-200 "
                  onClick={() => toogleEdit(SHG.AVATAR)}
                />
              )}
            </div>
          </div>
        </ConditionalView>

        {currentEdit === SHG.AVATAR && (
          <div className="absolute top-0 left-0 max-w-[500px] z-10  w-full bg-liwr-400 dark:bg-perl-600 h-auto rounded-lg">
            <div className="px-4 py-6 relative grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-2">
              {avatarsUser.map((a) => (
                <div className="w-10 h-10" key={a.avatar_id}>
                  <img
                    className={`transition-opacity duration-300 hover:opacity-100 ${
                      newInfo.avatar_id === a.avatar_id
                        ? "shadow-liwr-focus dark:shadow-perl-100 opacity-100"
                        : "opacity-50 "
                    } rounded-tr-[4px] rounded-bl-[4px] rounded-tl-[20px] rounded-br-lg object-cover w-full h-full`}
                    src={a.url}
                    onError={avatarNotFoundError}
                    onClick={() =>
                      setNewInfo((prev) => ({
                        ...prev,
                        avatar_id: a.avatar_id,
                      }))
                    }
                  />
                </div>
              ))}
            </div>
            <CloseAccion
              className="absolute bottom-4 right-4"
              close={toogleEdit}
            />
          </div>
        )}

        <div>
          <ConditionalView conditional={currentEdit === SHG.NAME}>
            <div className="flex gap-1">
              <input
                type="text"
                placeholder={info.name}
                className="leading-tight p-0 bg-transparent font-semibold placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/40 text-liwr-700 dark:text-perl-100/70 text-lg w-full focus:outline-none border-none"
                value={newInfo.name}
                onChange={(e) =>
                  setNewInfo((prev) => ({ ...prev, name: e.target.value }))
                }
              />

              <CloseAccion className="mt-auto mb-1" close={toogleEdit} />
            </div>
            <div className="flex gap-3">
              <h1
                className="font-semibold text-lg text-liwr-900 dark:text-perl-100 leading-tight"
                onClick={() => canEdit && toogleEdit(SHG.NAME)}
              >
                {newInfo.name || info.name}
              </h1>
              {canEdit && (
                <IconEdit
                  className="w-6 h-4 cursor-pointer mt-auto mb-1 fill-liwr-500 dark:fill-perl-200 "
                  onClick={() => toogleEdit(SHG.NAME)}
                />
              )}
            </div>
          </ConditionalView>

          <ConditionalView conditional={currentEdit === SHG.CATEGORY}>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder={info.category}
                className="leading-tight p-0 bg-transparent placeholder:text-liwr-900/50 dark:placeholder:text-perl-100/40 text-liwr-700 dark:text-perl-100/70 text-lg w-full focus:outline-none border-none"
                value={newInfo.category}
                onChange={(e) =>
                  setNewInfo((prev) => ({ ...prev, category: e.target.value }))
                }
              />
              <CloseAccion className="mt-auto mb-1" close={toogleEdit} />
            </div>
            <div className="flex gap-3">
              <p
                className="text-lg text-liwr-900 dark:text-perl-100 leading-tight flex gap-1"
                onClick={() => canEdit && toogleEdit(SHG.CATEGORY)}
              >
                {newInfo.category || info.category}
              </p>
              {canEdit && (
                <IconEdit
                  className="w-6 h-4 cursor-pointer mt-auto mb-1 fill-liwr-500 dark:fill-perl-200"
                  onClick={() => toogleEdit(SHG.CATEGORY)}
                />
              )}
            </div>
          </ConditionalView>
        </div>
      </header>

      <div className="text-liwr-800 dark:text-perl-200">
        <ConditionalView conditional={currentEdit === SHG.DESCRIPTION}>
          <div className="relative">
            <MarkdownPersonalized
              info={newInfo.description}
              className="grid gap-4"
              toolbarClass="sm:px-4 flex max-w-[260px] bg-liwr-400 dark:bg-perl-400 ml-auto rounded-lg ml-auto"
              chatClass="focus:outline-none px-4 py-8 rounded-lg shadow-liwr-inset dark:shadow-perl-inset"
              setInfo={newDescription}
            />
            <CloseAccion
              className="absolute top-16 right-4"
              close={toogleEdit}
            />
          </div>
          <div>
            <MarkdownView
              data={
                hasContentDescription ? newInfo.description : info.description
              }
            />
            {canEdit && (
              <IconEdit
                className="cursor-pointer w-6 h-4 ml-auto mb-1 fill-liwr-500 dark:fill-perl-200"
                onClick={() => toogleEdit(SHG.DESCRIPTION)}
              />
            )}
          </div>
        </ConditionalView>
      </div>
    </div>
  );
};

export { Header };
