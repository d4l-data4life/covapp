import { Component, h, Listen, Prop, State } from '@stencil/core';
import { getRootCSSPropertyValue } from '../../global/utils/css-properties';

@Component({
  styleUrl: 'accordion.css',
  tag: 'ia-accordion',
})
export class Accordion {
  @Prop() elementId?: string;
  @Prop() headline: string;
  @Prop() slotContent?: string;
  @Prop() buttonProps?: { [key: string]: string };
  @Prop() open?: boolean = false;
  @Prop() handleToggle?: (boolean) => void;
  @State() language: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  render() {
    return (
      <d4l-accordion
        id={this.elementId}
        classes="accordion"
        open={this.open}
        buttonProps={this.buttonProps}
        handleToggle={this.handleToggle}
        headerBackgroundColor={getRootCSSPropertyValue('--c-gray')}
      >
        <h3
          class="o-accordion-headline u-padding-horizontal--extra-small u-text-align--left"
          slot="accordion-header"
        >
          {this.headline}
        </h3>
        {this.slotContent?.length > 0 ? (
          <div
            class="u-padding-vertical--normal u-padding-horizontal--extra-small"
            slot="accordion-panel"
            innerHTML={this.slotContent}
          />
        ) : (
          <div
            class="u-padding-vertical--normal u-padding-horizontal--extra-small"
            slot="accordion-panel"
          >
            <slot name="accordion-children" />
          </div>
        )}
      </d4l-accordion>
    );
  }
}
