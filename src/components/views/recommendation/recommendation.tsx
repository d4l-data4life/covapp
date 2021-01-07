import { Component, h, State, Listen } from '@stencil/core';
import i18next from '../../../global/utils/i18n';
import { getRootCSSPropertyValue } from '../../../global/utils/css-properties';
import { IS_COLLABORATION } from '../../../global/layouts';

@Component({
  styleUrl: 'recommendation.css',
  tag: 'ia-recommendation',
})
export class Recommendation {
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

  render() {
    return (
      <div class="c-card-wrapper recommendations">
        <d4l-card classes="card--desktop">
          <div class="recommendations__content" slot="card-content">
            <h2>{i18next.t(`recommendation_headline`)}</h2>
            <div slot="card-content">
              <div class="u-padding-top--normal">
                <d4l-accordion
                  open
                  headerBackgroundColor={getRootCSSPropertyValue('--c-gray')}
                  buttonProps={{
                    'data-test': 'toggleInformationHotline',
                  }}
                >
                  <p
                    class="o-accordion-headline u-text-align--left"
                    slot="accordion-header"
                  >
                    {i18next.t('recommendation_information_hotlines_headline')}
                  </p>
                  <div
                    class="u-padding-vertical--normal accordion__content"
                    slot="accordion-panel"
                    innerHTML={i18next.t(
                      'recommendation_information_hotlines_content'
                    )}
                  ></div>
                </d4l-accordion>
              </div>
            </div>
            <div slot="card-content">
              {!IS_COLLABORATION && (
                <div class="u-padding-top--normal">
                  <d4l-accordion
                    open
                    headerBackgroundColor={getRootCSSPropertyValue('--c-gray')}
                    buttonProps={{
                      'data-test': 'toggleTelemedicine',
                    }}
                  >
                    <p
                      class="o-accordion-headline u-text-align--left"
                      slot="accordion-header"
                    >
                      {i18next.t('recommendation_telemedicine_headline')}
                    </p>
                    <div
                      class="u-padding-vertical--normal accordion__content"
                      slot="accordion-panel"
                      innerHTML={i18next.t('recommendation_telemedicine_content')}
                    ></div>
                  </d4l-accordion>
                </div>
              )}
            </div>
          </div>
        </d4l-card>
      </div>
    );
  }
}
