import {
  Guard,
  ScoreCondition,
  Disjunction,
  RadioAnswerCondition,
  Conjunction,
  BoolCondition,
} from './guard';
import { PANDEMIC_TRACKING_IS_ENABLED } from './custom';

export type Question = {
  id: string;
  category: string;
  comment?: string;
  text?: string;
  inputType: 'radio' | 'date' | 'checkbox' | 'postal' | 'decimal' | 'hidden';
  options?: string[] | CheckboxOption[];
  nextQuestionMap?: string | string[];
  scoreMap?: number[];
  guard?: Guard;
  xmlValueMapping?: number[];
  inputMin?: number;
  inputMax?: number;
  inputStep?: number;
  xmlValue?: (answers: any) => string | number;
  optional?: boolean;
};

export type CheckboxOption = {
  label: string;
  id: string;
};

export const CATEGORIES = {
  PERSONAL: 'personalInfo',
  CONTACT: 'contact',
  SYMPTOMS: 'symptoms', // Box 2 symptoms
  SYMPTOMS_HIGH: 'symptomsHigh', // Box 1 symptoms
  ILLNESS: 'illnesses',
  MEDICATION: 'medication',
};

export const NO_XML = 'X';
export const QUESTION = {
  POSTAL_CODE: 'V1',
  ABOVE_65: 'P1',
  HOUSING: 'P2',
  CARING: 'P3',
  WORKSPACE: 'P4',
  CONTACT_DATE: 'CZ',
  OUT_OF_BREATH: 'SB',
  SYMPTOM_DATE: 'SZ',
  DATA_DONATION: 'X1',
};

export const XML_ORDER = ['V', 'P', 'C', 'S', 'D', 'M'];

