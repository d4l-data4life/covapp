import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { Summary } from './summary';
import { h } from '@stencil/core';
import version from '../../../global/utils/version';
import { LOCAL_STORAGE_KEYS, TWO_WEEKS, ONE_DAY } from '../../../global/constants';
import { getStorageString } from '../../../global/utils/date';
import { CATEGORIES, QUESTION } from '../../../global/questions';

describe('summary', () => {
  let page: SpecPage = null;

  jest.mock('@stencil/router');

  beforeEach(async () => {
    jest.clearAllMocks();
    version.set();
    page = await newSpecPage({
      components: [Summary],
      template: () => <ia-summary />,
    });
  });

  it('builds', () => {
    expect(page.rootInstance).toBeTruthy();
  });

  it('calculates contact within two weeks correctly', () => {
    let summary: Summary = page.rootInstance;
    let now = new Date();
    let barelyIn = new Date(now.getTime() - TWO_WEEKS);
    let barelyOut = new Date(now.getTime() - TWO_WEEKS - ONE_DAY);
    let future = new Date(now.getTime() + ONE_DAY);
    let testCases = [
      { date: now, expected: true },
      { date: barelyIn, expected: true },
      { date: barelyOut, expected: false },
      { date: future, expected: false },
    ];
    for (let testCase of testCases) {
      let answers = {
        [QUESTION.CONTACT_DATE]: getStorageString(testCase.date),
      };
      localStorage.setItem(LOCAL_STORAGE_KEYS.ANSWERS, JSON.stringify(answers));
      summary.componentWillLoad();
      summary.setResultCase();
      expect(summary.contactWithinTwoWeeks).toEqual(testCase.expected);
    }
  });

  it('calculates symptoms within two weeks of contact correctly', () => {
    let summary: Summary = page.rootInstance;
    let symptomAfterContact = {
      [QUESTION.CONTACT_DATE]: '2020.03.20',
      [QUESTION.SYMPTOM_DATE]: `2020.03.22`,
    };
    let barelyIn = {
      [QUESTION.CONTACT_DATE]: '2020.03.08',
      [QUESTION.SYMPTOM_DATE]: `2020.03.22`,
    };
    let barelyOut = {
      [QUESTION.CONTACT_DATE]: '2020.03.07',
      [QUESTION.SYMPTOM_DATE]: `2020.03.22`,
    };
    let symptomBeforeContact = {
      [QUESTION.CONTACT_DATE]: '2020.03.08',
      [QUESTION.SYMPTOM_DATE]: `2020.03.07`,
    };
    let sameDay = {
      [QUESTION.CONTACT_DATE]: '2020.03.08',
      [QUESTION.SYMPTOM_DATE]: `2020.03.08`,
    };

    let testCases = [
      { answers: symptomAfterContact, expected: true },
      { answers: barelyIn, expected: true },
      { answers: barelyOut, expected: false },
      { answers: symptomBeforeContact, expected: true },
      { answers: sameDay, expected: true },
    ];
    for (let testCase of testCases) {
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.ANSWERS,
        JSON.stringify(testCase.answers)
      );
      summary.componentWillLoad();
      summary.setResultCase();
      expect(summary.symptomsWithinTwoWeeksOfContact).toEqual(testCase.expected);
    }
  });

  it('sets the result case correctly', () => {
    let summary: Summary = page.rootInstance;
    let testCases = [
      {
        name: 'contact and symptoms within 14d',
        scores: { [CATEGORIES.CONTACT]: 1, [CATEGORIES.SYMPTOMS]: 1 },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: true,
        expected: 1,
      },
      {
        name: 'contact and Both symptoms outside of 14d',
        scores: {
          [CATEGORIES.CONTACT]: 1,
          [CATEGORIES.SYMPTOMS]: 1,
          [CATEGORIES.RESPIRATORY_SYMPTOMS]: 1,
        },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: false,
        expected: 2,
      },
      {
        name: 'contact and general symptoms outside of 14d',
        scores: { [CATEGORIES.CONTACT]: 1, [CATEGORIES.SYMPTOMS]: 1 },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: false,
        expected: 4,
      },
      {
        name: 'contact and respiratory symptoms outside of 14d',
        scores: { [CATEGORIES.CONTACT]: 1, [CATEGORIES.RESPIRATORY_SYMPTOMS]: 1 },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: false,
        expected: 4,
      },
      {
        name: 'contact within 14d without symptoms',
        scores: { [CATEGORIES.CONTACT]: 1, [CATEGORIES.SYMPTOMS]: 0 },
        contactWithinTwoWeeks: true,
        expected: 3,
      },
      {
        name: 'contact outside 14d without symptoms',
        scores: { [CATEGORIES.CONTACT]: 1, [CATEGORIES.SYMPTOMS]: 0 },
        contactWithinTwoWeeks: false,
        symptomsWithinTwoWeeksOfContact: null,
        expected: 5,
      },
      {
        name: 'no contact but both symptoms',
        scores: {
          [CATEGORIES.CONTACT]: 0,
          [CATEGORIES.SYMPTOMS]: 1,
          [CATEGORIES.RESPIRATORY_SYMPTOMS]: 1,
        },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: null,
        expected: 2,
      },
      {
        name: 'no contact but respiratory symptoms',
        scores: {
          [CATEGORIES.CONTACT]: 0,
          [CATEGORIES.SYMPTOMS]: 0,
          [CATEGORIES.RESPIRATORY_SYMPTOMS]: 1,
        },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: null,
        expected: 4,
      },
      {
        name: 'no contact but general symptoms',
        scores: {
          [CATEGORIES.CONTACT]: 0,
          [CATEGORIES.SYMPTOMS]: 1,
          [CATEGORIES.RESPIRATORY_SYMPTOMS]: 0,
        },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: null,
        expected: 4,
      },
      {
        name: 'no contact no symptoms',
        scores: {
          [CATEGORIES.CONTACT]: 0,
          [CATEGORIES.SYMPTOMS]: 0,
          [CATEGORIES.RESPIRATORY_SYMPTOMS]: 0,
        },
        contactWithinTwoWeeks: null,
        symptomsWithinTwoWeeksOfContact: null,
        expected: 5,
      },
    ];
    for (let testCase of testCases) {
      jest
        .spyOn(summary, 'contactWithinTwoWeeks', 'get')
        .mockReturnValue(testCase.contactWithinTwoWeeks);
      jest
        .spyOn(summary, 'symptomsWithinTwoWeeksOfContact', 'get')
        .mockReturnValue(testCase.symptomsWithinTwoWeeksOfContact);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.SCORES,
        JSON.stringify(testCase.scores)
      );
      summary.componentWillLoad();
      summary.setResultCase();
      expect({
        name: testCase.name,
        value: summary.resultCase,
      }).toEqual({
        name: testCase.name,
        value: testCase.expected,
      });
    }
  });
});
