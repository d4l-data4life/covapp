import { Component, h, Listen, Prop, State } from '@stencil/core';
import { QUESTIONS } from '../../global/questions';
import i18next from '../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';

@Component({
  styleUrl: 'answers-table.css',
  tag: 'ia-answers-table',
})
export class AnswersTable {
  @Prop() answers: any = {};
  @State() language: string;
  @State() expandedTable: boolean = false;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  getClasses = () => {
    return this.expandedTable ? 'answers-table__container--expanded' : '';
  };

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
      const response = question.options[this.answers[id]];
      return (
        <tr class="answers-table__row">
          <td>{i18next.t(question.text)}</td>
          <td>{i18next.t(response)}</td>
        </tr>
      );
    } else {
      return null;
    }
  };

  render() {
    const { answers, getClasses, generateQuestionRow } = this;

    return (
      <div class="answers-table">
        <d4l-button
          type="button"
          classes="button--block answers-table__button"
          data-test="toggleAnswersButton"
          text={i18next.t(
            this.expandedTable
              ? 'answers_table_hide_answers'
              : 'answers_table_show_answers'
          )}
          handleClick={() => {
            this.expandedTable = !this.expandedTable;
            this.expandedTable && trackEvent(TRACKING_EVENTS.SUMMARY_ANSWERS_SHOW);
          }}
        />
        <div class={`answers-table__container ${getClasses()}`}>
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
      </div>
    );
  }
}
