import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ptBr from './locales/pt-br.json';
import en from './locales/en.json';

const resources = {
  ptBr: {
    common: ptBr,
  },
  en: {
    common: en,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ptBr',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
