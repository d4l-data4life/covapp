import { Guard } from './guard';
import { Questionnaire } from '@covopen/covquestions-js';
import {
  QUESTION_SHARE_DATA,
  QUESTION_SHARE_DATA_PLZ,
} from '../components/views/questionnaire/utils';
import { LOCAL_STORAGE_KEYS } from './constants';

export let questionnaire: Questionnaire = undefined;

export function getQuestionnaire(
  url = '/assets/questionnaire.json'
): Promise<Questionnaire> {
  // TODO implement Update Mechanism
  //   let cachedQuestionnaire = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_KEYS.QUESTIONNAIRE)
  //   );
  //   if (cachedQuestionnaire) {
  //     return new Promise(() => cachedQuestionnaire);
  //   }
  if (questionnaire != undefined) {
    return new Promise(resolve => resolve(questionnaire));
  }
  return fetch(url)
    .then((response: Response) => response.json())
    .then(response => {
      response.questions.push(QUESTION_SHARE_DATA);
      response.questions.push(QUESTION_SHARE_DATA_PLZ);
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.QUESTIONNAIRE,
        JSON.stringify(response)
      );
      questionnaire = response;

      return response;
    });
  // .catch(() => {
  //     // do nothing for now
  //   });
}

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

export const XML_ORDER = ['V', 'P', 'C', 'S', 'D', 'M', 'T'];
