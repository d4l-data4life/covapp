import {
  Component,
  h,
  State,
  Prop,
  Listen,
  Event,
  EventEmitter,
} from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import i18next from '../../../global/utils/i18n';
import { IS_CHARITE, IS_CUSTOM, IS_BMG, IS_BZGA, IS_RKI } from '../../../global/layouts';

@Component({
  tag: 'ia-imprint',
})
export class Imprint {
  @Prop() history: RouterHistory;
  @Event() showLogoHeader: EventEmitter;

  @State() language: string;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  componentWillLoad = () => {
    this.showLogoHeader.emit({ show: false });
  };

  render() {
    return (
      <div class="c-card-wrapper imprint">
        <d4l-card classes="card--desktop card--text-center">
          <div class="u-margin-horizontal--card-negative" slot="card-header">
            <ia-navigation-header
              headline={i18next.t('imprint_headline')}
              handleClick={() => this.history.push('/', {})}
            />
          </div>
          <div class="imprint__content u-text-align--left" slot="card-content">
            {(IS_CHARITE || IS_CUSTOM) && <p innerHTML={i18next.t('imprint_content')} />}
            {IS_BMG && <p innerHTML={i18next.t('imprint_content_bmg')} />}
            {IS_BZGA && <p innerHTML={i18next.t('imprint_content_bzga')} />}
            {IS_RKI && <p innerHTML={i18next.t('imprint_content_rki')} />}
          </div>
        </d4l-card>
      </div>
    );
  }
}
