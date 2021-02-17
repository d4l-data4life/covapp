import { CheckboxOption, NO_XML, QUESTIONS } from '../../global/questions';
export type KeyValue = { key: string; value: string | number };

export const generateValuePairs = (answers): KeyValue[] => {
  const pairs = [];
  const answerKeys = Object.keys(answers);
  const relevantQuestions = QUESTIONS.filter(
    ({ id, xmlValue }) => answerKeys.includes(id) || xmlValue
  );

  relevantQuestions.forEach(
    ({ id: key, xmlValue, xmlValueMapping, inputType, inputMax, options }) => {
      if (xmlValue) {
        const fixedValue = xmlValue?.(answers);
        fixedValue !== null && pairs.push({ key, value: fixedValue });
        return;
      }

      const answer = answers[key];

      if (key.startsWith(NO_XML)) {
        if (inputType === 'checkbox') {
          for (const index in options) {
            const option = (options as CheckboxOption[])[index];
            const xmlValue = answer.includes(index) ? 1 : 2;
            pairs.push({ key: option.id, value: xmlValue });
          }
        }
        return;
      }

      if (inputType === 'decimal') {
        const parsedAnswerValue = inputMax
          ? String(answer).padStart(String(Math.floor(inputMax)).length, '0')
          : parseInt(answer, 10);
        pairs.push({ key, value: parsedAnswerValue });
        return;
      }

      if (String(answer).includes('.')) {
        pairs.push({ key, value: answers[key].replace(/\./g, '') });
      } else {
        const answerIndex = parseInt(answer, 10);

        pairs.push({
          key,
          value: xmlValueMapping?.[answerIndex] ?? answerIndex + 1,
        });
      }
    }
  );

  return pairs;
};
