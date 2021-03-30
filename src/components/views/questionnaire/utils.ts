// TODO: Use built in i18n Functions to translate
export const QUESTION_SHARE_DATA = {
  options: [
    {
      scores: {},
      text: 'Yes, I would like to donate my postal code and my recommended action',
      value: 'yes',
    },
    {
      scores: {},
      value: 'no',
      text:
        'No, I do not want to transfer my data and I only want to see my recommended action',
    },
  ],
  id: 'covapp_data_donation',
  text: 'Consent to the transmission of your postal code and recommended action',
  type: 'select',
  details:
    'In order to draw valuable conclusions about the further expansion of the COVID-19 pandemic, we ask for your consent to transmit your postal code and your recommendation to Charité – Universitätsmedizin Berlin. The data will be stored in an anonymous form (postal code and recommendation) and if necessary, the data will be shared with third parties as part of the fight against pandemics. You can revoke your consent at any time. The revocation does not affect the lawfulness of processing based on consent before the revocation.\nIf you would like to give your consent to the transmission of the postal code and the recommendation of your recommended action, choose “Yes” below. You will then be asked for your postal code in the next step.  To continue without submitting your data, choose “No” below. You will then be forwarded directly to your summary.  You can find more information in the <a href="/data-privacy">privacy policy</a>.',
};
export const QUESTION_SHARE_DATA_PLZ = {
  id: 'covapp_plz',
  text: 'Ihre Postleitzahl',
  type: 'text',
  enableWhenExpression: {
    var: `${QUESTION_SHARE_DATA.id}.option.yes`,
  },
};
