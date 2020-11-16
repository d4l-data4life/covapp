import { Component, h, State, Listen, Prop } from '@stencil/core';
import i18next from 'i18next';
import { APP_RECOMMENDATIONS_ID, DATA4LIFE_ID } from '../../global/constants';
import { DATA4LIFE_URL } from '../../global/custom';
import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';

@Component({
  styleUrl: 'app-recommendations.css',
  tag: 'ia-app-recommendations',
  assetsDirs: ['assets'],
})
export class AppRecommendationsComponent {
  @State() language: string;
  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  @Prop() isFromData4Life: boolean = false;

  scrollToData4Life() {
    const element = document.getElementById(DATA4LIFE_ID);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest',
      });
    }
  }

  render() {
    return (
      <div class="app-recommendation__wrapper" id={APP_RECOMMENDATIONS_ID}>
        <h4 class="u-text-align--center u-padding-horizontal--normal">
          {i18next.t('app_recommendation_headline')}
        </h4>

        <div class="app-recommendation--full-width">
          <d4l-card classes="card--desktop">
            <div slot="card-content" class="app-recommendation__card">
              <ia-logo-d4l-bordered />
              <p class="app-recommendation__name u-text-align--center app-recommendation__name--with-byline">
                {i18next.t('app_recommendation_d4l_app_name')}
              </p>
              <p class="app-recommendation__byline">
                {i18next.t('app_recommendation_d4l_app_byline')}
              </p>
              <div class="app-recommendation__logo__wrapper">
                <ia-logo-charite />
              </div>
              {!this.isFromData4Life && (
                <a href={`${DATA4LIFE_URL}?source=CovApp`} target="_blank">
                  <d4l-button
                    classes="button--block app-recommendation__button"
                    text={i18next.t('app_recommendation_learn_more_button')}
                    onClick={() =>
                      trackEvent(TRACKING_EVENTS.SUMMARY_DATA4LIFE_NO_ACCOUNT)
                    }
                    is-route-link
                  />
                </a>
              )}
              {this.isFromData4Life && (
                <d4l-button
                  classes="button--block app-recommendation__button"
                  text={i18next.t('app_recommendation_learn_more_button')}
                  onClick={() => this.scrollToData4Life()}
                />
              )}
            </div>
          </d4l-card>
        </div>

        <div class="app-recommendation--full-width">
          <d4l-card classes="card--desktop">
            <div slot="card-content" class="app-recommendation__card">
              <img
                src="/assets/images/rki-app.png"
                class="app-recommendation__icon"
              />
              <p class="app-recommendation__name u-text-align--center">
                {i18next.t('app_recommendation_rki_app_name')}
              </p>
              <div class="app-recommendation__logo__wrapper">
                <ia-logo-rki />
              </div>
              <a
                href="https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Kontaktperson/Tagebuch_Kontaktpersonen.html"
                target="_blank"
              >
                <d4l-button
                  classes="button--block app-recommendation__button"
                  text={i18next.t('app_recommendation_learn_more_button')}
                  onClick={() => trackEvent(TRACKING_EVENTS.SUMMARY_LEARN_MORE_RKI)}
                  is-route-link
                />
              </a>
            </div>
          </d4l-card>
        </div>

        <div class="app-recommendation--half-width">
          <d4l-card classes="card--desktop">
            <div slot="card-content" class="app-recommendation__card">
              <img
                src="/assets/images/uni-freiburg-app.png"
                class="app-recommendation__icon"
              />
              <p class="app-recommendation__name u-text-align--center">
                {i18next.t('app_recommendation_uni-freiburg_app_name')}
              </p>
              <div class="app-recommendation__logo__wrapper">
                <img
                  src="/assets/images/uni-freiburg-logo.png"
                  class="app-recommendation__logo"
                />
              </div>
              <a href="https://www.eureqa.io/covid-19" target="_blank">
                <d4l-button
                  classes="button--block app-recommendation__button"
                  text={i18next.t('app_recommendation_learn_more_button')}
                  onClick={() =>
                    trackEvent(TRACKING_EVENTS.SUMMARY_LEARN_MORE_FREIBURG)
                  }
                  is-route-link
                />
              </a>
            </div>
          </d4l-card>
        </div>

        <div class="app-recommendation--half-width">
          <d4l-card classes="card--desktop">
            <div slot="card-content" class="app-recommendation__card">
              <img
                src="/assets/images/million-friends-app.png"
                class="app-recommendation__icon"
              />
              <p class="app-recommendation__name u-text-align--center">
                {i18next.t('app_recommendation_million-friends_app_name')}
              </p>
              <div class="app-recommendation__logo__wrapper">
                <img
                  src="/assets/images/million-friends-logo.png"
                  class="app-recommendation__logo"
                />
              </div>
              <a href="https://millionfriends.de/covid19/" target="_blank">
                <d4l-button
                  classes="button--block app-recommendation__button"
                  text={i18next.t('app_recommendation_learn_more_button')}
                  onClick={() =>
                    trackEvent(TRACKING_EVENTS.SUMMARY_LEARN_MORE_MILLION_FRIENDS)
                  }
                  is-route-link
                />
              </a>
            </div>
          </d4l-card>
        </div>
      </div>
    );
  }
}
