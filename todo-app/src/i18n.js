import { initReactI18next } from 'react-i18next';
import translationEN from './locales/en/translation.json';
import translationTR from './locales/tr/translation.json';
import i18next from 'i18next';


export const lang = localStorage.getItem("lang") !== null ? localStorage.getItem("lang") : "tr";

const resources = {
  en: {
    translation: translationEN
  },
  tr: {
    translation: translationTR
  }
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: lang, // Default language is Turkish
    fallbackLng: 'tr', // Fallback to Turkish if translation is missing
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18next;
