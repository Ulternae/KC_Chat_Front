const getSettings = () => {
  const languages = ["en", "es", "gl"];
  const themes = ["darkMode", "lightMode"];
  let getSettingsStorage = JSON.parse(localStorage.getItem("KC_CRT"));

  const setLocalStorage = () => {
    const languagesPreferUser = Array.from(
      new Set(navigator.languages.map((language) => language.split("-")[0]))
    );
    const languageSelected =
      languagesPreferUser.find((language) =>
        languages.includes(language)
      ) || "en";

    const themeSelected =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? themes[0]
        : themes[1];

    const settings = {
      language: languageSelected,
      theme: themeSelected,
    };

    localStorage.setItem("KC_CRT", JSON.stringify(settings));
    getSettingsStorage = settings;
  };

  if (!getSettingsStorage) {
    setLocalStorage();
  }

  let { language, theme } = getSettingsStorage;

  const validateData = () => {
    if (!languages.includes(language) || !themes.includes(theme)) {
      setLocalStorage();
      ({ language, theme } = getSettingsStorage);
    }

    if (theme === "darkMode") document.documentElement.classList.add("dark");
    if (theme === "lightMode") document.documentElement.classList.remove("dark");

  };

  validateData();

  return { languages , themes , languageUser: language , themeUser: theme }
};

export { getSettings }