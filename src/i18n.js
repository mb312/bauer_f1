import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpBackend from 'i18next-http-backend';

// Import translation files (optional, if you load from a file)
import enTranslations from './locales/en.json';
import dTranslations from './locales/de.json';

i18n
  .use(LanguageDetector) // Detects the language from the browser
  .use(HttpBackend) // For loading translations from files
  .use(initReactI18next) // Integrates with React
  .init({
    fallbackLng: 'en', // Default language
    resources: {
      en: {
        translation: enTranslations,
      },
      de: {
        translation: dTranslations,
      },
    },
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;
