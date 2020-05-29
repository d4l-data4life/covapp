import {
  FHIRQuestionnaire,
  FHIRQuestionnaireResponse,
  FHIRQuestionnaireItem,
  FHIRResponseItem,
  FHIRValueSet,
  FHIRAnswerValue,
  FHIREnableCondition,
} from './types';

const indexArrayBy = (array: any[], keyField: string) =>
  array.reduce((obj: any, item: any) => {
    obj[item[keyField]] = item;
    return obj;
  }, {});

/**
 * Create the R4 FHIR questionnaire response based on the answers and the questionnaire
 * @param answers The answers provided by the user
 * @param fhirQuestionnaire The questionnaire to which the answers belong
 */
export const buildQuestionnaireResponse = (
  answers: { [key: string]: string | string[] },
  fhirQuestionnaire: FHIRQuestionnaire
): FHIRQuestionnaireResponse => {
  // Extract all questions
  const questions = indexArrayBy(fhirQuestionnaire.item, 'linkId');

  // Extract all contained value sets
  const valueSets: { [key: string]: FHIRValueSet } = indexArrayBy(
    fhirQuestionnaire.contained,
    'id'
  );

  // The answers that are stored by CovApp include nested answers i.e X0: ['2'].
  // These are only needed for some CovApp internal calculations and not for creating the FHIR response. So we filter them out.
  const filteredAnswers: { [key: string]: string } = Object.keys(answers)
    .filter(key => !Array.isArray(answers[key]))
    .reduce((obj, key) => {
      return {
        ...obj,
        [key]: answers[key],
      };
    }, {});

  // Build the FHIR questionnaire response
  return {
    resourceType: 'QuestionnaireResponse',
    language: fhirQuestionnaire.language,
    questionnaire: `${fhirQuestionnaire.url}|${fhirQuestionnaire.version}`,
    authored: new Date().toISOString(),
    status: 'completed',
    item: createItems(filteredAnswers, questions, valueSets),
  };
};

/**
 * Build the answers for each question
 * @param answers The answers provided by the user
 * @param questions The questions that where answered
 * @param valueSets The value sets for all questions
 */
const createItems = (
  answers: { [key: string]: string },
  questions: { [key: string]: FHIRQuestionnaireItem },
  valueSets: { [key: string]: FHIRValueSet }
): FHIRResponseItem[] => {
  let items: FHIRResponseItem[] = [];

  for (const id in questions) {
    // If the question is a symptoms question (S<>) and has no answer, is required and enabled, set it to "no"
    if (shouldAddDefault(id, answers, questions, valueSets)) {
      answers[id] = '1';
    }

    const questionItem = questions[id];

    if (!answers[id] && questionItem.type !== 'group') {
      if (
        questions[id].required &&
        checkIfEnabled(
          questionItem.enableWhen,
          questions,
          answers,
          valueSets,
          questionItem.enableBehavior
        )
      ) {
        throw new Error(`Question ${id} has no related answer`);
      }
      continue;
    }

    let answer: FHIRAnswerValue[] = null;
    let childItems: FHIRResponseItem[] = null;

    if (questionItem.type === 'choice' && questionItem.answerValueSet) {
      const valueSet = getValueSet(valueSets, questionItem);

      if (valueSet === undefined) {
        if (questions[id].required) {
          throw new Error(`Response ${id} has no related value set`);
        }
        continue;
      }

      answer = [
        {
          valueCoding: getAnswer(id, valueSet, answers),
        },
      ];
    } else if (questionItem.type === 'date') {
      answer = [{ valueDate: answers[id].replace(/\./g, '-') }];
    } else if (questionItem.type === 'string') {
      answer = [{ valueString: answers[id] }];
    } else if (questionItem.type === 'group') {
      childItems = createItems(
        answers,
        indexArrayBy(questionItem.item, 'linkId'),
        valueSets
      );
    } else {
      throw new Error(`Question ${id} has an unknown type`);
    }

    items = [
      ...items,
      {
        linkId: id,
        text: questionItem.text,
        ...(answer !== null && { answer: answer }),
        ...(childItems !== null && { item: childItems }),
      },
    ];
  }

  return items;
};

/**
 * Check if a default value should be added
 * for the question with the given linkId
 */
const shouldAddDefault = (
  id: string,
  answers: { [key: string]: string },
  questions: { [key: string]: FHIRQuestionnaireItem },
  valueSets: { [key: string]: FHIRValueSet }
): boolean =>
  answers[id] === undefined &&
  questions[id].required &&
  ['S0', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'SA', 'SB', 'SC'].includes(
    questions[id].linkId
  ) &&
  checkIfEnabled(
    questions[id].enableWhen,
    questions,
    answers,
    valueSets,
    questions[id].enableBehavior
  );

const checkIfEnabled = (
  conditions: FHIREnableCondition[],
  questions: { [key: string]: FHIRQuestionnaireItem },
  answers: { [key: string]: string },
  valueSets: { [key: string]: FHIRValueSet },
  enableBehavior: string
) => {
  if (!conditions) {
    return true;
  }

  if (conditions.length === 1) {
    return checkCondition(conditions[0], questions, answers, valueSets);
  }

  if (enableBehavior === 'any') {
    return conditions.some((condition: FHIREnableCondition) =>
      checkCondition(condition, questions, answers, valueSets)
    );
  } else if (enableBehavior === 'all') {
    return conditions.every((condition: FHIREnableCondition) =>
      checkCondition(condition, questions, answers, valueSets)
    );
  } else {
    throw new Error(
      'Invalid Questionnaire resource: multiple enableWhen conditions present but no enableBehaviour specified'
    );
  }
};

const checkCondition = (
  condition: FHIREnableCondition,
  questions: { [key: string]: FHIRQuestionnaireItem },
  answers: { [key: string]: string },
  valueSets: { [key: string]: FHIRValueSet }
) => {
  const dependingQuestion = questions[condition.question];
  const valueSet = getValueSet(valueSets, dependingQuestion);
  const answeredOption = getAnswer(dependingQuestion.linkId, valueSet, answers);
  return (
    answeredOption.code === condition.answerCoding.code &&
    answeredOption.system === condition.answerCoding.system
  );
};

const getValueSet = (
  valueSets: { [key: string]: FHIRValueSet },
  questionItem: FHIRQuestionnaireItem
) => valueSets[questionItem.answerValueSet.replace('#', '')];

const getAnswer = (
  id: string,
  valueSet: FHIRValueSet,
  answers: { [key: string]: string }
) => {
  const answeredOption = valueSet.expansion.contains[answers[id]];
  return {
    system: answeredOption.system,
    code: answeredOption.code,
  };
};
