import i18next from '../../global/utils/i18n';

import { FunctionalComponent, h } from '@stencil/core';

// TODO: https://github.com/gesundheitscloud/infection-risk-assessment/pull/76
// This is only a temporary fix. This should be moved/handled differently
export const DateInput: FunctionalComponent = () => (
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
