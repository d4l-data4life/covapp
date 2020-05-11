import { Component, h, State, Prop, Listen } from '@stencil/core';
import i18next from 'i18next';
import { CUSTOM_LOGO } from '../../global/custom';
import { IS_CUSTOM, IS_COLLABORATION, IS_CHARITE, IS_BMG, IS_BZGA, IS_RKI } from '../../global/layouts';
@Component({
  styleUrl: ' logo-component.css',
  tag: 'ia-logo-component',
  assetsDirs: ['assets'],
})
export class LogoComponent {
  @Prop() classes?: string;
  @State() language: string;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  render() {
    return (
      <div class={`logo-component ${this.classes}`}>
        <d4l-card classes="card--desktop card--text-center">
          {!IS_CUSTOM && (
            <div class="logo-component__label" slot="card-header">
              {i18next.t('logo_header_label')}
            </div>
          )}
          <div slot="card-content">
            {CUSTOM_LOGO && IS_CUSTOM ? (
              <div innerHTML={CUSTOM_LOGO} class="logo-component__customLogo"></div>
            ) : (
              <div class="logo-component__container">
                {(IS_CHARITE || IS_COLLABORATION) && !IS_BMG && <ia-logo-bmg />}
                {(IS_CHARITE || IS_COLLABORATION) && !IS_BZGA && <ia-logo-bzga />}
                {(IS_CHARITE || IS_COLLABORATION) && !IS_RKI && <ia-logo-rki />}
                {IS_COLLABORATION && <ia-logo-charite />}
                <ia-logo-bih />
              </div>
            )}
          </div>
        </d4l-card>
      </div>
    );
  }
}
