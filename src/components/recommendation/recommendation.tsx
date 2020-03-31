import { Component, h, State, Listen, Prop } from '@stencil/core';
import i18next from '../../global/utils/i18n';

@Component({
  styleUrl: 'recommendation.css',
  tag: 'ia-recommendation',
})
export class Recommendation {
  @Prop() resultCase: number = 5;
  @State() language: string;
  @State() expandedCaseOneInfo: boolean = false;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  get currentLanguage() {
    return this.language || 'en';
  }

  getClasses = () =>
    this.expandedCaseOneInfo ? 'recommendation-case-one--expanded' : '';

  render() {
    const { resultCase, getClasses } = this;

    return (
      <div class="recommendation">
        <h3 class="recommendation__headline">
          {i18next.t(`recommendation_case_${resultCase}_headline`)}
        </h3>
        <div innerHTML={i18next.t(`recommendation_case_${resultCase}_text`)}></div>
        {resultCase === 1 && (
          <div class="u-padding-top--normal">
            <d4l-button
              type="button"
              classes="button--block"
              text={i18next.t(
                this.expandedCaseOneInfo
                  ? 'recommendation_case_1_hide_info'
                  : 'recommendation_case_1_show_info'
              )}
              handleClick={() =>
                (this.expandedCaseOneInfo = !this.expandedCaseOneInfo)
              }
            />
            <div
              class={`recommendation-case-one ${getClasses()}`}
              innerHTML={i18next.t('recommendation_case_1_additonal_info')}
            ></div>
          </div>
        )}
      </div>
    );
  }
}
