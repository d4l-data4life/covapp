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

@Component({
  tag: 'ia-input-postal-code',
})
export class InputPostalCode {
  @Prop() inputId: string;
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
    const { inputId, value } = this;

    const onInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.updateFormDataHandler(this.inputId, target.value);
    };

    return (
      <span>
        <d4l-input
          inputId={`input-question-${inputId}`}
          name={inputId}
          pattern="(?!01000|99999)(0[1-9]\d{3}|[1-9]\d{4})"
          inputmode="numeric"
          required
          label={i18next.t('input_postal_code_label')}
          value={value}
          onInput={(event: Event) => onInputChange(event)}
        ></d4l-input>
      </span>
    );
  }
}
