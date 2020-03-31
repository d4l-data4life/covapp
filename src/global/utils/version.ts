import { LOCAL_STORAGE_KEYS, QUESTIONNAIRE_VERSION } from '../constants';

const match = (): boolean => {
  const setVersion = localStorage.getItem(LOCAL_STORAGE_KEYS.VERSION);
  return setVersion === QUESTIONNAIRE_VERSION;
};

const set = () => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.VERSION, QUESTIONNAIRE_VERSION);
};

const reset = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEYS.ANSWERS);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.SCORES);
  localStorage.removeItem(LOCAL_STORAGE_KEYS.VERSION);
};

const version = {
  match,
  set,
  reset,
};

export default version;
