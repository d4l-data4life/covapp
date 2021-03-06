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
import { LOCAL_STORAGE_KEYS, ROUTES } from '../../../global/constants';
import { QUESTIONS, QUESTION } from '../../../global/questions';
import i18next from '../../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../../global/utils/track';
import version from '../../../global/utils/version';
import {
  checkGoTo,
  checkGuard,
  getQuestionIndexById,
  updateScoreData,
  getScoreChange,
} from './utils';
import settings from '../../../global/utils/settings';

export type Scores = { [key: string]: number };
export type Answers = { [key: string]: string | string[] };

@Component({
  styleUrl: 'questionnaire.css',
  tag: 'ia-questionnaire',
})
export class Questionnaire {
  @Prop() history: RouterHistory;

  @State() language: string;
  @State() currentStep: number = 0;
  @State() previousStep: number;
  @State() answerData: Answers = {};
  @State() scoreData: Scores = {};

  @Event() showLogoHeader: EventEmitter;

  formElement: HTMLFormElement;

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
    if (this.currentStep > 0) {
      this.history.push(ROUTES.QUESTIONNAIRE, {});
      this.moveToPreviousStep();
    }
  }

  @Event() showErrorBanner: EventEmitter;
  showErrorBannerHandler() {
    this.showErrorBanner.emit();
  }

  @Listen('updateFormData')
  updateFormDataHandler(event: CustomEvent) {
    const { detail } = event;
    this.setFormData(detail.key, detail.value);
  }

  // TODO: https://github.com/gesundheitscloud/infection-risk-assessment/pull/76
  // This is only a temporary fix. This should be moved/handled differently
  @Listen('dateChange')
  dateChangeHandler(event: CustomEvent) {
    const { currentStep } = this;
    const {
      detail: { value },
    } = event;
    this.setFormData(QUESTIONS[currentStep].id, value.split('-').join('.'));
  }

  setFormData(key: string, value: string | string[]) {
    this.answerData = {
      ...this.answerData,
      [key]: value,
    };
  }

  setLocalStorageAnswers = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ANSWERS,
      JSON.stringify(this.answerData)
    );
    localStorage.setItem(LOCAL_STORAGE_KEYS.SCORES, JSON.stringify(this.scoreData));
    settings.completed = false;
    version.set();
  };

  get progress() {
    return Math.floor(((this.currentStep + 1) / QUESTIONS.length) * 100);
  }

  trackStepMove(isPreviousStep: Boolean) {
    const { id } = QUESTIONS[this.currentStep];
    if (isPreviousStep) {
      trackEvent([...TRACKING_EVENTS.QUESTION_PREVIOUS, id]);
    } else {
      trackEvent([...TRACKING_EVENTS.QUESTION_NEXT, id]);
    }
  }

  moveToNextStep = () => {
    const question = QUESTIONS[this.currentStep];
    let answerIndex = this.answerData[question.id];

    if (!answerIndex && !question.optional) {
      this.showErrorBannerHandler();
      return;
    }

    if (question.id === QUESTION.DATA_DONATION) {
      trackEvent([
        ...TRACKING_EVENTS.DATA_DONATION_CONSENT,
        this.answerData[QUESTION.DATA_DONATION] === '0' ? '1' : '0',
      ]);
    }

    this.scoreData = updateScoreData(this.currentStep, answerIndex, this.scoreData);
    this.setLocalStorageAnswers();
    if (!this.checkFinished()) {
      this.currentStep = checkGoTo(this.currentStep, answerIndex);
      const stepBeforeGuard = this.currentStep;
      this.currentStep = checkGuard(
        this.currentStep,
        this.scoreData,
        this.answerData
      );
      if (stepBeforeGuard !== this.currentStep) {
        this.checkFinished();
        return;
      }
      this.trackStepMove(false);
    }
  };

  checkFinished = () => {
    if (this.currentStep >= QUESTIONS.length - 1) {
      this.history.push(ROUTES.SUMMARY, {});
      trackEvent(TRACKING_EVENTS.FINISH);
      return true;
    }
    return false;
  };

  moveToPreviousStep = () => {
    if (this.currentStep === 0) {
      this.history.push(`/`, {});
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ANSWERS);
      trackEvent(TRACKING_EVENTS.ABORT);
    } else {
      const answers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS));

      if (this.answerData && answers) {
        const formDataKeys = Object.keys(answers);
        let previousDataKey = formDataKeys[formDataKeys.length - 1];

        const previousQuestion = QUESTIONS[getQuestionIndexById(previousDataKey)];
        const previousAnswer = answers[previousDataKey];
        if (previousQuestion.scoreMap) {
          this.scoreData[previousQuestion.category] -= getScoreChange(
            previousQuestion,
            previousAnswer
          );
        }

        delete answers[previousDataKey];
        this.answerData = answers;
        this.setLocalStorageAnswers();

        this.currentStep = previousDataKey
          ? getQuestionIndexById(previousDataKey)
          : 0;

        // reset previous answer so that fields are still filled out
        // answerData needs reassignment to avoid race condition
        requestAnimationFrame(
          () =>
            (this.answerData = {
              ...this.answerData,
              [previousDataKey]: previousAnswer,
            })
        );
      } else {
        this.currentStep--;
      }

      this.trackStepMove(true);
    }
  };

  submitForm = (event: Event) => {
    event.preventDefault();
    (event.target as HTMLInputElement).querySelector('input')?.focus();
    this.moveToNextStep();
  };

  get currentAnswerValue() {
    return this.answerData[QUESTIONS[this.currentStep].id];
  }

  componentWillLoad = () => {
    this.showLogoHeader.emit({ show: false });
    if (!version.match()) {
      version.reset();
    }
    const availableAnswers = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS)
    );
    const availableScores = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.SCORES)
    );

    this.answerData = availableAnswers ?? {};
    this.scoreData = availableScores ?? {};

    const formDataKeys = Object.keys(this.answerData);

    if (formDataKeys.length) {
      this.currentStep = getQuestionIndexById(formDataKeys[formDataKeys.length - 1]);

      this.moveToNextStep();
    }
  };

  render() {
    const { submitForm, currentStep, moveToPreviousStep, progress } = this;

    return (
      currentStep < QUESTIONS.length &&
      QUESTIONS[currentStep] && (
        <div class="questionnaire c-card-wrapper">
          <form
            onSubmit={event => submitForm(event)}
            ref={el => (this.formElement = el as HTMLFormElement)}
            data-test="questionnaireForm"
          >
            <d4l-card classes="card--desktop card--text-center">
              <div class="u-margin-horizontal--card-negative" slot="card-header">
                <ia-navigation-header
                  headline={i18next.t(QUESTIONS[currentStep].text)}
                  handleClick={() => moveToPreviousStep()}
                />
                <d4l-linear-progress
                  data-test="progressBar"
                  value={progress}
                  label={i18next.t('questionnaire_progress_bar_label')}
                />
              </div>
              <div
                class="questionnaire__content u-padding-vertical--medium u-text-align--left"
                slot="card-content"
              >
                <fieldset>
                  <legend class="u-visually-hidden">
                    {i18next.t(QUESTIONS[currentStep].text)}
                  </legend>
                  {QUESTIONS[currentStep].comment && (
                    <p
                      class="questionnaire__comment"
                      innerHTML={`${i18next.t(QUESTIONS[currentStep].comment)}`}
                    ></p>
                  )}
                  <div class="questionnaire__form u-padding-vertical--normal ">
                    {QUESTIONS[currentStep].inputType === 'radio' && (
                      <ia-input-radio
                        data-test="questionnaireRadioInputs"
                        question={QUESTIONS[currentStep]}
                        currentSelection={this.currentAnswerValue as string}
                      />
                    )}
                    {QUESTIONS[currentStep].inputType === 'checkbox' && (
                      <ia-input-multiple-choice
                        question={QUESTIONS[currentStep]}
                        value={this.currentAnswerValue as string[]}
                      />
                    )}

                    {/* TODO date-input component library component doesn't support setting initial value -> skipped */}
                    {QUESTIONS[currentStep].inputType === 'date' && (
                      <ia-input-date question={QUESTIONS[currentStep]} />
                    )}
                    {QUESTIONS[currentStep].inputType === 'postal' && (
                      <ia-input-postal-code
                        question={QUESTIONS[currentStep]}
                        value={this.currentAnswerValue as string}
                      />
                    )}
                    {QUESTIONS[currentStep].inputType === 'decimal' && (
                      <ia-input-number
                        question={QUESTIONS[currentStep]}
                        value={this.currentAnswerValue as string}
                      />
                    )}
                  </div>
                </fieldset>
              </div>
              <div slot="card-footer">
                <d4l-button
                  classes="button--block"
                  data-test="continueButton"
                  text={
                    currentStep === QUESTIONS.length - 1
                      ? i18next.t('questionnaire_button_generate_qr')
                      : i18next.t('questionnaire_button_next')
                  }
                />
              </div>
            </d4l-card>
          </form>
        </div>
      )
    );
  }
}
