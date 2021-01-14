import i18next from '../../global/utils/i18n';

import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { Question } from '../../global/questions';
import isDevice from '../../global/utils/isDevice';

// TODO: https://github.com/gesundheitscloud/infection-risk-assessment/pull/76
// This is only a temporary fix. This should be moved/handled differently

@Component({
  tag: 'ia-input-date',
})
export class InputDate {
  @Prop() question: Question;

  @State() language?: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  async changedLanguageHandler(event: CustomEvent) {
    const { detail: language } = event;
    this.language = language;
  }

  @Event() updateFormData: EventEmitter;
  updateFormDataHandler(key: string, value: string) {
    this.updateFormData.emit({ key, value });
  }
  render() {
    const onInputChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const value = target.value.replace(/-/g, '.');
      this.updateFormDataHandler(this.question.id, value);
    };

    return localStorage.getItem('supportsDateElement') === 'true' ? (
      <div>
        <d4l-input
          name={this.question.id}
          type="date"
          label={i18next.t('input_date_label')}
          onInput={(event: Event) => onInputChange(event)}
          required={true}
          min={'2019-01-01'}
          max={`${new Date().getFullYear()}-${String(
            new Date().getMonth() + 1
          ).padStart(2, '0')}-${String(new Date().getDate()).padStart(2, '0')}`}
        />
        {isDevice.ios && (
          <div class="input-date__help">{i18next.t('input_date_help_info')}</div>
        )}
      </div>
    ) : (
      <div>
        <d4l-date-input
          data-test="questionnaireDateInputs"
          label={i18next.t('input_date_label')}
          errorMessage={i18next.t('input_date_error')}
          fields={{
            day: {
              label: `${i18next.t('input_date_label_day')}`,
              placeholder: `${i18next.t('input_date_placeholder_day')}`,
            },
            month: {
              label: `${i18next.t('input_date_label_month')}`,
              placeholder: `${i18next.t('input_date_placeholder_month')}`,
            },
            year: {
              label: `${i18next.t('input_date_label_year')}`,
              placeholder: `${i18next.t('input_date_placeholder_year')}`,
            },
          }}
          futureAllowed={false}
        />
        <div class="input-date__help">{i18next.t('input_date_help')}</div>
      </div>
    );
  }
}
