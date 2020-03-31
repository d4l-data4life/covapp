import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANGUAGES as SUPPORTED_LANGUAGES, LANGUAGE_RESOURCES } from '../custom';

import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';

import settings from './settings';

export const LANGUAGES: Language[] = SUPPORTED_LANGUAGES;

const languageDetector = new LanguageDetector();
languageDetector.addDetector({
  name: 'custom',
  lookup(options) {
    const { lookupQuerystring } = options;
    const queryMatch = document.location.href.match(
      new RegExp(`[?&]${lookupQuerystring}=([a-z]{2})`)
    );
    return (
      (queryMatch || []).pop() ||
      settings.language ||
      (navigator.language || '').split('-').shift()
    );
  },
  cacheUserLanguage(lng: string) {
    settings.language = lng;
  },
});

const detection = {
  order: ['custom'],
  caches: ['custom'],
};

export const initialLanguage: Promise<string> = new Promise(resolve => {
  i18n
    .use(languageDetector)
    .init({
      detection,
      fallbackLng: 'en',
      whitelist: LANGUAGES.map(({ code }) => code),
      resources: LANGUAGE_RESOURCES,
    })
    .then(() => resolve(i18n.language));
});

export default i18n;
