import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationEng from '../../statics/translations/en';
import translationTr from '../../statics/translations/tr';

i18n.use(LanguageDetector).init({
  debug: true,
  lng: 'tr',
  fallbackLng: 'tr',

  keySeparator: false,

  interpolation: {
    escapeValue: false,
  },

  resources: {
    en: {
      translations: translationEng,
    },
    tr: {
      translations: translationTr,
    },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

export default i18n;
