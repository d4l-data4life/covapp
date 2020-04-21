import { Component, h, State, Prop, Listen } from '@stencil/core';
import i18next from 'i18next';
@Component({
  styleUrl: ' call-to-action.css',
  tag: 'ia-call-to-action',
  assetsDirs: ['assets'],
})
export class CallToActionComponent {
  @Prop() type: 'OPEN_SOURCE' | 'WIDGET';
  @State() language: string;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  render() {
    return (
      <div class="call-to-action">
        <d4l-card classes="card--desktop card--text-center">
          <div slot="card-content">
            {this.type === 'OPEN_SOURCE' ? (
              <div class="call-to-action__container">
                <ia-logo-open-source />
                <div innerHTML={i18next.t('call_to_action_open_source')}></div>
              </div>
            ) : (
              <div class="call-to-action__container">
                <ia-logo-widget />
                <div innerHTML={i18next.t('call_to_action_widget')}></div>
              </div>
            )}
          </div>
        </d4l-card>
      </div>
    );
  }
}
