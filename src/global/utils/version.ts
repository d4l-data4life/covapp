import { LOCAL_STORAGE_KEYS, QUESTIONNAIRE_VERSION } from '../constants';

const match = (): boolean => {
  const setVersion = localStorage.getItem(LOCAL_STORAGE_KEYS.VERSION);
  return setVersion === QUESTIONNAIRE_VERSION;
};

const set = () => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.VERSION, QUESTIONNAIRE_VERSION);
};

const reset = () => {
  for (const key in LOCAL_STORAGE_KEYS) {
    if (LOCAL_STORAGE_KEYS[key] === LOCAL_STORAGE_KEYS.SOURCE) {
      continue;
    }

    localStorage.removeItem(LOCAL_STORAGE_KEYS[key]);
  }
};

const version = {
  match,
  set,
  reset,
};

export default version;
