import { FunctionalComponent, h } from '@stencil/core';
import i18next from '../../../../global/utils/i18n';

interface RiskVeryIllProps {
  ageAboveSixtyFive: boolean;
}

export const RiskVeryIll: FunctionalComponent<RiskVeryIllProps> = ({
  ageAboveSixtyFive,
}) => (
  <div class="summary__risk-very-ill">
    <d4l-alert type="error">
      {!ageAboveSixtyFive && (
        <div
          innerHTML={i18next.t('risk_very_ill_below_sixty_five')}
          data-test="riskBelow65"
        />
      )}
      {ageAboveSixtyFive && (
        <div
          innerHTML={i18next.t('risk_very_ill_above_sixty_five')}
          data-test="riskAbove65"
        />
      )}
    </d4l-alert>
  </div>
);
