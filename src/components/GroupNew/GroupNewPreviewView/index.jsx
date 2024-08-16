import { useEffect, useState } from "react";
import { SeparatorX } from "../../Separator/SeparatorX";
import { SeparatorY } from "../../Separator/SeparatorY";
import { ChatsPreviewGroup } from "./ChatsPreviewGroup";
import { CreateGroupFields } from "./CreateGroupFields";
import { DescriptionPreviewGroup } from "./DescriptionPreviewGroup";
import { HeaderPreviewGroup } from "./HeaderPreviewGroup";
import { ParticipantsPreviewGroup } from "./ParticipantsPreviewGroup";
import { SettingsPreviewGroup } from "./SettingsPreviewGroup";
import { WarningCreateGroup } from "./WarningCreateGroup";
import { LoadingSpinner } from "@loading/LoadingSpinner";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { FIELDS_DB } from "../../../constants";

const PreviewCreateGroup = ({ content, participants, settings, chats }) => {
  const navigate = useNavigate();
  const { t } = useTranslation()
  const defaultErrorBack = {
    error: false,
    message: "",
    type: null,
    navigate: "",
    field: null
  };
  const defaultError = { error: false, message: "", continue: false };
  const [errorFields, setErrorFields] = useState(defaultError);
  const [errorBack, setErrorBack] = useState(defaultErrorBack);
  const [isLoading, setLoading] = useState(false);

  const headerInfo = {
    title: content.title,
    avatar_id: settings.avatar_id,
  };
  const settingsInfo = {
    color: settings.color,
    is_public: settings.is_public,
    category: content.category,
  };
  const descriptionInfo = {
    description: content.description,
  };
  const allFields = {
    content,
    participants,
    settings,
    chats,
  };

  const errorInfo = { setErrorFields, defaultError, errorFields };

  useEffect(() => {
    if (errorBack.navigate) {
      setTimeout(() => {
        navigate(errorBack.navigate);
      }, 6000);
    }
  }, [errorBack, navigate]);

  const messages = {
    [FIELDS_DB.GROUP] : t('groupsErrorBack.groups'),
    [FIELDS_DB.MEMBERS] : t('groupsErrorBack.members'),
    [FIELDS_DB.MODERATORS] : t('groupsErrorBack.moderators'),
    [FIELDS_DB.CHATS] : t('groupsErrorBack.chats'),
  }

  return (
    <div className="relative h-full scrollbar-liwr-400 flex flex-col w-full flex-1 md:min-w-[300px] bg-liwr-200 dark:bg-perl-800 dark:shadow-perl-inset shadow-liwr-inset rounded-lg px-0 py-10">
      <HeaderPreviewGroup className={"px-6 pb-6"} info={headerInfo} />
      <SeparatorX />
      <div className="flex flex-wrap">
        <ParticipantsPreviewGroup
          className={
            "pt-6 pl-6 pr-6 min-w-[200px] md:min-w-[300px] max-w-[380px] flex-1 pb-6"
          }
          info={participants}
        />
        <SeparatorY className={"ml-auto "} />
        <ChatsPreviewGroup
          className={
            "md:min-w-[300px] sm:min-w-[250px] sm:w-auto w-full pl-6 pt-6 pb-6 pr-6"
          }
          info={chats}
        />
      </div>
      <SeparatorX />
      <div className="flex flex-wrap ">
        <SettingsPreviewGroup
          className={"min-w-[180px] pr-6 pt-6 pb-6"}
          info={settingsInfo}
        />
        <SeparatorY className={"ml-auto "} />
        <DescriptionPreviewGroup
          className={"min-w-[180px] flex-1 pl-6 pt-6 pb-6"}
          info={descriptionInfo}
        />
      </div>
      <SeparatorX />
      <WarningCreateGroup errorInfo={errorInfo} />
      <CreateGroupFields
        info={allFields}
        errorInfo={errorInfo}
        setLoading={setLoading}
        setErrorBack={setErrorBack}
      />
      {(isLoading || errorBack.error) && (
        <div className="absolute w-full h-full bg-liwr-400/80 dark:bg-perl-600/80 top-0 right-0 bottom-0 left-0 rounded-lg ">
          {isLoading && <LoadingSpinner className="h-full" />}
          {!isLoading && errorBack.error && (
            <div className="h-full flex flex-col">
              <div className="px-4 pt-4">
                {errorBack.navigate && (
                  <div className=" w-full bg-liwr-100 rounded-full h-4 mb-4 dark:bg-perl-300">
                    <div
                      className={`${
                        errorBack.navigate ? "animate-progress" : ""
                      } bg-liwr-500 h-4 rounded-full dark:bg-perl-200 w-10`}
                    ></div>
                  </div>
                )}
              </div>
              <div className="px-4 rounded-lg flex h-full justify-center mb-4">
                <div className="max-w-[380px] bg-liwr-500 dark:bg-perl-400 mt-auto px-4 py-1 rounded-lg">
                  <span className="text-center text-liwr-100 dark:text-perl-100">
                    <p>{errorBack.message}</p> 
                    <p>{messages[errorBack.field]}</p> 
                  </span>
                </div>
              </div>
              <div className="w-full">
                <img className="w-full max-w-[420px]" src="salamander.png" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export { PreviewCreateGroup };
