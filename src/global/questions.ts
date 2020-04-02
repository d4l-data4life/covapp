import { Guard, Condition, Disjunction } from './guard';

export type Question = {
  id: string;
  category: string;
  comment?: string;
  text: string;
  inputType: 'radio' | 'date' | 'checkbox';
  options?: string[] | CheckboxOption[];
  nextQuestionMap?: string | string[];
  scoreMap?: number[];
  guard?: Guard;
};

export type CheckboxOption = {
  label: string;
  id: string;
};

export const CATEGORIES = {
  PERSONAL: 'personalInfo',
  CONTACT: 'contact',
  SYMPTOMS: 'symptoms',
  RESPIRATORY_SYMPTOMS: 'respiratorySymptoms',
  ILLNESS: 'illnesses',
  MEDICATION: 'medication',
};

export const QUESTION = {
  AGE: 'P0',
  ABOVE_65: 'P1',
  LIVING_SITUATION: 'P2',
  CARING: 'P3',
  WORKSPACE: 'P4',
  CONTACT_DATE: 'CZ',
  OUT_OF_BREATH: 'SB',
  SYMPTOM_DATE: 'SZ',
};

export const XML_ORDER = ['P', 'C', 'S', 'D', 'M'];

export const MULTIPLE_CHOICE = 'X';

export const QUESTIONS: Question[] = [
  {
    id: QUESTION.AGE,
    category: CATEGORIES.PERSONAL,
    text: 'q_P0_text',
    inputType: 'radio',
    options: [
      'q_P0_option0',
      'q_P0_option1',
      'q_P0_option2',
      'q_P0_option3',
      'q_P0_option4',
      'q_P0_option5',
    ],
    nextQuestionMap: ['P2', 'P2', 'P2', 'P1', 'P2', 'P2'],
  },
  {
    id: QUESTION.ABOVE_65,
    category: CATEGORIES.PERSONAL,
    text: 'q_P1_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
  },
  {
    id: QUESTION.LIVING_SITUATION,
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
    options: ['q_P4_option0', 'q_P4_option1', 'q_P4_option2'],
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
    nextQuestionMap: ['CZ', 'S0'],
    scoreMap: [1, 0],
  },
  {
    id: QUESTION.CONTACT_DATE,
    category: CATEGORIES.CONTACT,
    text: 'q_CZ_text',
    inputType: 'date',
  },
  {
    id: 'S0',
    category: CATEGORIES.SYMPTOMS,
    comment: null,
    text: 'q_S0_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    nextQuestionMap: ['S2', 'S1'],
    scoreMap: [1, 0],
  },
  {
    id: 'S1',
    category: CATEGORIES.SYMPTOMS,
    comment: null,
    text: 'q_S1_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    nextQuestionMap: ['S2', 'S3'],
    scoreMap: [1, 0],
  },
  {
    id: 'S2',
    category: CATEGORIES.SYMPTOMS,
    comment: null,
    text: 'q_S2_text',
    inputType: 'radio',
    options: [
      '',
      'q_S2_option1',
      'q_S2_option2',
      'q_S2_option3',
      'q_S2_option4',
      'q_S2_option5',
      'q_S2_option6',
      'q_S2_option7',
    ],
  },
  {
    id: 'S3',
    category: CATEGORIES.SYMPTOMS,
    text: 'q_S3_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    scoreMap: [1, 0],
  },
  {
    id: `${MULTIPLE_CHOICE}0`,
    category: CATEGORIES.SYMPTOMS,
    text: `q_${MULTIPLE_CHOICE}0_text`,
    comment: `q_${MULTIPLE_CHOICE}0_comment`,
    inputType: 'checkbox',
    options: [
      { label: `q_${MULTIPLE_CHOICE}0_option_S4`, id: 'S4' },
      { label: `q_${MULTIPLE_CHOICE}0_option_S5`, id: 'S5' },
      { label: `q_${MULTIPLE_CHOICE}0_option_S8`, id: 'S8' },
      { label: `q_${MULTIPLE_CHOICE}0_option_SA`, id: 'SA' },
      { label: `q_${MULTIPLE_CHOICE}0_option_SC`, id: 'SC' },
    ],
    scoreMap: [1, 1, 1, 1, 1],
  },
  {
    id: 'S6',
    category: CATEGORIES.RESPIRATORY_SYMPTOMS,
    comment: 'q_S6_comment',
    text: 'q_S6_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    scoreMap: [1, 0],
  },
  {
    id: 'S7',
    category: CATEGORIES.RESPIRATORY_SYMPTOMS,
    comment: 'q_S7_comment',
    text: 'q_S7_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    scoreMap: [1, 0],
  },
  {
    id: 'S9',
    category: CATEGORIES.RESPIRATORY_SYMPTOMS,
    text: 'q_S9_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
    scoreMap: [1, 0],
  },
  {
    id: QUESTION.OUT_OF_BREATH,
    category: CATEGORIES.RESPIRATORY_SYMPTOMS,
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
      new Condition(CATEGORIES.SYMPTOMS, 1, null),
      new Condition(CATEGORIES.RESPIRATORY_SYMPTOMS, 1, null),
    ]),
  },
  {
    id: 'D0',
    category: CATEGORIES.ILLNESS,
    text: 'q_D0_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
  },
  {
    id: 'D1',
    category: CATEGORIES.ILLNESS,
    text: 'q_D1_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
  },
  {
    id: 'D2',
    category: CATEGORIES.ILLNESS,
    text: 'q_D2_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
  },
  {
    id: 'D3',
    category: CATEGORIES.ILLNESS,
    text: 'q_D3_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
  },
  {
    id: 'M0',
    category: CATEGORIES.MEDICATION,
    text: 'q_M0_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
  },
  {
    id: 'M1',
    category: CATEGORIES.MEDICATION,
    comment: 'q_M1_comment',
    text: 'q_M1_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no', 'answer_unknown'],
  },
  {
    id: 'M2',
    category: CATEGORIES.MEDICATION,
    text: 'q_M2_text',
    inputType: 'radio',
    options: ['answer_yes', 'answer_no'],
  },
];
