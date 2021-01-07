import { FunctionalComponent, h } from '@stencil/core';
import i18next from '../../../../global/utils/i18n';

interface RiskSpreadingProps {
  livingSituation: number; // 0 - alone, 1 - together
  workspace: number; // 0 - medical
  caringForRelatives: boolean;
}

export const RiskSpreading: FunctionalComponent<RiskSpreadingProps> = ({
  livingSituation,
  workspace,
  caringForRelatives,
}) => (
  <ia-accordion headline={i18next.t('risk_spreading_headline')}>
    <div slot="accordion-children">
      {!livingSituation && (
        <div data-test="riskLivingAlone">
          <h4>{i18next.t('risk_spreading_living_alone_headline')}</h4>
          <div innerHTML={i18next.t('risk_spreading_living_alone')} />
        </div>
      )}
      {livingSituation === 1 && (
        <div data-test="riskLivingTogether">
          <h4>{i18next.t('risk_spreading_living_together_headline')}</h4>
          <div innerHTML={i18next.t('risk_spreading_living_together')} />
        </div>
      )}
      {!workspace && (
        <div data-test="riskMedicalWorkspace">
          <h4>{i18next.t('risk_spreading_workspace_medical_headline')}</h4>
          <div innerHTML={i18next.t('risk_spreading_workspace_medical')} />
        </div>
      )}
      {caringForRelatives && (
        <div data-test="riskCaringForRelatives">
          <h4>{i18next.t('risk_spreading_caring_for_relatives_headline')}</h4>
          <div innerHTML={i18next.t('risk_spreading_caring_for_relatives')} />
        </div>
      )}
      <div data-test="riskGeneralNotes">
        <h4>{i18next.t('risk_spreading_paragraphs_headline')}</h4>
        <div innerHTML={i18next.t('risk_spreading_paragraphs')} />
      </div>
    </div>
  </ia-accordion>
);
