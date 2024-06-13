import { createContext, useState } from "react";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {

  const location = window.location.href.split("/#/")[1]
  const [currentRoute, setCurrentRoute] = useState(
    location || ''
  );

  return (
    <ChatContext.Provider value={{ currentRoute, setCurrentRoute }}>
      {children}
    </ChatContext.Provider>
  );
};

export { ChatContext, ChatProvider };
