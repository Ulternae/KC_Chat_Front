import { createContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ settings, children }) => {

  const location = window.location.href.split("/#/")[1];
  const settingsData = settings ? { languages: settings.languages, settings: settings.themes } : {};
  const [currentRoute, setCurrentRoute] = useState(location || "");
  const [language, setLanguage] = useState(settings.languageUser || 'en');
  const [theme, setTheme] = useState(settings.themeUser || '');

  return (
    <ChatContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        settingsData,
        language,
        setLanguage,
        theme,
        setTheme,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
