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
import { Question, CheckboxOption } from '../../global/questions';

@Component({
  styleUrl: 'input-multiple-choice.css',
  tag: 'ia-input-multiple-choice',
})
export class InputMultipleChoice {
  @Prop() question: Question;

  @State() language?: string;
  @State() checkedAnswers: string[] = [];

  @Listen('changedLanguage', {
    target: 'window',
  })
  async changedLanguageHandler(event: CustomEvent) {
    const { detail: language } = event;
    this.language = language;
  }

  @Event() updateFormData: EventEmitter;
  updateFormDataHandler(key: string, value: string[]) {
    this.updateFormData.emit({ key, value });
  }

  componentDidLoad() {
    this.updateFormDataHandler(this.question.id, this.checkedAnswers);
  }

  updateCheckedAnswers(checked: boolean, value: string) {
    if (checked) {
      this.checkedAnswers = [
        ...Array.from(new Set([...this.checkedAnswers, value])),
      ];
    } else {
      this.checkedAnswers = this.checkedAnswers.filter(
        (option: string) => option !== value
      );
    }
    this.updateFormDataHandler(this.question.id, this.checkedAnswers);
  }

  render() {
    const { question } = this;

    const onInputChange = (event: Event, inputId: string) => {
      const { type } = event;
      const target = event.target as HTMLInputElement;

      if (type === 'click' && inputId !== null) {
        const inputElement: HTMLInputElement = document.querySelector(`#${inputId}`);
        this.updateCheckedAnswers(inputElement.checked, inputElement.value);
      } else {
        this.updateCheckedAnswers(target.checked, target.value);
      }
    };

    return (
      <span>
        {(question.options as CheckboxOption[]).map(
          (option: CheckboxOption, index: number) =>
            option.label !== '' &&
            option.id !== '' && (
              <p>
                <d4l-checkbox
                  checkbox-id={`${question.id}-option${index}`}
                  name={question.id}
                  checked={this.checkedAnswers.indexOf(option.id) > -1}
                  label={i18next.t(option.label)}
                  value={index.toString()}
                  handleChange={(event: Event) => onInputChange(event, null)}
                  onClick={(event: Event) =>
                    onInputChange(event, `${question.id}-option${index}`)
                  }
                ></d4l-checkbox>
              </p>
            )
        )}
      </span>
    );
  }
}
