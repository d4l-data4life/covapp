import { Component, Event, EventEmitter, Listen, Method } from '@stencil/core';
import i18next from '../../global/utils/i18n';

import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';

@Component({
  tag: 'connect-translations',
})
export class ConnectTranslations {
  @Event() changedLanguage: EventEmitter;
  @Method() async changedLanguageHandler(language: Language) {
    this.changedLanguage.emit(language);
  }

  @Listen('changeLanguage', {
    target: 'window',
  })
  async changeLanguageHandler(event: CustomEvent) {
    const { detail: language } = event;

    if (i18next.language !== language.code) {
      await i18next.changeLanguage(language.code);
    }

    this.changedLanguageHandler(language);
  }
}
