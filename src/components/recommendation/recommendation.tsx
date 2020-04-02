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
        {resultCase === 1 && (
          <div class="u-padding-top--normal">
            <d4l-accordion
              open={false}
              headerBackgroundColor={getRootCSSPropertyValue('--c-gray')}
              classes="accordion--no-panel-border accordion--no-panel-padding"
            >
              <p
                class="o-accordion-headline u-text-align--left"
                slot="accordion-header"
              >
                {i18next.t('recommendation_case_1_testing_sites_info')}
              </p>
              <div
                class="u-padding-vertical--normal"
                slot="accordion-panel"
                innerHTML={i18next.t('recommendation_case_1_additonal_info')}
              ></div>
            </d4l-accordion>
          </div>
        )}
      </div>
    );
  }
}
