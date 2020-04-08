import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { QUESTIONNAIRE_VERSION, LOCAL_STORAGE_KEYS } from '../../global/constants';
import { QUESTIONS } from '../../global/questions';
import { getStorageString } from '../../global/utils/date';
import {
  checkGoTo,
  checkGuard,
  updateScoreData,
} from '../views/questionnaire/utils';
import { QRCode, KeyValue } from './qr-code';

let XMLPrefix = `<PATIENT><V0>${QUESTIONNAIRE_VERSION}</V0>`;
const XMLSuffix = '</PATIENT>';

const mockQuestionAnswers = (
  alwaysYes: boolean,
  dateAnswer: string,
  postalAnswer: string
) => {
  let answer;
  let answers = {};
  let score = {};
  let i = 0;
  while (i < QUESTIONS.length) {
    const question = QUESTIONS[i];
    switch (question.inputType) {
      case 'radio':
        answer = alwaysYes ? '0' : '1';
        break;
      case 'date':
        answer = dateAnswer;
        break;
      case 'checkbox':
        let yesAnswer = (QUESTIONS[i].options as any[]).map((_option, index) =>
          index.toString()
        );
        answer = alwaysYes ? yesAnswer : [];
        break;
      case 'postal':
        answer = postalAnswer;
        break;
    }
    answers[QUESTIONS[i].id] = answer;
    score = updateScoreData(i, answers[QUESTIONS[i].id], score);
    i = checkGoTo(i, answers[QUESTIONS[i].id]);
    i = checkGuard(i, score, answers);
  }

  return answers;
};

describe('qr-code', () => {
  let qrCode: QRCode;
  beforeEach(async () => {
    jest.clearAllMocks();
    localStorage.setItem(LOCAL_STORAGE_KEYS.DATA_SENT, 'true');
    let page = await newSpecPage({
      components: [QRCode],
      template: () => <ia-qr-code resultCase={2} />,
    });
    qrCode = page.rootInstance;
  });
  it('builds', async () => {
    expect(qrCode).toBeTruthy();
  });

  describe('xml sort', () => {
    const P1 = { key: 'P1', value: '1' };
    const PA = { key: 'PA', value: '1' };
    const D0 = { key: 'D0', value: '1' };
    const D3 = { key: 'DA', value: '1' };
    const DZ = { key: 'DZ', value: '1' };

    it('sorts by Category', async () => {
      let unsorted: KeyValue[] = [D0, P1];
      let sorted: KeyValue[] = [P1, D0];
      expect(unsorted.sort(qrCode.XMLSort)).toEqual(sorted);
    });

    it('sorts by Number', async () => {
      let unsorted: KeyValue[] = [D3, D0];
      let sorted: KeyValue[] = [D0, D3];
      expect(unsorted.sort(qrCode.XMLSort)).toEqual(sorted);
    });

    it('works', async () => {
      let unsorted: KeyValue[] = [D3, P1, DZ, PA, D0];
      let sorted: KeyValue[] = [P1, PA, D0, D3, DZ];
      expect(unsorted.sort(qrCode.XMLSort)).toEqual(sorted);
    });
  });

  describe('xml generation', () => {
    it('works', async () => {
      let answers = { P0: '2' };
      expect(qrCode.generateXML(answers)).toEqual(
        `${XMLPrefix}<P0>3</P0>${XMLSuffix}`
      );
    });

    it('works for the "no" case', async () => {
      let answers = mockQuestionAnswers(false, '', '14482');
      const expected = `${XMLPrefix}<P0>2</P0><P2>2</P2><P3>2</P3><P4>2</P4><P5>2</P5><P6>2</P6><C0>2</C0><S0>2</S0><S1>2</S1><S3>2</S3><S4>2</S4><S5>2</S5><S6>2</S6><S7>2</S7><S8>2</S8><S9>2</S9><SA>2</SA><SB>2</SB><SC>2</SC><D0>2</D0><D1>2</D1><D2>2</D2><D3>2</D3><M0>2</M0><M1>2</M1><M2>2</M2>${XMLSuffix}`;
      expect(qrCode.generateXML(answers)).toEqual(expected);
    });

    it('works for the "yes" case', async () => {
      let answers = mockQuestionAnswers(
        true,
        getStorageString(new Date('2020-03-31')),
        '14482'
      );
      const expected = `${XMLPrefix}<P0>1</P0><P2>1</P2><P3>1</P3><P4>1</P4><P5>1</P5><P6>1</P6><C0>1</C0><CZ>20200331</CZ><S0>1</S0><S2>1</S2><S3>1</S3><S4>1</S4><S5>1</S5><S6>1</S6><S7>1</S7><S8>1</S8><S9>1</S9><SA>1</SA><SB>1</SB><SC>1</SC><SZ>20200331</SZ><D0>1</D0><D1>1</D1><D2>1</D2><D3>1</D3><M0>1</M0><M1>1</M1><M2>1</M2>${XMLSuffix}`;
      expect(qrCode.generateXML(answers)).toEqual(expected);
    });

    it('includes limited data for xml sending', async () => {
      let answers = mockQuestionAnswers(
        true,
        getStorageString(new Date('2020-03-31')),
        '14482'
      );
      const expected = `<PATIENT><V1>14482</V1><V2>2</V2></PATIENT>`;
      expect(qrCode.generateDonationXML(answers)).toEqual(expected);
    });
  });
});
