import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationEN from "./translation/en.json";
import translationES from "./translation/es.json";
import translationGL from './translation/gl.json';

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

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Idioma predeterminado
    fallbackLng: 'en', // Idioma de reserva

    interpolation: {
      escapeValue: false, // React ya maneja el escape
    },
  });

export default i18n;