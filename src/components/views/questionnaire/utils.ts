import { QUESTIONS, Question } from '../../../global/questions';
import { Scores, Answers } from './questionnaire';

export const getQuestionIndexById = (questionId: string) =>
  QUESTIONS.findIndex(question => question.id === questionId);

export const updateScoreData = (
  questionIndex: number,
  answer: string | string[],
  score
) => {
  let nextScore = score;
  const question = QUESTIONS[questionIndex];
  if (question.scoreMap) {
    let previousScore = nextScore[question.category]
      ? nextScore[question.category]
      : 0;
    nextScore = {
      ...nextScore,
      [question.category]: previousScore + getScoreChange(question, answer),
    };
  }
  return nextScore;
};

export const getScoreChange = (question: Question, answer: string | string[]) => {
  let scoreChange = 0;
  if (Array.isArray(answer)) {
    for (const key of answer) {
      scoreChange += question.scoreMap[key];
    }
  } else {
    scoreChange = question.scoreMap[answer];
  }
  return scoreChange;
};

export const checkGoTo = (questionIndex: number, answerValue: any): number => {
  const nextQuestionMap = QUESTIONS[questionIndex].nextQuestionMap;
  if (Array.isArray(nextQuestionMap) && Array.isArray(answerValue)) {
    const hasDefault =
      nextQuestionMap.length > QUESTIONS[questionIndex].options.length;

    return (
      answerValue
        .map(answerIndex => getQuestionIndexById(nextQuestionMap[answerIndex]))
        .sort((a, b) => a - b)
        .shift() ??
      (hasDefault
        ? getQuestionIndexById(nextQuestionMap[nextQuestionMap.length - 1])
        : questionIndex + 1)
    );
  } else if (Array.isArray(nextQuestionMap)) {
    const answerIndex = answerValue;
    return getQuestionIndexById(nextQuestionMap[answerIndex]);
  } else if (typeof nextQuestionMap === 'string') {
    return getQuestionIndexById(nextQuestionMap);
  } else {
    return questionIndex + 1;
  }
};

export const checkGuard = (
  questionIndex: number,
  score: Scores,
  answers: Answers
): number => {
  const nextQuestion = QUESTIONS[questionIndex];
  if (nextQuestion?.guard && !nextQuestion.guard.evaluate(score, answers)) {
    return checkGuard(questionIndex + 1, score, answers);
  }
  return questionIndex;
};

// TODO: Use built in i18n Functions to translate
export const QUESTION_SHARE_DATA = {
  options: [
    {
      scores: {},
      text: 'Yes, I would like to donate my postal code and my recommended action',
      value: 'yes',
    },
    {
      scores: {},
      value: 'no',
      text:
        'No, I do not want to transfer my data and I only want to see my recommended action',
    },
  ],
  id: 'data_donation',
  text: 'Consent to the transmission of your postal code and recommended action',
  type: 'select',
  details:
    'In order to draw valuable conclusions about the further expansion of the COVID-19 pandemic, we ask for your consent to transmit your postal code and your recommendation to Charité – Universitätsmedizin Berlin. The data will be stored in an anonymous form (postal code and recommendation) and if necessary, the data will be shared with third parties as part of the fight against pandemics. You can revoke your consent at any time. The revocation does not affect the lawfulness of processing based on consent before the revocation.\nIf you would like to give your consent to the transmission of the postal code and the recommendation of your recommended action, choose “Yes” below. You will then be asked for your postal code in the next step.  To continue without submitting your data, choose “No” below. You will then be forwarded directly to your summary.  You can find more information in the <a href="/data-privacy">privacy policy</a>.',
};
export const QUESTION_SHARE_DATA_PLZ = {
  id: 'new_question_id',
  text: 'Ihre Postleitzahl',
  type: 'text',
  enableWhenExpression: {
    var: 'data_donation.option.yes',
  },
};
