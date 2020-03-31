export const ACCEPTS_COOKIES = 'accepts_cookies';
export const ACCEPTS_TRACKING = 'accepts_tracking';
export const USER_LANGUAGE = 'user_language';

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
    this.setLocalStorageValue(ACCEPTS_COOKIES, isTrue ? 'true' : 'false', false);
  }

  get acceptsTracking() {
    return this.getLocalStorageValue(ACCEPTS_TRACKING) === 'true';
  }
  set acceptsTracking(isTrue: boolean) {
    this.setLocalStorageValue(ACCEPTS_TRACKING, isTrue ? 'true' : 'false', false);
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

  getLocalStorageValue(key: string) {
    if (key in this) {
      return this[key];
    }
    if (!window.localStorage) {
      return null;
    }

    const value = localStorage.getItem(key);
    if (value !== null) {
      this[key] = value;
    }

    return value;
  }

  setLocalStorageValue(key: string, value: string, needsConsent = true) {
    if (needsConsent && !this.acceptsCookies) {
      this._pending = { ...this._pending, [key]: value };
      return;
    }

    this[key] = value;
    if (window.localStorage) {
      localStorage.setItem(key, value);
    }

    this._changeHandlers.forEach(handler => handler(key, value));
    return value;
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
