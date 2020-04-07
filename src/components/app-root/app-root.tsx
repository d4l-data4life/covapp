import { Component, State, Listen, h } from '@stencil/core';
import i18next, { initialLanguage, LANGUAGES } from '../../global/utils/i18n';

import { ROUTES, IS_DEV } from '../../global/constants';
import { IS_CHARITE } from '../../global/layouts';
import { TRACKING_IS_ENABLED } from '../../global/custom';
import settings from '../../global/utils/settings';

import { Language } from '@d4l/web-components-library/dist/types/components/LanguageSwitcher/language-switcher';

const dnt = navigator.doNotTrack === '1';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
})
export class AppRoot {
  private connectTranslationsEl: HTMLConnectTranslationsElement;
  @State() language: Language;
  @State() appMessage: any = null;
  @State() showLogoHeader: boolean = false;
  @State() hasMadeCookieChoice: boolean;

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

  @Listen('newAppMessage', { target: 'document', passive: true })
  handleAppMessage(event: CustomEvent) {
    this.appMessage = null;

    setTimeout(() => {
      this.appMessage = {
        type: event.detail.type,
        text: event.detail.text,
      };
    }, 0);
  }

  @Listen('showLogoHeader')
  showLogoHeaderListener(event: CustomEvent) {
    this.showLogoHeader = event.detail.show;
  }

  saveSettings = ({ acceptCookies, acceptTracking }) => {
    settings.acceptsCookies = acceptCookies;
    settings.acceptsTracking = acceptCookies && acceptTracking;

    this.hasMadeCookieChoice = true;

    this.trackConsentIfGiven();
  };

  trackConsentIfGiven() {
    if (settings.acceptsTracking) {
      // @ts-ignore
      window._paq.push(['setConsentGiven']);
    }
  }

  async componentWillLoad() {
    this.language = this.getLanguageByCode(await initialLanguage);
    this.hasMadeCookieChoice = IS_DEV || settings.hasMadeCookieChoice;
  }

  componentDidLoad() {
    this.connectTranslationsEl.changedLanguageHandler(this.language);
    this.trackConsentIfGiven();
  }

  render() {
    const {
      language,
      appMessage,
      showLogoHeader,
      saveSettings,
      hasMadeCookieChoice,
    } = this;

    return (
      <connect-translations ref={el => (this.connectTranslationsEl = el)}>
        <div
          class={`app-message ease-in-top ${
            appMessage ? 'ease-in-top--active' : ''
          }`}
        >
          {appMessage && (
            <d4l-snack-bar
              type={appMessage.type}
              data-test="snackBar"
              data-test-context={appMessage.type}
            >
              <div slot="snack-bar-icon">
                <d4l-icon-info classes="icon--small" />
              </div>
              <div class="app-message__content" slot="snack-bar-content">
                {appMessage.text}
              </div>
              <div class="app-message__controls" slot="snack-bar-controls">
                <d4l-button
                  data-test="snackBarClose"
                  classes="button--text button--uppercase"
                  text="Dismiss"
                  handleClick={() => (this.appMessage = null)}
                />
              </div>
            </d4l-snack-bar>
          )}
        </div>

        {TRACKING_IS_ENABLED && !hasMadeCookieChoice && !dnt && (
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
        {showLogoHeader && !IS_CHARITE && (
          <ia-logo-component classes="logo-component--collaboration" />
        )}
        <header class="c-header">
          {showLogoHeader && IS_CHARITE && (
            <div class="app__logo-container">
              <ia-logo-charite />
              <ia-logo-d4l />
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
          <d4l-language-switcher
            languages={LANGUAGES}
            activeLanguage={language}
            class="u-margin-left--auto"
          />
        </header>
        <main>
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
              <stencil-route component="ia-start" />
            </stencil-route-switch>
          </stencil-router>
        </main>
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
              <stencil-route-link anchorClass="o-link o-link--gray" url={ROUTES.FAQ}>
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
            © {new Date().getFullYear()} {i18next.t('app_root_all_rights_reserved')}
          </p>
        </footer>
      </connect-translations>
    );
  }
}
