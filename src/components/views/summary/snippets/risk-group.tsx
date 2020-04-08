import { FunctionalComponent, h } from '@stencil/core';
import i18next from '../../../../global/utils/i18n';

export const RiskGroup: FunctionalComponent = () => (
  <div class="summary__risk-group">
    <d4l-alert type="error">
      <div innerHTML={i18next.t('risk_group')} data-test="riskGroup" />
    </d4l-alert>
  </div>
);
