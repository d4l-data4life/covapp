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
import {
  LOCAL_STORAGE_KEYS,
  ROUTES,
  TWO_WEEKS,
  MOBILE_ORIGINS,
} from '../../../global/constants';
import { CATEGORIES, QUESTION } from '../../../global/questions';
import { getToday } from '../../../global/utils/date';
import i18next from '../../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../../global/utils/track';
import version from '../../../global/utils/version';
import { RiskSpreading } from './snippets/risk-spreading';
import { RiskVeryIll } from './snippets/risk-very-ill';
import { Answers, Scores } from '../questionnaire/questionnaire';
import { WHITELISTED_DATA4LIFE_ORIGINS } from '../../../global/custom';
import settings from '../../../global/utils/settings';
import { IS_CHARITE } from '../../../global/layouts';

@Component({
  styleUrl: 'summary.css',
  tag: 'ia-summary',
})
export class Summary {
  @Prop() history: RouterHistory;

  @State() language: string;
  @State() answers: Answers = {};
  @State() scores: Scores = {};
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
    const answerKeys = Object.keys(this.answers);
    delete this.answers[answerKeys[answerKeys.length - 1]];
    localStorage.setItem(LOCAL_STORAGE_KEYS.ANSWERS, JSON.stringify(this.answers));
    settings.completed = false;
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
      scores[CATEGORIES.SYMPTOMS] > 0 || scores[CATEGORIES.SYMPTOMS_HIGH] > 0;
    const hasHighSymptoms = scores[CATEGORIES.SYMPTOMS_HIGH] > 0;

    if (scores[CATEGORIES.CONTACT] > 0) {
      if (hasSymptoms) {
        if (this.symptomsWithinTwoWeeksOfContact) {
          this.resultCase = 1;
        } else if (hasHighSymptoms) {
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
        if (hasHighSymptoms) {
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
    const contactAnswer = this.answers[QUESTION.CONTACT_DATE] as string;
    const symptomAnswer = this.answers[QUESTION.SYMPTOM_DATE] as string;
    if (contactAnswer && symptomAnswer) {
      let contact = new Date(contactAnswer.split('.').join('-')).getTime();
      let symptoms = new Date(symptomAnswer.split('.').join('-')).getTime();
      return symptoms - contact <= TWO_WEEKS;
    }

    return false;
  }

  get contactWithinTwoWeeks() {
    const contactAnswer = this.answers[QUESTION.CONTACT_DATE] as string;
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
        parseInt(this.answers[QUESTION.OUT_OF_BREATH] as string, 10) === 0;
      this.snippetsAnswers.ageAboveSixtyFive =
        parseInt(this.answers[QUESTION.AGE] as string, 10) > 3 ||
        parseInt(this.answers[QUESTION.ABOVE_65] as string, 10) === 0;
      this.snippetsAnswers.livingSituation = parseInt(
        this.answers[QUESTION.HOUSING] as string,
        10
      );
      this.snippetsAnswers.workspace = parseInt(
        this.answers[QUESTION.WORKSPACE] as string,
        10
      );
      this.snippetsAnswers.caringForRelatives =
        parseInt(this.answers[QUESTION.CARING] as string, 10) === 0;
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
    settings.completed = true;
  };

  get isFromData4Life() {
    const { source } = settings;
    return source
      ? WHITELISTED_DATA4LIFE_ORIGINS.includes(source) || !!MOBILE_ORIGINS[source]
      : false;
  }

  get completedExport() {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.EXPORTED) === 'true';
  }

  render() {
    const {
      resetFormAndStartAgain,
      answers,
      resultCase,
      snippetsAnswers,
      isFromData4Life,
      completedExport,
    } = this;

    return (
      <div class="c-card-wrapper summary">
        <d4l-card classes="card--desktop">
          <div class="summary__content" slot="card-content">
            <h2>{i18next.t('summary_headline')}</h2>
            {[1, 2, 4].indexOf(resultCase) > -1 && (
              <span>
                {snippetsAnswers.outOfBreath && (
                  <RiskVeryIll
                    ageAboveSixtyFive={snippetsAnswers.ageAboveSixtyFive}
                  />
                )}
              </span>
            )}
            <ia-recommendation resultCase={resultCase} />
            {resultCase !== 5 && (
              <RiskSpreading
                livingSituation={snippetsAnswers.livingSituation}
                workspace={snippetsAnswers.workspace}
                caringForRelatives={snippetsAnswers.caringForRelatives}
              />
            )}
          </div>
        </d4l-card>

        {!completedExport && IS_CHARITE && isFromData4Life && <ia-data4life />}

        <d4l-card classes="card--desktop summary__content">
          <div slot="card-content">
            <ia-qr-code answers={answers} resultCase={resultCase} />
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

        {IS_CHARITE && <ia-app-recommendations isFromData4Life={isFromData4Life} />}
      </div>
    );
  }
}
