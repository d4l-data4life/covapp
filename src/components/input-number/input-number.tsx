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
  styleUrl: 'input-number.css',
  tag: 'ia-input-number',
})
export class InputNumber {
  @Prop() inputId: string;

  @Prop() value: number;
  @Prop() required: boolean = false;
  @Prop() inputStep: number = 1;
  @Prop() inputMin: number = 0;
  @Prop() inputMax: number;
  @State() language?: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  async changedLanguageHandler(event: CustomEvent) {
    const { detail: language } = event;
    this.language = language;
  }

  @Event() updateFormData: EventEmitter;
  updateFormDataHandler(key: string, value: number) {
    this.updateFormData.emit({ key, value });
  }

  render() {
    const { inputId, value, required, inputStep, inputMin, inputMax } = this;

    const onInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.updateFormDataHandler(this.inputId, Number(target.value));
    };

    return (
      <span>
        <d4l-input
          inputId={`input-question-${inputId}`}
          class="input-number"
          name={inputId}
          inputmode="numeric"
          type="number"
          required={required}
          label={i18next.t('input_number_label')}
          step={inputStep}
          min={inputMin}
          max={inputMax}
          value={(value as unknown) as string}
          onInput={(event: Event) => onInputChange(event)}
        ></d4l-input>
      </span>
    );
  }
}
