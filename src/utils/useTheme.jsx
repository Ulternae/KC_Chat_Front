import { useState } from "react";

const useTheme = () => {
  const [isModeDark, setModeDark] = useState(useState(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }));

  const toggleMode = () => {
    document.documentElement.classList.toggle('dark')
    setModeDark(!isModeDark)
  }
  return [ isModeDark , toggleMode ]
};

export { useTheme };
