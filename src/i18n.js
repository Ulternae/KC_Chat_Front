import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./translation/en.json";
import translationES from "./translation/es.json";
import translationGL from "./translation/gl.json";

const supportedLanguages = ["en", "es", "gl"];
const defaultLanguage = "en";

const getLanguage = () => {
  let storedSettings = JSON.parse(localStorage.getItem("KC_CRT"));
  let storedLanguage = storedSettings?.language;
  
  if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
    return storedLanguage;
  }
  
  const browserLanguages = navigator.languages.map(lang => lang.split("-")[0]);
  const preferredLanguage = browserLanguages.find(lang => supportedLanguages.includes(lang));

  return preferredLanguage || defaultLanguage;
}

const languageUser = getLanguage()


const resources = {
  en: {
    translation: translationEN,
  },
  es: {
    translation: translationES,
  },
  gl: {
    translation: translationGL,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: languageUser,
  fallbackLng: "en",

  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