export const QUESTIONS: Question[] = [
  {
    id: QUESTION.ABOVE_65,
    category: CATEGORIES.PERSONAL,
    text: 'q_P1_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
  },
  {
    id: QUESTION.HOUSING,
    category: CATEGORIES.PERSONAL,
    text: 'q_P2_text',
    inputType: 'radio',
    options: ['q_P2_option0', 'q_P2_option1'],
  },
  {
    id: QUESTION.CARING,
    category: CATEGORIES.PERSONAL,
    comment: 'q_P3_comment',
    text: 'q_P3_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
  },
  {
    id: QUESTION.WORKSPACE,
    category: CATEGORIES.PERSONAL,
    text: 'q_P4_text',
    inputType: 'radio',
    options: [
      'q_P4_option0',
      'q_P4_option3',
      'q_P4_option1',
      'q_P4_option4',
      'q_P4_option2',
    ],
    xmlValueMapping: [1, 4, 2, 5, 3],
  },
  {
    id: 'P5',
    category: CATEGORIES.PERSONAL,
    text: 'q_P5_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
  },
  {
    id: 'P6',
    category: CATEGORIES.PERSONAL,
    text: 'q_P6_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
  },
  {
    id: 'C0',
    category: CATEGORIES.CONTACT,
    comment: 'q_C0_comment',
    text: 'q_C0_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    nextQuestionMap: ['CZ', 'X0'],
    scoreMap: [1, 0],
  },
  {
    id: QUESTION.CONTACT_DATE,
    category: CATEGORIES.CONTACT,
    text: 'q_CZ_text',
    inputType: 'date',
  },
  {
    id: 'X0',
    category: CATEGORIES.SYMPTOMS_HIGH,
    text: 'q_X0_text',
    comment: 'q_X0_comment',
    inputType: 'checkbox',
    options: [
      { label: 'q_X0_option_S0', id: 'S0' },
      { label: 'q_X0_option_S3', id: 'S3' },
      { label: 'q_X0_option_S5', id: 'S5' },
      { label: 'q_X0_option_SC', id: 'SC' },
    ],
    scoreMap: [1, 1, 1, 1],
  },
  {
    id: 'X2',
    category: CATEGORIES.SYMPTOMS,
    text: 'q_X2_text',
    comment: 'q_X2_comment',
    inputType: 'checkbox',
    options: [
      { label: 'q_X2_option_S4', id: 'S4' },
      { label: 'q_X2_option_S6', id: 'S6' },
      { label: 'q_X2_option_S7', id: 'S7' },
      { label: 'q_X2_option_S8', id: 'S8' },
      { label: 'q_X2_option_S9', id: 'S9' },
      { label: 'q_X2_option_SA', id: 'SA' },
    ],
    scoreMap: [1, 1, 1, 1, 1, 1],
  },
  {
    id: QUESTION.OUT_OF_BREATH,
    category: CATEGORIES.SYMPTOMS,
    comment: 'q_SB_comment',
    text: 'q_SB_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    scoreMap: [1, 0],
  },
  {
    id: QUESTION.SYMPTOM_DATE,
    category: CATEGORIES.SYMPTOMS,
    text: 'q_SZ_text',
    inputType: 'date',
    guard: new Disjunction([
      new ScoreCondition(CATEGORIES.SYMPTOMS, 1, null),
      new ScoreCondition(CATEGORIES.SYMPTOMS_HIGH, 1, null),
    ]),
  },
  {
    id: 'X3',
    category: CATEGORIES.ILLNESS,
    comment: 'q_X3_comment',
    text: 'q_X3_text',
    inputType: 'checkbox',
    options: [
      { label: 'q_X3_option_D0', id: 'D0' },
      { label: 'q_X3_option_D1', id: 'D1' },
      { label: 'q_X3_option_D2', id: 'D2' },
      { label: 'q_X3_option_D4', id: 'D4' },
    ],
    scoreMap: [1, 1, 1, 1],
  },
  {
    id: 'D6',
    category: CATEGORIES.PERSONAL,
    comment: 'q_D6_comment',
    text: 'q_D6_text',
    inputType: 'decimal',
    inputMin: 50,
    inputMax: 300,
    inputStep: 1,
    optional: true,
  },
  {
    id: 'D5',
    category: CATEGORIES.PERSONAL,
    comment: 'q_D5_comment',
    text: 'q_D5_text',
    inputType: 'decimal',
    inputMin: 0,
    inputMax: 600,
    inputStep: 1,
    optional: true,
  },
  {
    id: 'D7',
    category: CATEGORIES.PERSONAL,
    inputType: 'hidden',
    xmlValue({ D5, D6 }) {
      if (!D5 || !D6) {
        return null;
      }

      const weight = parseInt(D5, 10);
      const height = parseInt(D6, 10) / 100;
      const bmi = String(Math.min(Math.round(weight / (height * height)), 99));

      if (bmi === 'NaN') {
        return null; // superfluous, but extra check doesn't harm
      }

      return '00'.substr(bmi.length) + bmi.slice(0, 2);
    },
    guard: new BoolCondition(false),
  },
  {
    id: 'M0',
    category: CATEGORIES.MEDICATION,
    text: 'q_M0_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
    scoreMap: [1, 0, 0],
  },
  {
    id: 'M1',
    category: CATEGORIES.MEDICATION,
    comment: 'q_M1_comment',
    text: 'q_M1_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
    scoreMap: [1, 0, 0],
  },
  {
    id: 'M2',
    category: CATEGORIES.MEDICATION,
    text: 'q_M2_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
  },
  {
    id: QUESTION.DATA_DONATION,
    category: CATEGORIES.PERSONAL,
    comment: 'q_X1_comment',
    text: 'q_X1_text',
    options: ['q_X1_option0', 'q_X1_option1'],
    inputType: 'radio',
    guard: new BoolCondition(PANDEMIC_TRACKING_IS_ENABLED),
  },
  {
    id: QUESTION.POSTAL_CODE,
    category: CATEGORIES.PERSONAL,
    comment: 'q_V1_comment',
    text: 'q_V1_text',
    inputType: 'postal',
    xmlValue() {
      return null; // don't store in xml
    },
    guard: new Conjunction([
      new BoolCondition(PANDEMIC_TRACKING_IS_ENABLED),
      new RadioAnswerCondition('X1', ['0']),
    ]),
  },
];
