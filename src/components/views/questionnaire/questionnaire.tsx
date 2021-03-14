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
import i18next from '../../../global/utils/i18n';
import version from '../../../global/utils/version';
import settings from '../../../global/utils/settings';
import {
  isQuestionWithOptions,
  Question,
  QuestionnaireEngine,
  RawAnswer,
  Result,
} from '@covopen/covquestions-js';

export type Scores = { [key: string]: number };
export type Answers = { [key: string]: string | string[] };

@Component({
  styleUrl: 'questionnaire.css',
  tag: 'ia-questionnaire',
})
export class Questionnaire {
  @Prop() history: RouterHistory;

  @State() language: string;
  @State() previousStep: number;
  // TODO: Export DataType from CovQuestions
  @State() answerData: { [key: string]: any } = undefined;
  @State() result: Result = undefined;

  @Event() showLogoHeader: EventEmitter;

  formElement: HTMLFormElement;
  questionnaireEngine: QuestionnaireEngine;
  @State() currentQuestion: Question;
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
    this.moveToPreviousStep();
  }

  @Event() showErrorBanner: EventEmitter;
  showErrorBannerHandler() {
    this.showErrorBanner.emit();
  }

  updateFormData = (event: CustomEvent) => {
    const { detail } = event;
    if (this.currentQuestion.type === 'date') {
      // Calculate Custom Timestamp
      // TODO: https://github.com/CovOpen/CovQuestions/issues/143
      detail.value = detail.value / 1000;
    }
    this.setFormData(detail.key, detail.value);
  };
  setFormData(key: string, value: string | string[]) {
    this.answerData = {
      ...this.answerData,
      [key]: value,
    };
  }

  persistStateToLocalStorage = () => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYS.ANSWERS,
      JSON.stringify(this.answerData)
    );
    localStorage.setItem(LOCAL_STORAGE_KEYS.RESULT, JSON.stringify(this.result));
    settings.completed = false;
    version.set();
  };
  progress: number = 0.01;

  //   trackStepMove(isPreviousStep: Boolean) {
  //     const { id } = QUESTIONS[this.currentStep];
  //     if (isPreviousStep) {
  //       trackEvent([...TRACKING_EVENTS.QUESTION_PREVIOUS, id]);
  //     } else {
  //       trackEvent([...TRACKING_EVENTS.QUESTION_NEXT, id]);
  //     }
  //   }

  moveToNextStep = () => {
    try {
      this.questionnaireEngine.setAnswer(
        this.currentQuestion.id,
        this.currentAnswerValue
      );
    } catch (error) {
      this.showErrorBannerHandler();
      console.log(error);
      return;
    }
    const nextQuestion = this.questionnaireEngine.nextQuestion();
    this.progress = this.questionnaireEngine.getProgress();
    if (nextQuestion === undefined) {
      this.history.push(ROUTES.SUMMARY, {});
      //   trackEvent(TRACKING_EVENTS.FINISH);
    } else {
      this.currentQuestion = nextQuestion;
    }
    this.persistStateToLocalStorage();

    // const question = QUESTIONS[this.currentStep];
    // let answerIndex = this.answerData[question.id];

    // if (question.id === QUESTION.DATA_DONATION) {
    //   trackEvent([
    //     ...TRACKING_EVENTS.DATA_DONATION_CONSENT,
    //     this.answerData[QUESTION.DATA_DONATION] === '0' ? '1' : '0',
    //   ]);
    // }

    // this.scoreData = updateScoreData(this.currentStep, answerIndex, this.scoreData);
  };

  moveToPreviousStep = () => {
    if (this.questionnaireEngine.getProgress() === 0) {
      this.history.push(`/`, {});
      localStorage.removeItem(LOCAL_STORAGE_KEYS.ANSWERS);
    } else {
      const { question, answer } = this.questionnaireEngine.previousQuestion(
        this.currentQuestion.id
      );
      this.currentQuestion = question;
      const answers = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS));
      if (this.answerData && answers) {
        this.answerData = answers;
        this.persistStateToLocalStorage();
        // reset previous answer so that fields are still filled out
        // answerData needs reassignment to avoid race condition
        requestAnimationFrame(
          () =>
            (this.answerData = {
              ...this.answerData,
              [this.currentQuestion.id]: answer as string[],
            })
        );
      }
    }
  };

  submitForm = (event: Event) => {
    event.preventDefault();
    (event.target as HTMLInputElement).querySelector('input')?.focus();
    this.moveToNextStep();
  };

  get currentAnswerValue(): RawAnswer {
    return this.answerData[this.currentQuestion.id];
  }

  componentWillLoad = () => {
    this.showLogoHeader.emit({ show: false });
    if (!version.match()) {
      version.reset();
    }
    const availableAnswers = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.ANSWERS)
    );
    const availablResult = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEYS.RESULT)
    );

    this.answerData = availableAnswers ?? {};
    this.result = availablResult ?? {};

    // const formDataKeys = Object.keys(this.answerData);

    // if (formDataKeys.length) {
    //   this.currentStep = getQuestionIndexById(formDataKeys[formDataKeys.length - 1]);

    //   this.moveToNextStep();
    // }
    this.newQuestionnaire(
      'https://covopen.github.io/CovQuestions/questionnaires/covapp/2/de.json'
    );
    // this.questionnaireEngine = new QuestionnaireEngine(testQuestionnaire);
    // this.currentQuestion = this.questionnaireEngine.nextQuestion();
    // this.questionnaireEngine
  };

  newQuestionnaire = (url: string) => {
    fetch(url)
      .then((response: Response) => response.json())
      .then(response => {
        this.questionnaireEngine = new QuestionnaireEngine(response);
        this.questionnaireEngine.setAnswersPersistence({
          answers: Object.keys(this.answerData).reduce((accumulator, key, i, a) => {
            accumulator.push({
              questionId: key,
              rawAnswer: this.answerData[key],
            });
            return accumulator;
          }, []),
          version: 2,
          timeOfExecution: 23,
        });
        this.currentQuestion = this.questionnaireEngine.nextQuestion();
        this.progress = this.questionnaireEngine.getProgress();
      })
      .catch(() => {
        // do nothing for now
      });
  };

  render() {
    const {
      submitForm,
      newQuestionnaire,
      moveToPreviousStep,
      progress,
      currentQuestion,
      updateFormData,
    } = this;

    return (
      <div class="questionnaire c-card-wrapper">
        <input
          placeholder="CovQuesionnaire Link"
          value="https://covopen.github.io/CovQuestions/questionnaires/covapp/2/de.json"
          onInput={event =>
            newQuestionnaire((event.target as HTMLInputElement).value)
          }
        ></input>
        <form
          onSubmit={event => submitForm(event)}
          ref={el => (this.formElement = el as HTMLFormElement)}
          data-test="questionnaireForm"
        >
          <d4l-card classes="card--desktop card--text-center">
            <div class="u-margin-horizontal--card-negative" slot="card-header">
              <ia-navigation-header
                headline={currentQuestion ? currentQuestion.text : ''}
                handleClick={() => moveToPreviousStep()}
              />
              <d4l-linear-progress
                data-test="progressBar"
                value={progress * 100}
                label={i18next.t('questionnaire_progress_bar_label')}
              />
            </div>
            <div
              class="questionnaire__content u-padding-vertical--medium u-text-align--left"
              slot="card-content"
            >
              <fieldset>
                <legend class="u-visually-hidden">
                  {currentQuestion ? currentQuestion.text : ''}
                </legend>
                {/* {QUESTIONS[currentStep].comment && (
                      <p
                        class="questionnaire__comment"
                        innerHTML={`${i18next.t(QUESTIONS[currentStep].comment)}`}
                      ></p>
                    )} */}
                {currentQuestion ? (
                  <div class="questionnaire__form u-padding-vertical--normal ">
                    {isQuestionWithOptions(currentQuestion) &&
                      ((currentQuestion.type === 'multiselect' && (
                        <ia-input-multiple-choice
                          data-test="questionnaireRadioInputs"
                          inputId={currentQuestion.id}
                          options={currentQuestion.options}
                          value={this.currentAnswerValue as any}
                          onUpdateFormData={updateFormData}
                        />
                      )) ||
                        (currentQuestion.type === 'select' && (
                          <ia-input-radio
                            data-test="questionnaireRadioInputs"
                            inputId={currentQuestion.id}
                            options={currentQuestion.options}
                            value={this.currentAnswerValue as string}
                            onUpdateFormData={updateFormData}
                          />
                        )))}
                    {currentQuestion.type === 'boolean' && (
                      <input-boolean
                        inputId={currentQuestion.id}
                        value={this.currentAnswerValue as boolean}
                        onUpdateFormData={updateFormData}
                      ></input-boolean>
                    )}
                    {/* TODO date-input component library component doesn't support setting initial value -> skipped */}
                    {currentQuestion.type === 'date' && (
                      <ia-input-date
                        inputId={currentQuestion.id}
                        value={
                          this.currentAnswerValue
                            ? // Calculate Custom Timestamp
                              // TODO: https://github.com/CovOpen/CovQuestions/issues/143
                              new Date((this.currentAnswerValue as number) * 1000)
                            : undefined
                        }
                        onUpdateFormData={updateFormData}
                      />
                    )}
                    {currentQuestion.type === 'text' && (
                      <ia-input-postal-code
                        question={{
                          id: currentQuestion.id,
                          category: '',
                          inputType: 'checkbox',
                        }}
                        value={this.currentAnswerValue as string}
                        onUpdateFormData={updateFormData}
                      />
                    )}
                    {currentQuestion.type === 'number' && (
                      <ia-input-number
                        question={{
                          id: currentQuestion.id,
                          category: '',
                          inputType: 'checkbox',
                        }}
                        value={this.currentAnswerValue as string}
                        onUpdateFormData={updateFormData}
                      />
                    )}
                  </div>
                ) : (
                  undefined
                )}
              </fieldset>
            </div>
            <div slot="card-footer">
              <d4l-button
                classes="button--block"
                data-test="continueButton"
                text={i18next.t('questionnaire_button_next')}
              />
            </div>
          </d4l-card>
        </form>
      </div>
    );
  }
}
