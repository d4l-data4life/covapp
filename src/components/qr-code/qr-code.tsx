import { Component, h, Listen, Prop, State } from '@stencil/core';
import { qrcode, svg2url } from 'pure-svg-code';
import {
  PANDEMIC_TRACKING_URL,
  PANDEMIC_TRACKING_IS_ENABLED,
} from '../../global/custom';
import { LOCAL_STORAGE_KEYS } from '../../global/constants';
import { getQuestionnaire, XML_ORDER } from '../../global/questions';
import i18next from '../../global/utils/i18n';
import { trackEvent, TRACKING_EVENTS } from '../../global/utils/track';

import { RouterHistory } from '@stencil/router';
import { QUESTION_SHARE_DATA } from '../views/questionnaire/utils';
import { QuestionnaireEngine } from '@covopen/covquestions-js';
export type KeyValue = { key: string; value: string | number };

@Component({
  styleUrl: 'qr-code.css',
  tag: 'ia-qr-code',
})
export class QRCode {
  @Prop() history: RouterHistory;
  @Prop() answers: any = {};
  @State() qr_values: { [id: string]: string };
  @State() language: string;

  @Listen('changedLanguage', {
    target: 'window',
  })
  changedLanguageHandler(event: CustomEvent) {
    this.language = event.detail.code;
  }

  generateXML = (qr_values: { [id: string]: string }): string => {
    let xml = `<PATIENT>`;
    let valuePairs = Object.keys(this.qr_values).reduce((accumulator, key) => {
      accumulator.push({
        key: key,
        value: qr_values[key],
      });
      return accumulator;
    }, [] as KeyValue[]);
    valuePairs.sort(this.XMLSort);
    for (const pair of valuePairs) {
      xml += `<${pair.key}>${pair.value}</${pair.key}>`;
    }
    xml += '</PATIENT>';
    return xml;
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
      content: this.generateXML(this.qr_values),
      padding: 0,
      width: 540,
      height: 540,
      color: '#000000',
      background: '#ffffff',
      ecl: 'H',
    });

    return svg2url(svgString);
  };

  sendData = async () => {
    fetch(PANDEMIC_TRACKING_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrer: 'no-referrer',
      body: JSON.stringify({
        answers: this.answers,
      }),
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
        console.log(error);
      });
  };

  componentWillLoad = () => {
    const dataSent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.DATA_SENT));
    if (
      PANDEMIC_TRACKING_IS_ENABLED &&
      !dataSent &&
      this.answers[QUESTION_SHARE_DATA.id] === 'yes'
    ) {
      this.sendData();
    }
    getQuestionnaire().then(questionnaire => {
      const engine = new QuestionnaireEngine(questionnaire);
      // TODO:https://github.com/CovOpen/CovQuestions/issues/148
      engine.setAnswersPersistence({
        answers: Object.keys(this.answers).reduce((accumulator, key) => {
          accumulator.push({
            questionId: key,
            rawAnswer: this.answers[key],
          });
          return accumulator;
        }, []),
        version: 2,
        timeOfExecution: 23,
      });
      this.qr_values = engine
        .getResults()
        .exports.filter(x => x.id == 'covapp_qr')[0].mapping;
    });
  };

  render() {
    const { generateCode, answers, qr_values } = this;
    const canPrint = window && typeof window.print === 'function';

    return (
      <div class="qr-code">
        <h2>{i18next.t('answers_table_headline')}</h2>
        {canPrint && (
          <d4l-button
            type="button"
            classes="button--block answers-table__button"
            data-test="printButton"
            text={i18next.t('answers_table_print')}
            handleClick={() => {
              trackEvent(TRACKING_EVENTS.SUMMARY_PRINT);
              window.print();
            }}
          />
        )}
        <p innerHTML={i18next.t('qr_code_paragraph')} />
        <div class="qr-code__img-code u-text-align--center">
          {qr_values ? (
            <img
              src={generateCode()}
              alt="QR code generated based on the provided answers"
            />
          ) : null}
        </div>
        <ia-answers-table answers={answers} />
      </div>
    );
  }
}
