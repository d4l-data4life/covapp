import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import i18next from '../../global/utils/i18n';
import { Question } from '../../global/questions';

@Component({
  styleUrl: 'input-number.css',
  tag: 'ia-input-number',
})
export class InputNumber {
  @Prop() question: Question;
  @Prop() value: string;

  @State() language?: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  async changedLanguageHandler(event: CustomEvent) {
    const { detail: language } = event;
    this.language = language;
  }

  @Event() updateFormData: EventEmitter;
  updateFormDataHandler(key: string, value: string) {
    this.updateFormData.emit({ key, value });
  }

  render() {
    const { question, value } = this;

    const onInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.updateFormDataHandler(this.question.id, target.value);
    };

    return (
      <span>
        <d4l-input
          inputId={`input-question-${question.id}`}
          class="input-number"
          name={question.id}
          inputmode="numeric"
          type="number"
          required={!question.optional}
          label={i18next.t('input_number_label')}
          step={question.inputStep ?? 1}
          min={question.inputMin ?? 0}
          max={question.inputMax}
          value={value}
          onInput={(event: Event) => onInputChange(event)}
        ></d4l-input>
      </span>
    );
  }
}
