import { isQuestionWithOptions, Question } from '@covopen/covquestions-js';
import { Component, h, Listen, Prop, State } from '@stencil/core';
import { getQuestionnaire } from '../../global/questions';
import i18next from '../../global/utils/i18n';

@Component({
  styleUrl: 'answers-table.css',
  tag: 'ia-answers-table',
})
export class AnswersTable {
  @Prop() answers: any = {};
  @State() language: string;
  @State() questions: Question[];

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
    getQuestionnaire().then(questionnaire => {
      this.questions = questionnaire.questions;
    });
  };

  generateQuestionRow = (id: string) => {
    const question = this.questions.find(e => e.id === id);
    if (!question) {
      return null;
    }

    if (question.type === 'date') {
      return (
        <tr class="answers-table__row">
          <td>{i18next.t(question.text)}</td>
          <td>
            {this.answers[id]
              .split('.')
              .reverse()
              .join('.')}
          </td>
        </tr>
      );
    } else if (question.type === 'select' && isQuestionWithOptions(question)) {
      const response = question.options.find(o => o.value === this.answers[id]);
      return (
        <tr class="answers-table__row">
          <td>{i18next.t(question.text)}</td>
          <td>{i18next.t(response.text)}</td>
        </tr>
      );
    } else if (question.type === 'number') {
      return (
        <tr class="answers-table__row">
          <td>{i18next.t(question.text)}</td>
          <td>{this.answers[id]}</td>
        </tr>
      );
    } else if (question.type === 'multiselect') {
      return (
        <tr class="answers-table__row">
          <td>{i18next.t(question.text)}</td>
          <td>
            {this.answers[id].map(
              (option, index) =>
                `${question.options.find(o => o.value === option).text}${
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
    const { answers, generateQuestionRow, questions } = this;

    return (
      <div class="answers-table">
        {questions ? (
          <table>{Object.keys(answers).map(generateQuestionRow)}</table>
        ) : null}
      </div>
    );
  }
}
