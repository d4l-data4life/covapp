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

export const checkGoTo = (questionIndex: number, answerIndex: any): number => {
  const nextQuestionMap = QUESTIONS[questionIndex].nextQuestionMap;
  if (Array.isArray(nextQuestionMap)) {
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
  if (nextQuestion && nextQuestion.guard) {
    if (!nextQuestion.guard.evaluate(score, answers)) {
      return checkGuard(questionIndex + 1, score, answers);
    }
  }
  return questionIndex;
};
