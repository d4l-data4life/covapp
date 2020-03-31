import { Component, h, Listen, Prop, State } from '@stencil/core';
import { qrcode, svg2url } from 'pure-svg-code';
import i18next from '../../global/utils/i18n';
import { QUESTIONNAIRE_VERSION } from '../../global/constants';

@Component({
  styleUrl: 'qr-code.css',
  tag: 'ia-qr-code',
})
export class QRCode {
  @Prop() answers: any = {};
  @State() language: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  generateXML = (answers): string => {
    let xml = '<PATIENT>';
    xml += `<V0>${QUESTIONNAIRE_VERSION}</V0>`;
    for (const key in answers) {
      if (answers[key].includes('.')) {
        xml += `<${key}>${answers[key].replace(/\./g, '')}</${key}>`;
      } else {
        xml += `<${key}>${parseInt(answers[key], 10) + 1}</${key}>`;
      }
    }
    xml += '</PATIENT>';
    return xml;
  };

  generateCode = (): string => {
    const svgString = qrcode({
      content: this.generateXML(this.answers),
      padding: 0,
      width: 540,
      height: 540,
      color: '#000000',
      background: '#ffffff',
      ecl: 'H',
    });

    return svg2url(svgString);
  };

  render() {
    const { generateCode } = this;

    return (
      <div class="qr-code">
        <h3>{i18next.t('qr_code_headline')}</h3>
        <p>{i18next.t('qr_code_paragraph')}</p>
        <div class="qr-code__img-code u-text-align--center">
          <img
            src={generateCode()}
            alt="QR code generated based on the provided answers"
          />
        </div>
      </div>
    );
  }
}
