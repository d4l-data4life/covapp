import { Component, h, State, Listen } from '@stencil/core';
import i18next from 'i18next';
import { CUSTOM_LOGO } from '../../global/custom';
import { IS_CUSTOM, IS_COLLABORATION } from '../../global/layouts';
@Component({
  styleUrl: ' logo-header.css',
  tag: 'ia-logo-header',
  assetsDirs: ['assets'],
})
export class LogoHeader {
  @State() language: string;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  render() {
    return CUSTOM_LOGO && IS_CUSTOM ? (
      <div class="logo-header">
        <div innerHTML={CUSTOM_LOGO} class="logo-header__customLogo"></div>
      </div>
    ) : (
      <div
        class={`logo-header ${
          IS_COLLABORATION ? 'logo-header__reduced-logo-height' : ''
        }`}
      >
        <div class="logo-header__label">{i18next.t('logo_header_label')}</div>
        <div class="logo-header__container">
          {IS_COLLABORATION && <ia-logo-charite class="u-flex-center" />}
          {/* <ia-logo-bmg class="u-flex-center" />
          <ia-logo-rki class="u-flex-center" />
          <ia-logo-bzga class="u-flex-center" /> */}
        </div>
      </div>
    );
  }
}
