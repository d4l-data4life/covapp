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
import {
  IS_CHARITE,
  IS_BZGA,
  IS_BMG,
  IS_RKI,
  IS_CUSTOM,
  IS_D4L,
} from '../../../global/layouts';

@Component({
  tag: 'ia-data-privacy',
})
export class DataPrivacy {
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
      <div class="c-card-wrapper data_privacy">
        <d4l-card classes="card--desktop card--text-center">
          <div class="u-margin-horizontal--card-negative" slot="card-header">
            <ia-navigation-header
              headline={i18next.t('data_privacy_headline')}
              handleClick={() => this.history.push('/', {})}
            />
          </div>
          <div class="data_privacy__content u-text-align--left" slot="card-content">
            {(IS_CHARITE || IS_CUSTOM) && (
              <p innerHTML={i18next.t('data_privacy_content')} />
            )}
            {IS_BMG && <p innerHTML={i18next.t('data_privacy_content_bmg')} />}
            {IS_BZGA && <p innerHTML={i18next.t('data_privacy_content_bzga')} />}
            {IS_RKI && <p innerHTML={i18next.t('data_privacy_content_rki')} />}
            {IS_D4L && <p innerHTML={i18next.t('data_privacy_content_d4l')} />}
          </div>
        </d4l-card>
      </div>
    );
  }
}
