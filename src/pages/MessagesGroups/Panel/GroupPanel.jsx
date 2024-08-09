import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { IconSearch } from "@assets/IconSearch";
import { IconCloseBold } from "@assets/IconCloseBold";
import { AccordionPersonalized } from "@components/Accordion/AccordionPersonalized";
import { InputSearch } from "@components/Input/InputSearch";

const GroupPanel = ({ groupsRefined }) => {
  const { t } = useTranslation();
  const { group_id, chat_id } = useParams();
  const [section, setSection] = useState(group_id);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const toggleSection = (newSection) => {
    const isCurrentSection = section === newSection;
    const isCurrentNavigate = newSection === group_id
    
    const newNavigate = isCurrentNavigate
      ? `/messages/groups/${newSection}${chat_id ? `/${chat_id}` : ''}`
      : `/messages/groups/${newSection}`;
    setSection(isCurrentSection ? null : newSection);
    navigate(newNavigate);
  };

  const groupFilter = groupsRefined.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase())
  );

  const hasGroupFiltered = groupFilter.length > 0;

  return (
    <div>
      <div className="h-auto sm:h-full md:h-full lg:h-auto xl:h-full max-h-[525px] sm:max-h-[663px] lg:max-h-[380px] xl:max-h-full bg-liwr-400 dark:bg-perl-600 w-full px-4 py-8 rounded-lg flex flex-col gap-6">
        <div className="flex h-6 gap-2 justify-between items-center">
          {!showSearch && (
            <>
              <h1 className="text-sm font-medium text-liwr-900 dark:text-perl-200 leading-none">
                {t("groups.title")}
              </h1>
              <IconSearch
                className="stroke-liwr-700 dark:stroke-perl-200 w-4 h-4 cursor-pointer"
                onClick={() => setShowSearch(true)}
              />
            </>
          )}
          {showSearch && (
            <>
              <InputSearch
                className="w-full h-6 rounded-lg"
                search={search}
                setSearch={setSearch}
                text={t("groups.filterByName")}
                classNameInput="bg-liwr-500 text-liwr-100 dark:bg-perl-300 dark:text-perl-100 w-full h-6 rounded-lg pl-4 pr-12 text-sm"
                showSearch={false}
              />
              <div className="h-full w-3 rounded-lg grid place-content-center">
                <IconCloseBold
                  className="fill-liwr-500 dark:fill-perl-200 w-3 h-3 cursor-pointer"
                  onClick={() => {
                    setShowSearch(false);
                    setSearch("");
                  }}
                />
              </div>
            </>
          )}
        </div>
        <nav className="h-sm:max-h-[603px] h-md:max-h-[628px] overflow-x-hidden overflow-y-auto grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] sm:flex sm:flex-col gap-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(180px,1fr))] xl:flex xl:flex-col">
          {!hasGroupFiltered && (
            <p className="text-liwr-900 dark:text-perl-100 text-sm leading-none text-center">
              {t("messagesGroups.searchNameNotFound", { name: search })}
            </p>
          )}
          {hasGroupFiltered &&
            groupFilter.map((group) => {
              const isCurrentSection = section === group.group_id;
              const lengthChats = group?.chats_details.length;
              const hasChats = lengthChats > 0;
              return (
                <AccordionPersonalized
                  key={group.group_id}
                  openSection={() => toggleSection(group.group_id)}
                  section={section}
                  sectionElement={group.group_id}
                  className={`${
                    isCurrentSection
                      ? `bg-liwr-400 dark:bg-perl-500 shadow-liwr-inset rounded-lg row-span-${
                          !hasChats
                            ? "3"
                            : lengthChats > 11
                            ? "12"
                            : lengthChats <= 2
                            ? "3"
                            : lengthChats
                        }`
                      : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 h-10 px-2 cursor-pointer ${
                      isCurrentSection
                        ? ""
                        : "bg-liwr-400 dark:bg-perl-500 rounded-lg shadow-liwr-inset "
                    }`}
                    key={crypto.randomUUID()}
                  >
                    <img
                      className="min-w-6 min-h-6 max-w-6 max-h-6 rounded-full object-cover bg-liwr-200 dark:bg-perl-300"
                      src={group.avatar_url}
                    />
                    <h1 className="text-xs font-medium text-liwr-900 dark:text-perl-100 leading-none truncate">
                      {group.name}
                    </h1>
                  </div>
                  <div>
                    <div className="bg-liwr-500 dark:bg-perl-300 h-[2px] rounded-lg w-full" />
                    <div className="py-2">
                      {!hasChats && (
                        <div className="my-auto">
                          <p className="px-4 py-1 text-sm text-liwr-700 dark:text-perl-200 text-center">
                            {t("groupChat.noHaveChats")}
                          </p>
                        </div>
                      )}
                      {hasChats &&
                        group?.chats_details.map((chat) => {
                          const currentChatSelected = chat?.chat_id === chat_id;

                          return (
                            <div
                              className="hover:bg-liwr-500/40 hover:dark:bg-perl-300/50 cursor-pointer px-4"
                              key={crypto.randomUUID()}
                              onClick={() =>
                                navigate(
                                  `/messages/groups/${group.group_id}/${chat.chat_id}`
                                )
                              }
                            >
                              <p
                                className={`py-1 text-sm text-liwr-900 dark:text-perl-100 ${
                                  currentChatSelected ? "font-bold" : ""
                                }`}
                              >
                                {chat.name}
                              </p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </AccordionPersonalized>
              );
            })}
        </nav>
      </div>
    </div>
  );
};

export { GroupPanel };
