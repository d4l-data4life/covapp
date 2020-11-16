import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  State,
  Prop,
} from '@stencil/core';
import { ROUTES, MOBILE_ORIGINS } from '../../../global/constants';
import { IS_CHARITE, IS_CUSTOM } from '../../../global/layouts';
import { RouterHistory } from '@stencil/router';
import i18next from '../../../global/utils/i18n';
import { getRootCSSPropertyValue } from '../../../global/utils/css-properties';
import { trackEvent, TRACKING_EVENTS } from '../../../global/utils/track';
import version from '../../../global/utils/version';
import { WHITELISTED_DATA4LIFE_ORIGINS } from '../../../global/custom';
import settings, { SOURCE } from '../../../global/utils/settings';

const NEXT_ROUTE = {
  DEFAULT: {
    buttonKey: 'button_start_now',
    route: ROUTES.DISCLAIMER,
  },
  STARTED: {
    buttonKey: 'button_continue',
    route: ROUTES.QUESTIONNAIRE,
  },
  COMPLETED: {
    buttonKey: 'button_show_code',
    route: ROUTES.SUMMARY,
  },
};

@Component({
  styleUrl: 'start.css',
  tag: 'ia-start',
})
export class Start {
  @Prop() history: RouterHistory;

  @State() language: string;
  @State() started: boolean = false;
  @State() completed: boolean = false;
  @Event() showLogoHeader: EventEmitter;
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
    this.showLogoHeader.emit({ show: true });
    if (!version.match()) {
      version.reset();
    }
    this.completed = settings.completed;
    this.started = settings.started;

    const { query = {} } = this.history.location;
    const source = query.source && decodeURI(query.source);
    const isWhitelistedOrigin = WHITELISTED_DATA4LIFE_ORIGINS.includes(source);
    const isMobileOrigin = !!MOBILE_ORIGINS[source];
    if (isWhitelistedOrigin || isMobileOrigin) {
      settings.source = source;
    } else {
      settings.remove(SOURCE);
    }
  };

  get getState() {
    return this.completed ? 'COMPLETED' : this.started ? 'STARTED' : 'DEFAULT';
  }

  deleteQRCode = () => {
    version.reset();
    this.completed = false;
    this.started = false;
  };

  trackAccordionToggle(index: number, expanded: boolean) {
    trackEvent([
      ...(expanded
        ? TRACKING_EVENTS.LANDING_PAGE_ACCORDION_EXPAND
        : TRACKING_EVENTS.LANDING_PAGE_ACCORDION_COLLAPSE),
      `Accordion ${index}`,
    ]);
  }

  render() {
    const BLOCKS_COUNT = 5;

    return (
      <div class="c-card-wrapper start">
        <d4l-card classes="card--desktop card--text-center">
          <div slot="card-header">
            <h1 class="start__headline-1">CovApp</h1>
            <h2 class="start__headline-2">{i18next.t('start_headline')}</h2>
          </div>
          <div class="start__content u-text-align--left" slot="card-content">
            <ul class="u-no-margin-top u-padding-bottom--normal">
              <li>{i18next.t('start_paragraph_1_option_1')}</li>
              <li>{i18next.t('start_paragraph_1_option_2')}</li>
              <li>{i18next.t('start_paragraph_1_option_3')}</li>
              <li>{i18next.t('start_paragraph_1_option_4')}</li>
            </ul>
            {this.completed && <h3>{i18next.t('found_code')}</h3>}
            <stencil-route-link
              anchor-id="d4l-button-register"
              anchor-class="start__next-link"
              url={NEXT_ROUTE[this.getState].route}
              onClick={() => {
                switch (this.getState) {
                  case 'COMPLETED':
                    trackEvent(TRACKING_EVENTS.SUMMARY_SHOW);
                    break;
                  case 'STARTED':
                    trackEvent(TRACKING_EVENTS.RESUME);
                    break;
                  default:
                    trackEvent(TRACKING_EVENTS.START);
                }
              }}
            >
              <d4l-button
                classes="button--block"
                data-test="continueButton"
                text={i18next.t(NEXT_ROUTE[this.getState].buttonKey)}
                is-route-link
              />
            </stencil-route-link>
            {this.completed && (
              <d4l-button
                classes="button--block button--tertiary"
                data-test="resetButton"
                text={i18next.t('button_delete_qr_code')}
                onClick={() => {
                  this.deleteQRCode();
                  trackEvent(TRACKING_EVENTS.SUMMARY_DELETE);
                }}
              />
            )}
            <div
              class="start__legal-note u-padding-vertical--normal u-text-align--center"
              innerHTML={i18next.t('start_legal_paragraph')}
            ></div>
            {!IS_CHARITE && (
              <div class="u-text-align--center">
                <ia-logo-d4l-powered-by />
              </div>
            )}
          </div>
        </d4l-card>

        {!IS_CUSTOM && <ia-logo-component />}

        <div class="u-padding-vertical--extra-small">
          {new Array(BLOCKS_COUNT).fill(null).map((_, index) => {
            const infotext = i18next.t(`start_block_${index + 1}_infotext`);
            const isWidgets = infotext === '{openSourceWidgets}';

            return (
              <div class="u-padding-top--extra-small" key={index}>
                <d4l-accordion
                  classes="start__accordion"
                  open={false}
                  headerBackgroundColor={getRootCSSPropertyValue('--c-gray')}
                  buttonProps={{
                    'data-test': `toggleBlock${index + 1}`,
                  }}
                  handleToggle={expanded =>
                    this.trackAccordionToggle(index + 1, expanded)
                  }
                >
                  <h3
                    class="o-accordion-headline u-padding-horizontal--extra-small u-text-align--left"
                    slot="accordion-header"
                  >
                    {i18next.t(`start_block_${index + 1}_headline`)}
                  </h3>
                  <div
                    class="u-padding-vertical--normal u-padding-horizontal--extra-small"
                    slot="accordion-panel"
                  >
                    {isWidgets ? (
                      <div>
                        <ia-call-to-action type="OPEN_SOURCE" showCard={false} />
                        <ia-call-to-action type="WIDGET" showCard={false} />
                      </div>
                    ) : (
                      <div innerHTML={infotext} />
                    )}
                  </div>
                </d4l-accordion>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
