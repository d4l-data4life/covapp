import i18next from '../../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../../global/utils/track';

import { Component, h, State, Listen, Prop } from '@stencil/core';
import { LOCAL_STORAGE_KEYS, ROUTES } from '../../../global/constants';
import settings from '../../../global/utils/settings';
import version from '../../../global/utils/version';
import { RouterHistory } from '@stencil/router';
import { Answers } from '../questionnaire/questionnaire';

@Component({
  styleUrl: 'answers-overview.css',
  tag: 'ia-answers-overview',
})
export class AnswersOverview {
  @Prop() history: RouterHistory;
  @State() language: string;
  @State() answers: Answers = {};

  componentWillLoad = () => {
    const availableAnswers = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS)
    );
    this.answers = availableAnswers ? availableAnswers : {};
    settings.completed = true;
  };

  @Listen('popstate', {
    target: 'window',
  })
  handlePopStateChange() {
    const answerKeys = Object.keys(this.answers);
    delete this.answers[answerKeys[answerKeys.length - 1]];
    localStorage.setItem(LOCAL_STORAGE_KEYS.ANSWERS, JSON.stringify(this.answers));
    settings.completed = false;
  }

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  resetFormAndStartAgain = () => {
    version.reset();
    this.history.push(ROUTES.QUESTIONNAIRE, {});
  };

  render() {
    return (
      <div class="c-card-wrapper answers-overview">
        <d4l-card classes="card--desktop">
          <div class="recommendations__content" slot="card-content">
            <ia-qr-code answers={this.answers} />
            <p>{i18next.t('summary_reset_paragraph')}</p>
            <d4l-button
              type="button"
              classes="button--block button--secondary"
              data-test="continueButton"
              text={i18next.t('summary_reset_button')}
              handleClick={() => {
                this.resetFormAndStartAgain();
                trackEvent(TRACKING_EVENTS.SUMMARY_DELETE);
              }}
            />
          </div>
        </d4l-card>
      </div>
    );
  }
}
