import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';

@Component({
  styleUrl: 'input-radio.css',
  tag: 'ia-input-radio',
})
export class InputRadio {
  @Prop() inputId: string;
  @Prop() options: {
    value: string;
    text: string;
  }[];
  @Prop() value: string;
  @Event({
    bubbles: false,
  })
  updateFormData: EventEmitter;
  updateFormDataHandler(key: string, value: string) {
    this.updateFormData.emit({ key, value });
  }

  render() {
    const { inputId, value, options } = this;

    const onInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      this.updateFormDataHandler(target.name, target.value);
    };
    return (
      <span>
        {options.map(option => {
          let id = `${inputId}-option${option.text}`;
          return (
            <p>
              <d4l-radio
                radio-id={id}
                name={inputId}
                value={option.value}
                checked={value === option.value}
                required
                label={option.text}
                handleChange={(event: Event) => onInputChange(event)}
                onClick={(event: Event) => onInputChange(event)}
              />
            </p>
          );
        })}
      </span>
    );
  }
}
