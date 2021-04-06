import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { getStorageString } from '../../global/utils/date';
import { KeyValue, QRCode } from './qr-code';

describe('qr-code', () => {
  let qrCode: QRCode;
  beforeEach(async () => {
    jest.clearAllMocks();
    let page = await newSpecPage({
      components: [QRCode],
      template: () => <ia-qr-code />,
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

    it('works sorted', () => {
      let answers: { [key: string]: string } = {
        M1: '2',
        V0: '300',
        C0: '1',
        P5: '2',
        P4: '3',
        P3: '1',
        P2: '2',
        P1: '1',
        P6: '2',
        CZ: '2021.03.31',
        S0: '2',
        S3: '1',
        S4: '2',
        S5: '2',
        S6: '2',
        S7: '2',
        S8: '1',
        S9: '2',
        SA: '2',
        SB: '2',
        D4: '1',
        SC: '2',
        SZ: '2021.03.31',
        D0: '2',
        D1: '2',
        D2: '2',
        D3: '1',
        D7: '66.66666666666667',
        M0: '2',
        M2: '2',
      };
      const expected = `<PATIENT><V0>300</V0><P1>1</P1><P2>2</P2><P3>1</P3><P4>3</P4><P5>2</P5><P6>2</P6><C0>1</C0><CZ>2021.03.31</CZ><S0>2</S0><S3>1</S3><S4>2</S4><S5>2</S5><S6>2</S6><S7>2</S7><S8>1</S8><S9>2</S9><SA>2</SA><SB>2</SB><SC>2</SC><SZ>2021.03.31</SZ><D0>2</D0><D1>2</D1><D2>2</D2><D3>1</D3><D4>1</D4><D7>66.66666666666667</D7><M0>2</M0><M1>2</M1><M2>2</M2></PATIENT>`;
      expect(qrCode.generateXML(answers)).toEqual(expected);
    });
  });

  describe('xml generation', () => {
    it('works', () => {
      let answers = { P1: '3' };
      expect(qrCode.generateXML(answers)).toEqual(`<PATIENT><P1>3</P1></PATIENT>`);
    });

    it('works fully', () => {
      let answers: { [key: string]: string } = {
        V0: '300',
        P1: '1',
        P2: '2',
        P3: '1',
        P4: '3',
        P5: '2',
        P6: '2',
        C0: '1',
        CZ: '2021.03.31',
        S0: '2',
        S3: '1',
        S4: '2',
        S5: '2',
        S6: '2',
        S7: '2',
        S8: '1',
        S9: '2',
        SA: '2',
        SB: '2',
        SC: '2',
        SZ: '2021.03.31',
        D0: '2',
        D1: '2',
        D2: '2',
        D3: '1',
        D4: '1',
        D7: '66.66666666666667',
        M0: '2',
        M1: '2',
        M2: '2',
      };
      const expected = `<PATIENT><V0>300</V0><P1>1</P1><P2>2</P2><P3>1</P3><P4>3</P4><P5>2</P5><P6>2</P6><C0>1</C0><CZ>2021.03.31</CZ><S0>2</S0><S3>1</S3><S4>2</S4><S5>2</S5><S6>2</S6><S7>2</S7><S8>1</S8><S9>2</S9><SA>2</SA><SB>2</SB><SC>2</SC><SZ>2021.03.31</SZ><D0>2</D0><D1>2</D1><D2>2</D2><D3>1</D3><D4>1</D4><D7>66.66666666666667</D7><M0>2</M0><M1>2</M1><M2>2</M2></PATIENT>`;
      expect(qrCode.generateXML(answers)).toEqual(expected);
    });

    it('ignore null values', () => {
      let answers: { [key: string]: string } = {
        V0: '300',
        P1: '1',
        P2: '2',
        P3: '1',
        P4: '3',
        P5: null,
      };
      const expected = `<PATIENT><V0>300</V0><P1>1</P1><P2>2</P2><P3>1</P3><P4>3</P4></PATIENT>`;
      expect(qrCode.generateXML(answers)).toEqual(expected);
    });

    // it('works for the "no" case', async () => {
    //   let answers = mockQuestionAnswers(false, '', '14482');
    //   const expected = `${XMLPrefix}<P1>2</P1><P2>2</P2><P3>2</P3><P4>4</P4><P5>2</P5><P6>2</P6><C0>2</C0><S0>2</S0><S3>2</S3><S4>2</S4><S5>2</S5><S6>2</S6><S7>2</S7><S8>2</S8><S9>2</S9><SA>2</SA><SB>2</SB><SC>2</SC><D0>2</D0><D1>2</D1><D2>2</D2><D4>2</D4><D5>150</D5><D6>150</D6><D7>67</D7><M0>2</M0><M1>2</M1><M2>2</M2>${XMLSuffix}`;
    //   expect(qrCode.generateXML(answers)).toEqual(expected);
    // });

    // it('works for the "yes" case', async () => {
    //   let answers = mockQuestionAnswers(
    //     true,
    //     getStorageString(new Date('2020-03-31')),
    //     '14482'
    //   );
    //   const expected = `${XMLPrefix}<P1>1</P1><P2>1</P2><P3>1</P3><P4>1</P4><P5>1</P5><P6>1</P6><C0>1</C0><CZ>20200331</CZ><S0>1</S0><S3>1</S3><S4>1</S4><S5>1</S5><S6>1</S6><S7>1</S7><S8>1</S8><S9>1</S9><SA>1</SA><SB>1</SB><SC>1</SC><SZ>20200331</SZ><D0>1</D0><D1>1</D1><D2>1</D2><D4>1</D4><D5>150</D5><D6>150</D6><D7>67</D7><M0>1</M0><M1>1</M1><M2>1</M2>${XMLSuffix}`;
    //   expect(qrCode.generateXML(answers)).toEqual(expected);
    // });
  });
});
