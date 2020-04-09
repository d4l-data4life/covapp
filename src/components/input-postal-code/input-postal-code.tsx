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
  tag: 'ia-input-postal-code',
})
export class InputPostalCode {
  @Prop() question: Question;

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
    const { question } = this;

    const onInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.updateFormDataHandler(this.question.id, target.value);
    };

    return (
      <span>
        <d4l-input
          name={question.id}
          pattern="(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})"
          inputmode="numeric"
          required
          label={i18next.t('input_postal_code_label')}
          onInput={(event: Event) => onInputChange(event)}
        ></d4l-input>
      </span>
    );
  }
}
