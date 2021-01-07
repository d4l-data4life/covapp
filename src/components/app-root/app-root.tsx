import { Component, State, Listen, h, Prop } from '@stencil/core';
import i18next, { initialLanguage, LANGUAGES } from '../../global/utils/i18n';

import { ROUTES, IS_DEV, APP_RECOMMENDATIONS_ID } from '../../global/constants';
import {
  IS_CHARITE,
  IS_CUSTOM,
  IS_BZGA,
  IS_RKI,
  IS_BMG,
  IS_D4L,
} from '../../global/layouts';
import { TRACKING_IS_ENABLED } from '../../global/custom';
import settings, {
  SHOW_D4L_BANNER,
  COMPLETED,
  SOURCE,
} from '../../global/utils/settings';

import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';
import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';
import { RouterHistory, injectHistory } from '@stencil/router';

const dnt = navigator.doNotTrack === '1';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  private connectTranslationsEl: HTMLConnectTranslationsElement;
  @Prop() history: RouterHistory;
  @State() language: Language;
  @State() showLogoHeader: boolean = false;
  @State() d4lBannerIdentity: number = Date.now();
  @State() isEmbedded: boolean = false;
  @State() hasMadeCookieChoice: boolean;
  @State() showErrorBanner: boolean = false;

  @Listen('changedLanguage', {
    target: 'window',
  })
  async changedLanguageHandler(event: CustomEvent) {
    const { detail: language } = event;
    document.body.parentElement.setAttribute('lang', language.code);
    this.language = language;
  }

  getLanguageByCode(languageCode: Language['code']) {
    return LANGUAGES.find(({ code }) => code === languageCode);
  }

  @Listen('showErrorBanner', { target: 'window' })
  handleShowErrorBanner() {
    this.showErrorBanner = true;
  }

  @Listen('showLogoHeader')
  showLogoHeaderListener(event: CustomEvent) {
    this.showLogoHeader = event.detail.show;
  }

  @Listen('isEmbedded')
  isEmbeddedListener(event: CustomEvent) {
    this.isEmbedded = !!event.detail;
  }

  get showD4lBanner() {
    return (
      settings.showD4lBanner &&
      settings.completed &&
      !this.isEmbedded &&
      !settings.source
    );
  }

  saveSettings = ({ acceptCookies, acceptTracking }) => {
    settings.acceptsCookies = acceptCookies;
    settings.acceptsTracking = acceptCookies && acceptTracking;

    this.hasMadeCookieChoice = true;

    this.trackConsentIfGiven();
  };

  trackConsentIfGiven() {
    if (settings.acceptsTracking) {
      trackEvent([], 'setConsentGiven');
    }
  }

  handleBannerClick() {
    const element = document.getElementById(
      APP_RECOMMENDATIONS_ID
    ) as HTMLD4lAccordionElement;
    if (element) {
      element.open = true;
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      });
    } else {
      this.history.push(`${ROUTES.SUMMARY}#${APP_RECOMMENDATIONS_ID}`, {
        openAppRecommendationsAccordion: true,
      });
    }
    trackEvent(TRACKING_EVENTS.HEADER_BANNER_CLICK);
  }

  handleBannerClose() {
    settings.showD4lBanner = false;
    trackEvent(TRACKING_EVENTS.HEADER_BANNER_CLOSE);
  }

  async componentWillLoad() {
    // check for native date picker support
    // inspired by https://github.com/Modernizr/Modernizr/blob/master/feature-detects/inputtypes.js
    const testDateElement = document.createElement('input');
    testDateElement.setAttribute('type', 'date');
    testDateElement.value = 'text'; // should be sanitized away
    localStorage.setItem(
      'supportsDateElement',
      String(
        testDateElement.getAttribute('type') !== 'text' &&
          testDateElement.value !== 'text'
      )
    );

    this.language = this.getLanguageByCode(await initialLanguage);
    this.hasMadeCookieChoice = IS_DEV || settings.hasMadeCookieChoice;
    settings.onChange(
      key =>
        [SHOW_D4L_BANNER, COMPLETED, SOURCE].includes(key) &&
        (this.d4lBannerIdentity = new Date().getTime())
    );
  }

  componentDidLoad() {
    this.connectTranslationsEl.changedLanguageHandler(this.language);
    this.trackConsentIfGiven();
  }

  render() {
    const {
      language,
      showLogoHeader,
      showD4lBanner,
      showErrorBanner,
      isEmbedded,
      saveSettings,
      hasMadeCookieChoice,
    } = this;

    return (
      <connect-translations ref={el => (this.connectTranslationsEl = el)}>
        {TRACKING_IS_ENABLED && !hasMadeCookieChoice && !dnt && !isEmbedded && (
          <d4l-cookie-bar
            classes="cookie-bar app__cookie-bar"
            acceptText={i18next.t('cookie_bar_accept')}
            rejectText={i18next.t('cookie_bar_reject')}
            handleAccept={() =>
              saveSettings({ acceptCookies: true, acceptTracking: !dnt })
            }
            handleReject={() =>
              saveSettings({ acceptCookies: false, acceptTracking: !dnt })
            }
          >
            <div class="cookie-bar__content" slot="cookie-bar-text">
              {i18next.t('cookie_bar_text')}{' '}
              <stencil-route-link url={ROUTES.DATA_PRIVACY}>
                {i18next.t('cookie_bar_data_privacy')}
              </stencil-route-link>
            </div>
          </d4l-cookie-bar>
        )}
        {showD4lBanner && (
          <d4l-banner
            noreferrer={false}
            classes="banner--slim"
            handleClick={() => this.handleBannerClick()}
            handleClose={() => this.handleBannerClose()}
          >
            <div class="d4l-banner__content">
              <ia-logo-d4l link={false} compact={true} />
              <div innerHTML={i18next.t('d4l_banner_text')}></div>
            </div>
          </d4l-banner>
        )}
        {showErrorBanner && (
          <d4l-banner
            noreferrer={false}
            classes="banner--slim banner--error"
            handleClick={() => location.reload()}
            handleClose={() => (this.showErrorBanner = false)}
          >
            <div class="d4l-banner__content">
              <div innerHTML={i18next.t('error_reload_snackbar')}></div>
            </div>
          </d4l-banner>
        )}
        {showLogoHeader && !isEmbedded && IS_CUSTOM && (
          <ia-logo-component classes="logo-component--collaboration" />
        )}
        {!isEmbedded && (
          <header class="c-header">
            {showLogoHeader && !IS_CUSTOM && (
              <div class="app__logo-container">
                {(IS_CHARITE || IS_D4L) && <ia-logo-charite big />}
                {(IS_CHARITE || IS_D4L) && <ia-logo-d4l />}
                {IS_BZGA && <ia-logo-bzga big />}
                {IS_BMG && <ia-logo-bmg big />}
                {IS_RKI && <ia-logo-rki big />}
              </div>
            )}
            {!showLogoHeader && (
              <stencil-route-link
                url="/"
                anchorTitle="Home link"
                anchorClass="u-display-block c-logo"
              >
                <h1>CovApp</h1>
              </stencil-route-link>
            )}
            {LANGUAGES.length > 1 && (
              <d4l-language-switcher
                languages={LANGUAGES}
                activeLanguage={language}
                class="u-margin-left--auto"
              />
            )}
          </header>
        )}
        <main class={{ 'layout--embedded': isEmbedded }}>
          <stencil-router>
            <stencil-route-switch scrollTopOffset={0.1}>
              <stencil-route url="/" component="ia-start" exact />
              <stencil-route
                url={ROUTES.QUESTIONNAIRE}
                component="ia-questionnaire"
              />
              <stencil-route url={ROUTES.SUMMARY} component="ia-summary" />
              <stencil-route url={ROUTES.IMPRINT} component="ia-imprint" />
              <stencil-route url={ROUTES.LEGAL} component="ia-legal" />
              <stencil-route url={ROUTES.DISCLAIMER} component="ia-disclaimer" />
              <stencil-route url={ROUTES.FAQ} component="ia-faq" />
              <stencil-route url={ROUTES.DATA_PRIVACY} component="ia-data-privacy" />
              <stencil-route url={ROUTES.EXPORT} component="ia-export" />
              <stencil-route
                url={ROUTES.RECOMMENDATIONS}
                component="ia-recommendation"
              />
              <stencil-route url={ROUTES.ANSWERS} component="ia-answers-overview" />
              <stencil-route component="ia-start" />
            </stencil-route-switch>
          </stencil-router>
        </main>
        {!isEmbedded && (
          <footer class="c-footer">
            <ul class="u-list-reset">
              <li>
                <stencil-route-link
                  anchorClass="o-link o-link--gray"
                  url={ROUTES.IMPRINT}
                >
                  {i18next.t('app_root_imprint_link')}
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link
                  anchorClass="o-link o-link--gray"
                  url={ROUTES.LEGAL}
                >
                  {i18next.t('app_root_legal_link')}
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link
                  anchorClass="o-link o-link--gray"
                  url={ROUTES.FAQ}
                >
                  {i18next.t('app_root_faq_link')}
                </stencil-route-link>
              </li>
              <li>
                <stencil-route-link
                  anchorClass="o-link o-link--gray"
                  url={ROUTES.DATA_PRIVACY}
                >
                  {i18next.t('app_root_data_privacy_link')}
                </stencil-route-link>
              </li>
            </ul>
            <p>
              © {new Date().getFullYear()}{' '}
              {i18next.t('app_root_all_rights_reserved')}
            </p>
          </footer>
        )}
      </connect-translations>
    );
  }
}
injectHistory(AppRoot);
