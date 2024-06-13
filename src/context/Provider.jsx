import { createContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  const [currentRoute, setCurrentRoute] = useState(
    window.location.href.split("/#/")[1]
  );

  return (
    <ChatContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
