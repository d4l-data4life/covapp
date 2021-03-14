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
import isDevice from '../../global/utils/isDevice';

// TODO: https://github.com/gesundheitscloud/infection-risk-assessment/pull/76
// This is only a temporary fix. This should be moved/handled differently

@Component({
  tag: 'ia-input-date',
})
export class InputDate {
  @Prop() inputId: string;
  @Prop() value: Date;
  @State() language?: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  async changedLanguageHandler(event: CustomEvent) {
    const { detail: language } = event;
    this.language = language;
  }

  @Event() updateFormData: EventEmitter;
  updateFormDataHandler(key: string, value: number) {
    this.updateFormData.emit({ key, value });
  }
  render() {
    const onInputChange = (date: string) => {
      this.updateFormDataHandler(this.inputId, Date.parse(date));
    };

    return localStorage.getItem('supportsDateElement') === 'true' ? (
      <div>
        <d4l-input
          name={this.inputId}
          type="date"
          value={this.value ? dateToDateString(this.value) : undefined}
          label={i18next.t('input_date_label')}
          onInput={(event: Event) =>
            onInputChange((event.target as HTMLInputElement).value as string)
          }
          required={true}
          min={'2019-01-01'}
          max={dateToDateString(new Date())}
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
          handleChange={(date: string) => onInputChange(date)}
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

function dateToDateString(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0'
  )}-${String(date.getDate()).padStart(2, '0')}`;
}
