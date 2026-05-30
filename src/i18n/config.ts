import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import es from './locales/es.json';
import en from './locales/en.json';

const stored = localStorage.getItem('i18n-lng');
const browser = navigator.language.split('-')[0];
const detected = stored ?? (browser === 'es' ? 'es' : 'en');

i18n.use(initReactI18next).init({
  resources: { es: { translation: es }, en: { translation: en } },
  lng: detected,
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('i18n-lng', lng);
  document.documentElement.lang = lng;
});

document.documentElement.lang = detected;

export default i18n;
