import { Component, h, State, Prop, Listen } from '@stencil/core';
import i18next from 'i18next';
@Component({
  styleUrl: ' call-to-action.css',
  tag: 'ia-call-to-action',
  assetsDirs: ['assets'],
})
export class CallToActionComponent {
  @Prop() type: 'OPEN_SOURCE' | 'WIDGET';
  @Prop() showCard = true;
  @State() language: string;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get content() {
    return this.type === 'OPEN_SOURCE' ? (
      <div class="call-to-action__container">
        <ia-logo-open-source />
        <div innerHTML={i18next.t('call_to_action_open_source')}></div>
      </div>
    ) : (
      <div class="call-to-action__container">
        <ia-logo-widget />
        <div innerHTML={i18next.t('call_to_action_widget')}></div>
      </div>
    );
  }

  render() {
    return (
      <div class="call-to-action">
        {this.showCard ? (
          <d4l-card classes="card--desktops cards--text-center">
            <div slot="card-content">{this.content}</div>
          </d4l-card>
        ) : (
          this.content
        )}
      </div>
    );
  }
}
