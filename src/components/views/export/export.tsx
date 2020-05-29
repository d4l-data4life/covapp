import {
  Component,
  h,
  State,
  Listen,
  Event,
  EventEmitter,
  Prop,
} from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import i18next from '../../../global/utils/i18n';
import { LOCAL_STORAGE_KEYS } from '../../../global/constants';
import { IS_CHARITE } from '../../../global/layouts';
import { FHIRQuestionnaire, buildQuestionnaireResponse } from '../../../global/fhir';
import COVAPP_QUESTIONNAIRE_EN from '../../../global/fhir/fhir-schemas/cov-app-en-packed-r4.questionnaire.json';
import COVAPP_QUESTIONNAIRE_DE from '../../../global/fhir/fhir-schemas/cov-app-de-packed-r4.questionnaire.json';

import { WHITELISTED_DATA4LIFE_ORIGINS } from '../../../global/custom';

enum EXPORT_MODE {
  IFRAME,
  OAUTH,
}

@Component({
  styleUrl: 'export.css',
  tag: 'ia-export',
})
export class Export {
  protected timeout?: any;
  protected encryptionKey?: string;

  @Prop() history: RouterHistory;

  @State() language: string;
  @State() hasFinishedQuestionnaire: boolean;
  @State() submitted: boolean = false;
  @State() imported: boolean = false;
  @State() mode: EXPORT_MODE = EXPORT_MODE.IFRAME;
  @State() origin?: string;

  @Event() isEmbedded: EventEmitter;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  @Listen('message', { target: 'window' })
  messageHandler({ data = {}, origin }: MessageEvent) {
    const { type, event } = data;
    if (type !== 'covapp_import') {
      return;
    }

    if (!WHITELISTED_DATA4LIFE_ORIGINS.includes(origin)) {
      throw new Error(
        `Origin ${origin} is not in the list of allowed import hosts.`
      );
    }

    this.origin = origin;

    if (event === 'imported') {
      this.imported = true;
    }
  }

  postMessage(event, payload = null) {
    if (this.mode !== EXPORT_MODE.IFRAME) {
      return;
    }

    window.parent &&
      window.parent.postMessage(
        {
          type: 'covapp_export',
          event,
          payload,
        },
        this.origin || '*'
      );
  }

  componentWillLoad() {
    const { origin } = this.history.location.query;
    const isIframeContext = window.parent && window.parent !== window;
    const isOauthContext = origin && WHITELISTED_DATA4LIFE_ORIGINS.includes(origin);

    if (!IS_CHARITE || (!isIframeContext && !isOauthContext)) {
      this.history.replace('/');
      return;
    }

    if (isOauthContext) {
      this.mode = EXPORT_MODE.OAUTH;
      this.origin = origin;
    }

    this.hasFinishedQuestionnaire =
      localStorage.getItem(LOCAL_STORAGE_KEYS.COMPLETED) === 'true';
    this.isEmbedded.emit(true);

    this.postMessage(this.hasFinishedQuestionnaire ? 'ready' : 'redirect');
  }

  componentDidLoad() {
    this.timeout = setInterval(() => {
      const hasFinishedQuestionnaire =
        localStorage.getItem(LOCAL_STORAGE_KEYS.COMPLETED) === 'true';
      if (this.hasFinishedQuestionnaire !== hasFinishedQuestionnaire) {
        this.hasFinishedQuestionnaire = hasFinishedQuestionnaire;
      }
    }, 2000);
  }

  componentDidUnload() {
    clearInterval(this.timeout);
  }

  exportData = (event: Event) => {
    event.preventDefault();

    if (!this.origin) {
      return;
    }

    if (this.submitted) {
      this.postMessage('proceed');
      return;
    }

    const answers = JSON.parse(localStorage.getItem('answers'));
    const fhir = buildQuestionnaireResponse(
      answers,
      ((this.currentLanguage === 'de'
        ? COVAPP_QUESTIONNAIRE_DE
        : COVAPP_QUESTIONNAIRE_EN) as unknown) as FHIRQuestionnaire
    );

    this.submitted = true;
    localStorage.setItem(LOCAL_STORAGE_KEYS.EXPORTED, 'true');

    if (this.mode === EXPORT_MODE.IFRAME) {
      this.postMessage('export', { fhir });
    }

    if (this.mode === EXPORT_MODE.OAUTH) {
      document.location.href = `${this.origin}${
        this.origin.includes('localhost') ? '' : '/corona'
      }/import#fhir=${encodeURIComponent(window.btoa(JSON.stringify(fhir)))}`;
    }
  };

  get button() {
    if (!this.hasFinishedQuestionnaire) {
      return (
        <a href={`/?source=${encodeURI(this.origin)}`} target="_parent">
          <d4l-button
            classes="button--block"
            data-test="openQuestionnaireButton"
            text={i18next.t('export_go-start_button')}
            is-route-link
          />
        </a>
      );
    }

    const isLoading = this.submitted && !this.imported;

    return (
      <d4l-button
        classes="button--block"
        data-test="exportDataButton"
        is-loading={isLoading}
        text={
          isLoading
            ? '\u00a0'
            : i18next.t(
                this.imported ? 'export_continue_button' : 'export_execute_button'
              )
        }
      />
    );
  }

  render() {
    const { hasFinishedQuestionnaire, submitted, exportData, origin, button } = this;
    return (
      origin && (
        <div class="c-card-wrapper export">
          <form
            onSubmit={(event: Event) => exportData(event)}
            data-test="dataTransferForm"
          >
            <d4l-card classes="card--desktop card--text-center card--no-padding">
              <div class="export__header" slot="card-header">
                <ia-logo-d4l />
              </div>
              <div class="export__content" slot="card-content">
                <ia-covapp-to-data4life success={submitted} />
                <div class="export__content__text">
                  <h3>{i18next.t('export_headline_text')}</h3>
                  <p
                    innerHTML={i18next.t(
                      hasFinishedQuestionnaire
                        ? submitted
                          ? 'export_description_submitted_text'
                          : 'export_description_text'
                        : 'export_description_not-finished_text'
                    )}
                  />
                </div>
                {!submitted && hasFinishedQuestionnaire && (
                  <div class="export__checkbox">
                    <d4l-checkbox
                      checkbox-id="with-content-slot"
                      name="content-slot"
                      required={true}
                    >
                      <div slot="checkbox-label">
                        <h3 class="export__label u-text-align--left">
                          {i18next.t('export_checkbox_headline_label')}
                        </h3>
                        <p
                          class="u-text-align--left"
                          innerHTML={i18next.t('export_checkbox_description_label')}
                        ></p>
                      </div>
                    </d4l-checkbox>
                  </div>
                )}
              </div>
              <div class="export__footer" slot="card-footer">
                {button}
              </div>
            </d4l-card>
          </form>
        </div>
      )
    );
  }
}
