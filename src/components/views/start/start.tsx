import { Component, Event, EventEmitter, h, Listen, State } from '@stencil/core';
import { LOCAL_STORAGE_KEYS, ROUTES } from '../../../global/constants';
import { IS_CHARITE } from '../../../global/layouts';
import i18next from '../../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../../global/utils/track';
import version from '../../../global/utils/version';

const NEXT_ROUTE = {
  DEFAULT: {
    buttonKey: 'button_start_now',
    route: ROUTES.DISCLAIMER,
  },
  STARTED: {
    buttonKey: 'button_continue',
    route: ROUTES.QUESTIONNAIRE,
  },
  COMPLETED: {
    buttonKey: 'button_show_code',
    route: ROUTES.SUMMARY,
  },
};

@Component({
  styleUrl: 'start.css',
  tag: 'ia-start',
})
export class Start {
  @State() language: string;
  @State() started: boolean = false;
  @State() completed: boolean = false;
  @Event() showLogoHeader: EventEmitter;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  componentWillLoad = () => {
    this.showLogoHeader.emit({ show: true });
    if (!version.match()) {
      version.reset();
    }
    const completedFlag = localStorage.getItem(LOCAL_STORAGE_KEYS.COMPLETED);
    this.completed = completedFlag === 'true';
    this.started = completedFlag === 'false';
  };

  get getState() {
    return this.completed ? 'COMPLETED' : this.started ? 'STARTED' : 'DEFAULT';
  }

  deleteQRCode = () => {
    version.reset();
    this.completed = false;
    this.started = false;
  };

  render() {
    return (
      <div class="c-card-wrapper start">
        <d4l-card classes="card--desktop card--text-center">
          <div slot="card-header">
            <h1 class="start__headline-1">CovApp</h1>
            <h2 class="start__headline-2">{i18next.t('start_headline')}</h2>
          </div>
          <div class="start__content u-text-align--left" slot="card-content">
            <ul class="u-no-margin-top u-padding-bottom--normal">
              <li>{i18next.t('start_paragraph_1_option_1')}</li>
              <li>{i18next.t('start_paragraph_1_option_2')}</li>
              <li>{i18next.t('start_paragraph_1_option_3')}</li>
              <li>{i18next.t('start_paragraph_1_option_4')}</li>
            </ul>
            {this.completed && <h3>{i18next.t('found_code')}</h3>}
            <stencil-route-link
              anchor-id="d4l-button-register"
              anchor-class="start__next-link"
              url={NEXT_ROUTE[this.getState].route}
              onClick={() => {
                switch (this.getState) {
                  case 'COMPLETED':
                    trackEvent(TRACKING_EVENTS.SUMMARY_SHOW);
                    break;
                  case 'STARTED':
                    trackEvent(TRACKING_EVENTS.RESUME);
                    break;
                  default:
                    trackEvent(TRACKING_EVENTS.START);
                }
              }}
            >
              <d4l-button
                classes="button--block"
                data-test="continueButton"
                text={i18next.t(NEXT_ROUTE[this.getState].buttonKey)}
                is-route-link
              />
            </stencil-route-link>
            {this.completed && (
              <d4l-button
                classes="button--block button--tertiary"
                data-test="resetButton"
                text={i18next.t('button_delete_qr_code')}
                onClick={() => {
                  this.deleteQRCode();
                  trackEvent(TRACKING_EVENTS.SUMMARY_DELETE);
                }}
              />
            )}
            <div
              class="start__legal-note u-padding-vertical--normal u-text-align--center"
              innerHTML={i18next.t('start_legal_paragraph')}
            ></div>
            {!IS_CHARITE && (
              <div class="u-text-align--center">
                <ia-logo-d4l />
              </div>
            )}
          </div>
        </d4l-card>
        {IS_CHARITE && <ia-logo-component />}
        <div class="u-padding-vertical--normal">
          <h3 class="o-headline-3">{i18next.t('start_sub_headline_2')}</h3>
          <div innerHTML={i18next.t('start_paragraph_2')}></div>
          <h3 class="o-headline-3">{i18next.t('start_sub_headline_3')}</h3>
          <div innerHTML={i18next.t('start_paragraph_3')}></div>
          <h3 class="o-headline-3">{i18next.t('start_sub_headline_4')}</h3>
          <div innerHTML={i18next.t('start_paragraph_4')}></div>
          <h3 class="o-headline-3">{i18next.t('start__sub_headline_5')}</h3>
          <ia-call-to-action type="OPEN_SOURCE" />
          <ia-call-to-action type="WIDGET" />
        </div>
      </div>
    );
  }
}
