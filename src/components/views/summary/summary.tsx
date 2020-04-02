import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { LOCAL_STORAGE_KEYS, ROUTES, TWO_WEEKS } from '../../../global/constants';
import { CATEGORIES, QUESTION, QUESTIONS } from '../../../global/questions';
import { getToday } from '../../../global/utils/date';
import i18next from '../../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../../global/utils/track';
import version from '../../../global/utils/version';
import { RiskSpreading } from './snippets/risk-spreading';
import { RiskVeryIll } from './snippets/risk-very-ill';

@Component({
  styleUrl: 'summary.css',
  tag: 'ia-summary',
})
export class Summary {
  @Prop() history: RouterHistory;

  @State() language: string;
  @State() answers: any = {};
  @State() scores: any = {};
  @State() resultCase: number = 5;
  @State() snippetsAnswers = {
    outOfBreath: false,
    ageAboveSixtyFive: false,
    livingSituation: 0,
    workspace: 0,
    caringForRelatives: false,
  };
  @Event() showLogoHeader: EventEmitter;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  @Listen('popstate', {
    target: 'window',
  })
  handlePopStateChange() {
    delete this.answers[QUESTIONS[QUESTIONS.length - 1].id];
    localStorage.setItem(LOCAL_STORAGE_KEYS.ANSWERS, JSON.stringify(this.answers));
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  resetFormAndStartAgain = () => {
    version.reset();
    this.history.push(ROUTES.QUESTIONNAIRE, {});
  };

  setResultCase = () => {
    const scores = this.scores;
    const hasSymptoms =
      scores[CATEGORIES.SYMPTOMS] > 0 || scores[CATEGORIES.RESPIRATORY_SYMPTOMS] > 0;
    const hasBothSymptoms =
      scores[CATEGORIES.SYMPTOMS] > 0 && scores[CATEGORIES.RESPIRATORY_SYMPTOMS] > 0;

    if (scores[CATEGORIES.CONTACT] > 0) {
      if (hasSymptoms) {
        if (this.symptomsWithinTwoWeeksOfContact) {
          this.resultCase = 1;
        } else if (hasBothSymptoms) {
          this.resultCase = 2;
        } else {
          this.resultCase = 4;
        }
      } else {
        if (this.contactWithinTwoWeeks) {
          this.resultCase = 3;
        } else {
          this.resultCase = 5;
        }
      }
    } else {
      if (hasSymptoms) {
        if (hasBothSymptoms) {
          this.resultCase = 2;
        } else {
          this.resultCase = 4;
        }
      } else {
        this.resultCase = 5;
      }
    }
  };

  get symptomsWithinTwoWeeksOfContact() {
    const contactAnswer = this.answers[QUESTION.CONTACT_DATE];
    const symptomAnswer = this.answers[QUESTION.SYMPTOM_DATE];
    if (contactAnswer && symptomAnswer) {
      let contact = new Date(contactAnswer.split('.').join('-')).getTime();
      let symptoms = new Date(symptomAnswer.split('.').join('-')).getTime();
      return symptoms - contact <= TWO_WEEKS;
    }

    return false;
  }

  get contactWithinTwoWeeks() {
    const contactAnswer = this.answers[QUESTION.CONTACT_DATE];
    if (contactAnswer) {
      const contact = new Date(contactAnswer.split('.').join('-')).getTime();
      const today = getToday();
      return today >= contact ? today - contact <= TWO_WEEKS : false;
    }

    return false;
  }

  setSnippetState = () => {
    if (this.answers) {
      this.snippetsAnswers.outOfBreath =
        parseInt(this.answers[QUESTION.OUT_OF_BREATH], 10) === 0;
      this.snippetsAnswers.ageAboveSixtyFive =
        parseInt(this.answers[QUESTION.AGE], 10) > 3 ||
        parseInt(this.answers[QUESTION.ABOVE_65], 10) === 0;
      this.snippetsAnswers.livingSituation = parseInt(
        this.answers[QUESTION.LIVING_SITUATION],
        10
      );
      this.snippetsAnswers.workspace = parseInt(
        this.answers[QUESTION.WORKSPACE],
        10
      );
      this.snippetsAnswers.caringForRelatives =
        parseInt(this.answers[QUESTION.CARING], 10) === 0;
    }
  };

  componentWillLoad = () => {
    this.showLogoHeader.emit({ show: false });
    if (!version.match()) {
      this.resetFormAndStartAgain();
      return;
    }
    const availableAnswers = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS)
    );
    this.answers = availableAnswers ? availableAnswers : {};
    const availableScores = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.SCORES)
    );
    this.scores = availableScores ? availableScores : {};
    this.setResultCase();
    this.setSnippetState();
  };

  render() {
    const { resetFormAndStartAgain, answers, resultCase, snippetsAnswers } = this;

    return (
      <div class="c-card-wrapper summary">
        <d4l-card classes="card--desktop">
          <div class="summary__content" slot="card-content">
            <h2>{i18next.t('summary_headline')}</h2>
            {[1, 2, 4].indexOf(resultCase) > -1 && snippetsAnswers.outOfBreath && (
              <RiskVeryIll ageAboveSixtyFive={snippetsAnswers.ageAboveSixtyFive} />
            )}
            <ia-recommendation resultCase={resultCase} />
            {resultCase !== 5 && (
              <RiskSpreading
                livingSituation={snippetsAnswers.livingSituation}
                workspace={snippetsAnswers.workspace}
                caringForRelatives={snippetsAnswers.caringForRelatives}
              />
            )}
            <ia-qr-code answers={answers} />
            <ia-answers-table answers={answers} />
          </div>
          <div class="summary__footer" slot="card-footer">
            <h3>{i18next.t('summary_reset_headline')}</h3>
            <d4l-button
              type="button"
              classes="button--block button--secondary "
              data-test="continueButton"
              text={i18next.t('summary_reset_button')}
              handleClick={() => {
                resetFormAndStartAgain();
                trackEvent(TRACKING_EVENTS.SUMMARY_DELETE);
              }}
            />
          </div>
        </d4l-card>
      </div>
    );
  }
}
