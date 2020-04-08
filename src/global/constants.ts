export const QUESTIONNAIRE_VERSION = '310';

export const KEY_CODES = {
  BACKSPACE: 8,
  RIGHT: 39,
  LEFT: 37,
};

export const TWO_WEEKS = 1000 * 60 * 60 * 24 * 14;
export const ONE_DAY = 1000 * 60 * 60 * 24;

export const ROUTES = {
  QUESTIONNAIRE: '/questionnaire',
  SUMMARY: '/summary',
  LEGAL: '/legal',
  IMPRINT: '/imprint',
  DISCLAIMER: '/disclaimer',
  FAQ: '/faq',
  DATA_PRIVACY: '/data-privacy',
};

export const LOCAL_STORAGE_KEYS = {
  ANSWERS: 'answers',
  SCORES: 'scores',
  VERSION: 'version',
  DATA_SENT: 'dataSent',
  COMPLETED: 'completed'
};

export const IS_DEV =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';
