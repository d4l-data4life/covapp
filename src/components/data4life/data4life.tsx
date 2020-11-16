import { Component, h, State, Listen } from '@stencil/core';
import i18next from 'i18next';

import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';
import { ROUTES, DATA4LIFE_ID } from '../../global/constants';
import settings from '../../global/utils/settings';

@Component({
  styleUrl: ' data4life.css',
  tag: 'ia-data4life',
})
export class Data4LifeComponent {
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

  get data4lifeOrigin() {
    return settings.source;
  }

  render() {
    return (
      <div class="data4life" id={DATA4LIFE_ID}>
        <d4l-card classes="card--desktop card--text-center">
          <div slot="card-header" class="data4life__header">
            <ia-logo-d4l />
          </div>

          <div slot="card-content">
            <section class="data4life__section">
              <ia-covapp-to-data4life />

              <h3>{i18next.t('data4life_short_header_title')}</h3>
              <p>{i18next.t('data4life_short_header_infotext')}</p>
            </section>
          </div>

          <div class="data4life__footer" slot="card-footer">
            <stencil-route-link
              url={`${ROUTES.EXPORT}?origin=${this.data4lifeOrigin}`}
            >
              <d4l-button
                classes="button--block"
                data-test="goToExportButton"
                text={i18next.t('data4life_go-to-export_button')}
                onClick={() => trackEvent(TRACKING_EVENTS.SUMMARY_DATA4LIFE_ACCOUNT)}
                is-route-link
              />
            </stencil-route-link>
          </div>
        </d4l-card>
      </div>
    );
  }
}
