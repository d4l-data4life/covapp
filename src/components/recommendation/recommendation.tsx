import { Component, h, State, Listen, Prop } from '@stencil/core';
import i18next from '../../global/utils/i18n';
import { getRootCSSPropertyValue } from '../../global/utils/css-properties';

@Component({
  styleUrl: 'recommendation.css',
  tag: 'ia-recommendation',
})
export class Recommendation {
  @Prop() resultCase: number = 5;
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
    const { resultCase } = this;

    return (
      <div class="recommendation">
        <h3 class="recommendation__headline">
          {i18next.t(`recommendation_case_${resultCase}_headline`)}
        </h3>
        <div innerHTML={i18next.t(`recommendation_case_${resultCase}_text`)}></div>

        <div class="u-padding-top--normal">
          <d4l-accordion
            open={false}
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
              innerHTML={i18next.t('recommendation_information_hotlines_content')}
            ></div>
          </d4l-accordion>
        </div>

        <div class="u-padding-top--normal">
          <d4l-accordion
            open={false}
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
      </div>
    );
  }
}
