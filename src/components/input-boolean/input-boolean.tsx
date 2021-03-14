import {
  Component,
  ComponentInterface,
  Host,
  h,
  Prop,
  EventEmitter,
  Event,
} from '@stencil/core';

@Component({
  tag: 'input-boolean',
  styleUrl: 'input-boolean.css',
  shadow: true,
})
export class InputBoolean implements ComponentInterface {
  @Prop() inputId: string;
  @Prop() value: boolean;

  @Event({
    bubbles: false,
  })
  updateFormData: EventEmitter;
  updateFormDataEmitter(key: string, value: boolean) {
    this.updateFormData.emit({ key, value });
    debugger;
  }

  updateFormDataAction = (event: CustomEvent) => {
    event.stopPropagation();
    const { detail } = event;
    this.updateFormDataEmitter(detail.key, detail.value === 'true');
  };

  render() {
    const { updateFormDataAction } = this;
    return (
      <Host>
        <ia-input-radio
          inputId={this.inputId}
          options={[
            {
              text: 'Yes',
              value: 'true',
            },
            {
              text: 'No',
              value: 'false',
            },
          ]}
          value={this.value.toString()}
          onUpdateFormData={updateFormDataAction}
        />
      </Host>
    );
  }
}
