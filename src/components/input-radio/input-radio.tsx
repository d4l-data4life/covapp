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
  styleUrl: 'input-radio.css',
  tag: 'ia-input-radio',
})
export class InputRadio {
  @Prop() question: Question;
  @Prop() currentSelection: any;

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
    const { question, currentSelection } = this;

    const onInputChange = (event: Event, inputId: string) => {
      const { type } = event;
      const target = event.target as HTMLInputElement;

      if (type === 'click' && inputId !== null) {
        const inputElement: HTMLInputElement = document.querySelector(`#${inputId}`);
        this.updateFormDataHandler(inputElement.name, inputElement.value);
      } else {
        this.updateFormDataHandler(target.name, target.value);
      }
    };

    return (
      <span>
        {(question.options as string[]).map(
          (option: string, index: number) =>
            option !== '' && (
              <p>
                <d4l-radio
                  radio-id={`${question.id}-option${index}`}
                  name={question.id}
                  value={index.toString()}
                  checked={currentSelection === index.toString()}
                  required
                  label={i18next.t(option)}
                  handleChange={(event: Event) => onInputChange(event, null)}
                  onClick={(event: Event) =>
                    onInputChange(event, `${question.id}-option${index}`)
                  }
                />
              </p>
            )
        )}
      </span>
    );
  }
}
