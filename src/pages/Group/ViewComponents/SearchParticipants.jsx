import { useTranslation } from "react-i18next";
import { InputSearch } from "@components/Input/InputSearch";
import { IconAdd } from "@assets/IconAdd";
import { IconClose } from "@assets/IconClose";
import { ConditionalView } from "@components/Conditional/ConditionalView";
import { useState } from "react";

const SearchParticipants = ({
  className,
  closeView,
  participants,
  addParticipant,
  typeFilter,
  classNamePortal = '',
  identifier = null,
  messageAddAllParticipants
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState("");

  const participantsFiltered = participants.filter((p) =>
    p[typeFilter].toLowerCase().includes(search.toLowerCase())
  );

  const hasParticipants= participants.length > 0;
  const hasParticipantsFiltered = participantsFiltered.length > 0;

  return (
    <div className={className}>
      <div className="grid grid-cols-[1fr_40px] gap-2">
        <InputSearch
          search={search}
          setSearch={setSearch}
          text={t("groupView.findNewParticipants")}
        />
        <div className="w-10 h-full bg-liwr-600 dark:bg-perl-300 rounded-lg grid place-content-center">
          <IconClose
            className={"cursor-pointer w-4 fill-liwr-100 dark:fill-perl-100"}
            onClick={closeView}
          />
        </div>
      </div>
      <div>
        <ConditionalView conditional={!hasParticipants}>
          <h1 className="font-medium text-center text-liwr-800 dark:text-perl-200">
            {messageAddAllParticipants}
          </h1>

          <ConditionalView conditional={hasParticipantsFiltered}>
            <div className={classNamePortal}>
              {participantsFiltered.map((p) => {
                return (
                  <div
                    key={p.friend_id}
                    className=" transition-colors duration-300 h-11 bg-liwr-500 dark:bg-perl-400 rounded-lg px-4 py-2 flex items-center justify-between"
                  >
                    <div className="flex gap-2 items-center">
                      <img
                        className="w-8 h-8 rounded-full object-cover"
                        src={p.avatar_url}
                      />
                      <p className="text-clip overflow-hidden text-liwr-100 dark:text-perl-100 font-medium">
                        {p.nickname}
                      </p>
                    </div>
                    <IconAdd onClick={() => addParticipant(p, identifier)} />
                  </div>
                );
              })}
            </div>
            <div>
              <h1 className="font-medium text-center text-liwr-800 dark:text-perl-200">
                {t("groupView.notFoundNewParticipants", {
                  nickname: search,
                })}
              </h1>
            </div>
          </ConditionalView>
        </ConditionalView>
      </div>
    </div>
  );
};

export { SearchParticipants };
