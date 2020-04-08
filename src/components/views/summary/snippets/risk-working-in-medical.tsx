import { FunctionalComponent, h } from '@stencil/core';
import i18next from '../../../../global/utils/i18n';

export const RiskWorkingInMedical: FunctionalComponent = () => (
  <div class="summary__risk-working-in-medical">
    <d4l-alert type="error">
      <div
        innerHTML={i18next.t('risk_medical_workspace')}
        data-test="riskMedicalFieldRespiratorySymptom"
      />
    </d4l-alert>
  </div>
);
