import { IS_CHARITE, IS_D4L } from '../layouts';

export const ACCEPTS_COOKIES = 'accepts_cookies';
export const ACCEPTS_TRACKING = 'accepts_tracking';
export const USER_LANGUAGE = 'user_language';
export const SHOW_D4L_BANNER = 'show_d4l_banner';
export const SOURCE = 'source';
export const COMPLETED = 'completed';

type IASettings = {
  [key: string]: string;
};

type IAChangeHandlers = Function[];

class Settings {
  protected _pending: IASettings = {};
  protected _changeHandlers: IAChangeHandlers = [];

  get acceptsCookies() {
    return this.getLocalStorageValue(ACCEPTS_COOKIES) === 'true';
  }
  set acceptsCookies(isTrue: boolean) {
    this.setLocalStorageValue(ACCEPTS_COOKIES, `${isTrue}`, false);
  }

  get acceptsTracking() {
    return this.getLocalStorageValue(ACCEPTS_TRACKING) === 'true';
  }
  set acceptsTracking(isTrue: boolean) {
    this.setLocalStorageValue(ACCEPTS_TRACKING, `${isTrue}`, false);
  }

  get hasMadeCookieChoice() {
    return (
      this.getLocalStorageValue(ACCEPTS_COOKIES) !== null ||
      this.getLocalStorageValue(ACCEPTS_TRACKING) !== null
    );
  }

  get language() {
    return this.getLocalStorageValue(USER_LANGUAGE);
  }
  set language(language: string) {
    this.setLocalStorageValue(USER_LANGUAGE, language);
  }

  get showD4lBanner() {
    return (
      (IS_CHARITE || IS_D4L) &&
      this.getLocalStorageValue(SHOW_D4L_BANNER) !== 'false'
    );
  }
  set showD4lBanner(isTrue: boolean) {
    (IS_CHARITE || IS_D4L) &&
      this.setLocalStorageValue(SHOW_D4L_BANNER, `${isTrue}`, false);
  }

  get source() {
    return this.getLocalStorageValue(SOURCE);
  }
  set source(source: string) {
    this.setLocalStorageValue(SOURCE, source, false);
  }

  get completed() {
    return this.getLocalStorageValue(COMPLETED) === 'true';
  }
  set completed(isTrue: boolean) {
    this.setLocalStorageValue(COMPLETED, `${isTrue}`, false);
  }

  get started() {
    return this.getLocalStorageValue(COMPLETED) === 'false';
  }

  getLocalStorageValue(key: string) {
    if (`_${key}` in this) {
      return this[`_${key}`];
    }
    if (!('localStorage' in window)) {
      return null;
    }

    const value = localStorage.getItem(key);
    if (value !== null) {
      this[`_${key}`] = value;
    }

    return value;
  }

  setLocalStorageValue(key: string, value: string, needsConsent = true) {
    if (needsConsent && !this.acceptsCookies) {
      this._pending = { ...this._pending, [key]: value };
      return;
    }

    this[`_${key}`] = value;
    if ('localStorage' in window) {
      localStorage.setItem(key, value);
    }

    this._changeHandlers.forEach(handler => handler(key, value));
    return value;
  }

  remove(key: string) {
    delete this[`_${key}`];
    if ('localStorage' in window) {
      localStorage.removeItem(key);
    }

    this._changeHandlers.forEach(handler => handler(key, undefined));
    return undefined;
  }

  onChange(handler: Function) {
    this._changeHandlers = (this._changeHandlers || []).concat([handler]);
  }

  applyPending() {
    if (!this.acceptsCookies || !this._pending) {
      return;
    }

    Object.keys(this._pending).forEach(key => {
      this.setLocalStorageValue(key, this._pending[key], false);
    });
    this._pending = {};
  }
}

const settings = new Settings();
settings.onChange(key => {
  key === ACCEPTS_COOKIES && settings.applyPending();
});

export default settings;
