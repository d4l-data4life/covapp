import { Component, h, Listen, Prop, State } from '@stencil/core';
import { QUESTIONS } from '../../global/questions';
import i18next from '../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';
import { getRootCSSPropertyValue } from '../../global/utils/css-properties';

@Component({
  styleUrl: 'answers-table.css',
  tag: 'ia-answers-table',
})
export class AnswersTable {
  @Prop() answers: any = {};
  @State() language: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  generateQuestionRow = (id: string) => {
    const question = QUESTIONS.find(e => e.id === id);
    if (!question) {
      return null;
    }

    if (question.inputType === 'date') {
      return (
        <tr class="answers-tabl__row">
          <td>{i18next.t(question.text)}</td>
          <td>
            {this.answers[id]
              .split('.')
              .reverse()
              .join('.')}
          </td>
        </tr>
      );
    } else if (question.inputType === 'radio') {
      const response = question.options[this.answers[id]] as string;
      return (
        <tr class="answers-table__row">
          <td>{i18next.t(question.text)}</td>
          <td>{i18next.t(response)}</td>
        </tr>
      );
    } else if (question.inputType === 'checkbox') {
      return (
        <tr class="answers-table__row">
          <td>{i18next.t(question.text)}</td>
          <td>
            {this.answers[id].map(
              (optionIndex: string, index: number) =>
                `${i18next.t(question.options[optionIndex].label)}${
                  index < this.answers[id].length - 1 ? ', ' : ''
                }`
            )}
            {this.answers[id].length < 1 && i18next.t('input_multiple_choice_none')}
          </td>
        </tr>
      );
    } else {
      return null;
    }
  };

  render() {
    const { answers, generateQuestionRow } = this;

    const props = {
      'data-test': 'toggleAnswersButton',
    };

    return (
      <div class="answers-table">
        <d4l-accordion
          open={false}
          headerBackgroundColor={getRootCSSPropertyValue('--c-gray')}
          classes="accordion--no-panel-border accordion--no-panel-padding"
          buttonProps={props}
        >
          <p class="o-accordion-headline" slot="accordion-header">
            {i18next.t('answers_table_headline')}
          </p>
          <div slot="accordion-panel">
            <table>{Object.keys(answers).map(id => generateQuestionRow(id))}</table>
            <d4l-button
              type="button"
              classes="button--block answers-table__button"
              data-test="printButton"
              text={i18next.t('answers_table_print')}
              handleClick={() => {
                trackEvent(TRACKING_EVENTS.SUMMARY_PRINT);
                window.print();
              }}
            />
          </div>
        </d4l-accordion>
      </div>
    );
  }
}
