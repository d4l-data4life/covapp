import { Component, h, Listen, Prop, State } from '@stencil/core';
import { qrcode, svg2url } from 'pure-svg-code';
import {
  PANDEMIC_TRACKING_URL,
  PANDEMIC_TRACKING_IS_ENABLED,
} from '../../global/custom';
import { LOCAL_STORAGE_KEYS, QUESTIONNAIRE_VERSION } from '../../global/constants';
import {
  CheckboxOption,
  NO_XML,
  QUESTIONS,
  XML_ORDER,
  QUESTION,
} from '../../global/questions';
import i18next from '../../global/utils/i18n';
import { getQuestionIndexById } from '../views/questionnaire/utils';
import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';
import { Answers } from '../views/questionnaire/questionnaire';

export type KeyValue = { key: string; value: string };

@Component({
  styleUrl: 'qr-code.css',
  tag: 'ia-qr-code',
})
export class QRCode {
  @Prop() answers: any = {};
  @Prop() resultCase: number = 5;
  @State() language: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  generateXML = (answers): string => {
    let xml = `<PATIENT><V0>${QUESTIONNAIRE_VERSION}</V0>`;
    let xmlPairs = this.generateXMLValues(answers);
    xmlPairs.sort(this.XMLSort);
    for (const pair of xmlPairs) {
      xml += `<${pair.key}>${pair.value}</${pair.key}>`;
    }
    xml += '</PATIENT>';
    return xml;
  };

  generateXMLValues = (answers): KeyValue[] => {
    let pairs = [];
    for (const key in answers) {
      if (key === QUESTION.POSTAL_CODE) {
        break;
      }
      if (key.startsWith(NO_XML)) {
        const question = QUESTIONS[getQuestionIndexById(key)];
        if (question.inputType === 'checkbox') {
          for (const index in question.options) {
            const option = (question.options as CheckboxOption[])[index];
            const xmlValue = answers[key].indexOf(index) > -1 ? '1' : '2';
            pairs.push({ key: option.id, value: xmlValue });
          }
        }
      } else {
        if (answers[key].indexOf('.') > -1) {
          pairs.push({ key, value: answers[key].replace(/\./g, '') });
        } else {
          pairs.push({ key, value: parseInt(answers[key], 10) + 1 });
        }
      }
    }
    return pairs;
  };

  XMLSort = (a: KeyValue, b: KeyValue): number => {
    let a_prefix = XML_ORDER.indexOf(a.key[0]);
    let b_prefix = XML_ORDER.indexOf(b.key[0]);
    if (a_prefix !== b_prefix) {
      return a_prefix - b_prefix;
    }

    let a_suffix = a.key[1];
    let b_suffix = b.key[1];
    if (a_suffix !== b_suffix) {
      return a_suffix < b_suffix ? -1 : 1;
    }

    return 0;
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

  generateDonationXML = (answers: Answers) => {
    const postalCode = `<V1>${answers[QUESTION.POSTAL_CODE]}</V1>`;
    const resultCase = `<V2>${this.resultCase}</V2>`;
    return `<PATIENT>${postalCode}${resultCase}</PATIENT>`;
  };

  sendXMLData = async () => {
    const xml = this.generateXML(this.answers);
    const payload = {
      XML: xml,
    };
    const encodedString = btoa(JSON.stringify(payload));
    fetch(PANDEMIC_TRACKING_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({ data: encodedString }),
    })
      .then(response => {
        if (response.ok) {
          localStorage.setItem(LOCAL_STORAGE_KEYS.DATA_SENT, 'true');
          trackEvent([...TRACKING_EVENTS.DATA_DONATION_SENT, '1']);
        } else {
          trackEvent([...TRACKING_EVENTS.DATA_DONATION_SENT, '0']);
        }
      })
      .catch(error => {
        console.log(`Error donatiing data: ${JSON.stringify(error)}`);
      });
  };

  componentWillLoad = () => {
    const dataSent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.DATA_SENT));
    if (
      PANDEMIC_TRACKING_IS_ENABLED &&
      !dataSent &&
      this.answers[QUESTION.DATA_DONATION] === '0'
    ) {
      this.sendXMLData();
    }
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
