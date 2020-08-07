import { KeyValue } from '../../components/qr-code/utils';
import { LANGUAGE_RESOURCES } from '../custom';
import { createItem, groupByCategory, createItemCategory } from './response';
import { FHIRQuestionnaireItem } from './types';
import { getStorageString } from '../../global/utils/date';

describe('FhirResponse', () => {
  const P1 = { key: 'P1', value: '1' };
  const PA = { key: 'PA', value: '1' };
  const D0 = { key: 'D0', value: '1' };
  const D3 = { key: 'DA', value: '1' };
  const DZ = { key: 'DZ', value: '1' };
  const CZ = {
    key: 'CZ',
    value: getStorageString(new Date('2020-03-31')),
  };
  describe('groupByCategory', () => {
    it('works correctly', () => {
      const sorted: KeyValue[] = [P1, PA, D0, D3, DZ];
      const grouped: KeyValue[][] = [
        [P1, PA],
        [D0, D3, DZ],
      ];

      expect(groupByCategory(sorted)).toEqual(grouped);
    });

    it('works correctly with only one group', () => {
      const sorted: KeyValue[] = [P1, PA];
      const grouped: KeyValue[][] = [[P1, PA]];

      expect(groupByCategory(sorted)).toEqual(grouped);
    });

    it('works without any values', () => {
      const sorted: KeyValue[] = [];
      const grouped: KeyValue[][] = [];

      expect(groupByCategory(sorted)).toEqual(grouped);
    });
  });

  describe('createItem', () => {
    it('works for yes no unknown questions', () => {
      const expected: FHIRQuestionnaireItem = {
        linkId: 'D0',
        text: LANGUAGE_RESOURCES.de.translation.q_D0_text,
        answer: [
          {
            valueCoding: {
              system: 'http://loinc.org',
              code: 'LA32-8',
            },
          },
        ],
      };
      expect(createItem(D0, 'de')).toEqual(expected);
    });

    it('works for date questions', () => {
      const expected: FHIRQuestionnaireItem = {
        linkId: 'CZ',
        text: LANGUAGE_RESOURCES.de.translation.q_CZ_text,
        answer: [
          {
            valueDate: '2020-03-31',
          },
        ],
      };
      expect(createItem(CZ, 'de')).toEqual(expected);
    });

    it('works for age Valueset', () => {
      const question = {
        key: 'P0',
        value: '3',
      };
      const expected: FHIRQuestionnaireItem = {
        linkId: 'P0',
        text: LANGUAGE_RESOURCES.de.translation.q_P0_text,
        answer: [
          {
            valueCoding: {
              system: 'http://fhir.data4life.care/covid-19/r4/CodeSystem/age-group',
              code: '61-70',
            },
          },
        ],
      };
      expect(createItem(question, 'de')).toEqual(expected);
    });

    it('works for housing Valueset', () => {
      const question = {
        key: 'P2',
        value: '0',
      };
      const expected: FHIRQuestionnaireItem = {
        linkId: 'P2',
        text: LANGUAGE_RESOURCES.de.translation.q_P2_text,
        answer: [
          {
            valueCoding: {
              code: 'LA6255-9',
              system: 'http://loinc.org',
            },
          },
        ],
      };
      expect(createItem(question, 'de')).toEqual(expected);
    });

    it('works for workspace Valueset', () => {
      const question = {
        key: 'P4',
        value: '0',
      };
      const expected: FHIRQuestionnaireItem = {
        linkId: 'P4',
        text: LANGUAGE_RESOURCES.de.translation.q_P4_text,
        answer: [
          {
            valueCoding: {
              code: 'medical',
              system: 'http://fhir.data4life.care/covid-19/r4/CodeSystem/occupation-class',
            },
          },
        ],
      };
      expect(createItem(question, 'de')).toEqual(expected);
    });

    it('works for workspace Valueset loinc answer', () => {
      const question = {
        key: 'P4',
        value: '2',
      };
      const expected: FHIRQuestionnaireItem = {
        linkId: 'P4',
        text: LANGUAGE_RESOURCES.de.translation.q_P4_text,
        answer: [
          {
            valueCoding: {
              code: 'LA46-8',
              system: 'http://loinc.org',
            },
          },
        ],
      };
      expect(createItem(question, 'de')).toEqual(expected);
    });

    it('works for pregnancy Valueset', () => {
      const question = {
        key: 'P6',
        value: '1',
      };
      const expected: FHIRQuestionnaireItem = {
        linkId: 'P6',
        text: LANGUAGE_RESOURCES.de.translation.q_P6_text,
        answer: [
          {
            valueCoding: {
              system: 'http://loinc.org',
              code: 'LA26683-5',
            },
          },
        ],
      };
      expect(createItem(question, 'de')).toEqual(expected);
    });

    it('works for fever Valueset', () => {
      const question = {
        key: 'S2',
        value: '3',
      };
      const expected: FHIRQuestionnaireItem = {
        linkId: 'S2',
        text: LANGUAGE_RESOURCES.de.translation.q_S2_text,
        answer: [
          {
            valueCoding: {
              system: 'http://fhir.data4life.care/covid-19/r4/CodeSystem/fever-class',
              code: '40C',
            },
          },
        ],
      };
      expect(createItem(question, 'de')).toEqual(expected);
    });

    it('works for fever Valueset loinc answer', () => {
      const question = {
        key: 'S2',
        value: '7',
      };
      const expected: FHIRQuestionnaireItem = {
        linkId: 'S2',
        text: LANGUAGE_RESOURCES.de.translation.q_S2_text,
        answer: [
          {
            valueCoding: {
              system: 'http://loinc.org',
              code: 'LA12688-0',
            },
          },
        ],
      };
      expect(createItem(question, 'de')).toEqual(expected);
    });
  });

  describe('createItemCategory', () => {
    it('works', () => {
      const questions = [
        {
          key: 'C0',
          value: '0',
        },
        CZ,
      ];
      const expected = {
        linkId: 'C',
        text: 'Kontakte zu Covid-19-Fällen',
        item: [createItem(questions[0], 'de'), createItem(CZ, 'de')],
      };
      expect(createItemCategory(questions, 'de')).toEqual(expected);
    });
  });
});
