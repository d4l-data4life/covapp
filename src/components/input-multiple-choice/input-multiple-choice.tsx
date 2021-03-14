import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'input-multiple-choice.css',
  tag: 'ia-input-multiple-choice',
})
export class InputMultipleChoice {
  @Prop() inputId: string;
  @Prop() options: {
    value: string;
    text: string;
  }[];
  @Prop() value: string[] = undefined;

  getValue(): string[] {
    return this.value ? this.value : [];
  }

  @Event({
    bubbles: false,
  })
  updateFormData: EventEmitter;
  updateFormDataHandler(key: string, value: string[]) {
    // TODO: This Handler is called multiple times
    this.updateFormData.emit({ key, value });
  }
  componentDidLoad() {
    this.updateFormDataHandler(this.inputId, this.getValue());
  }

  updateCheckedAnswers(checked: boolean, value: string) {
    if (checked) {
      this.value = [...Array.from(new Set([...this.getValue(), value]))];
    } else {
      this.value = this.getValue().filter((option: string) => option !== value);
    }
    this.updateFormDataHandler(this.inputId, this.getValue());
  }

  render() {
    const { options, inputId } = this;
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
        {options.map(
          option =>
            option.text !== '' &&
            option.value !== '' && (
              <p>
                <d4l-checkbox
                  key={inputId}
                  checkbox-id={`${inputId}-option${option.value}`}
                  name={inputId}
                  checked={this.getValue().indexOf(option.value) > -1}
                  label={option.text}
                  value={option.value}
                  handleChange={(event: Event) => onInputChange(event, null)}
                  onClick={(event: Event) =>
                    onInputChange(event, `${inputId}-option${option.value}`)
                  }
                ></d4l-checkbox>
              </p>
            )
        )}
      </span>
    );
  }
}
