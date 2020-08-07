import { Component, h, State, Prop, Listen } from '@stencil/core';
import i18next from 'i18next';

import { DATA4LIFE_URL } from '../../global/custom';
import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';
import { LOCAL_STORAGE_KEYS, ROUTES } from '../../global/constants';

const APP_STORE_LINKS = {
  ANDROID: 'https://play.google.com/store/apps/details?id=care.data4life.hub',
  IOS: 'https://apps.apple.com/de/app/id1506952048',
};

@Component({
  styleUrl: ' data4life.css',
  tag: 'ia-data4life',
  assetsDirs: ['assets'],
})
export class Data4LifeComponent {
  @Prop() long: boolean = true;

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
    return localStorage.getItem(LOCAL_STORAGE_KEYS.SOURCE);
  }

  get isMobile() {
    return false; // temporary fix until the mobile apps are in their stores
    // TODO re-enable
    /* return /[^\w](android|iphone|ipad|ipod)[^\w].*[^\w]mobile[^\w]/i.test(
      navigator.userAgent
    );*/
  }

  render() {
    return (
      <div class="data4life">
        {this.long ? (
          <d4l-card classes="card--desktop card--text-center">
            <div slot="card-header" class="data4life__header">
              <ia-logo-d4l-bordered size="medium" />
              <h2>{i18next.t('data4life_header_title')}</h2>
              <p innerHTML={i18next.t('data4life_header_infotext')} />
            </div>
            <div slot="card-content" class="data4life__content">
              <h3>{i18next.t('data4life_content_title')}</h3>

              <section class="data4life__section">
                <h4>{i18next.t('data4life_step_title', { step: 1 })}</h4>
                <img
                  src="/assets/images/create-account.svg"
                  class="data4life__section-image"
                />
                <p>{i18next.t('data4life_create_account_infotext')}</p>
              </section>

              <section class="data4life__section">
                <h4>{i18next.t('data4life_step_title', { step: 2 })}</h4>
                <ia-covapp-to-data4life class="data4life__section-image" />
                <p>{i18next.t('data4life_securely_import_infotext')}</p>
              </section>

              <section class="data4life__section">
                <h4>{i18next.t('data4life_step_title', { step: 3 })}</h4>
                <img
                  src="/assets/images/data4life-transfer.svg"
                  class="data4life__section-image"
                />
                <p>{i18next.t('data4life_report_daily_infotext')}</p>
              </section>

              <section class="data4life__section">
                <h4>{i18next.t('data4life_step_title', { step: 4 })}</h4>
                <img
                  src="/assets/images/data4life-share.svg"
                  class="data4life__section-image"
                />
                <p>{i18next.t('data4life_share_app_infotext')}</p>
              </section>
            </div>

            <div class="data4life__footer" slot="card-footer">
              {this.isMobile ? (
                <div>
                  <h3 class="data4life__caption">
                    {i18next.t('data4life_download-app_title')}
                  </h3>
                  <d4l-app-store-links
                    classes="data4life__app-store-links"
                    language={this.currentLanguage}
                    link-android={APP_STORE_LINKS.ANDROID}
                    text-android={i18next.t('data4life_download-app-android_button')}
                    link-ios={APP_STORE_LINKS.IOS}
                    text-ios={i18next.t('data4life_download-app-ios_button')}
                    handleClickAndroid={() =>
                      trackEvent(TRACKING_EVENTS.SUMMARY_DATA4LIFE_DOWNLOAD_ANDROID)
                    }
                    handleClickIos={() =>
                      trackEvent(TRACKING_EVENTS.SUMMARY_DATA4LIFE_DOWNLOAD_IOS)
                    }
                  />
                </div>
              ) : (
                <a href={`${DATA4LIFE_URL}?source=CovApp`}>
                  <d4l-button
                    classes="button--block"
                    data-test="startExportButton"
                    text={i18next.t('data4life_go-to_button')}
                    onClick={() =>
                      trackEvent(TRACKING_EVENTS.SUMMARY_DATA4LIFE_NO_ACCOUNT)
                    }
                    is-route-link
                  />
                </a>
              )}
            </div>
          </d4l-card>
        ) : (
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
                  onClick={() =>
                    trackEvent(TRACKING_EVENTS.SUMMARY_DATA4LIFE_ACCOUNT)
                  }
                  is-route-link
                />
              </stencil-route-link>
            </div>
          </d4l-card>
        )}
      </div>
    );
  }
}
