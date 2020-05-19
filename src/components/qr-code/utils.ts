import { CheckboxOption, NO_XML, QUESTIONS, QUESTION } from '../../global/questions';
import { getQuestionIndexById } from '../views/questionnaire/utils';

export type KeyValue = { key: string; value: string };

export const generateValuePairs = (answers): KeyValue[] => {
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
