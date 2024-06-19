import { useContext } from "react";
import { ChatContext } from "../context/Provider";

const useTheme = () => {
  const { theme, setTheme } = useContext(ChatContext)

  const toggleMode = () => {
    if (theme === "darkMode") {
      setTheme('lightMode')
    } 
    if (theme === "lightMode") {
      setTheme('darkMode')
    } 

  }
  return [ theme , toggleMode ]
};

export { useTheme };
