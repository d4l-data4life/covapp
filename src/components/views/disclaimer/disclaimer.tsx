import { Component, h, State, Listen, Event, EventEmitter } from '@stencil/core';
import i18next from '../../../global/utils/i18n';
import { ROUTES } from '../../../global/constants';

@Component({
  tag: 'ia-disclaimer',
})
export class Disclaimer {
  @State() language: string;
  @Event() showLogoHeader: EventEmitter;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  componentWillLoad() {
    this.showLogoHeader.emit({ show: false });
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  render() {
    return (
      <div class="c-card-wrapper disclaimer">
        <d4l-card classes="card--desktop card--text-center">
          <div slot="card-header">
            <h2>{i18next.t('disclaimer_headline')}</h2>
          </div>
          <div
            class="disclaimer__content u-text-align--left u-padding-bottom--normal"
            slot="card-content"
          >
            <p innerHTML={i18next.t('disclaimer_paragraph_1')} />
          </div>
          <div class="disclaimer__footer" slot="card-footer">
            <stencil-route-link
              anchor-id="d4l-button-register"
              url={ROUTES.QUESTIONNAIRE}
            >
              <d4l-button
                classes="button--block"
                data-test="continueButton"
                text={i18next.t('button_continue')}
                is-route-link
              />
            </stencil-route-link>
          </div>
        </d4l-card>
      </div>
    );
  }
}
