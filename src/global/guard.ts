import { Scores, Answers } from '../components/views/questionnaire/questionnaire';

// Guard is used to check if a question should be skipped.
// This can be done by one of the following types
export type Guard =
  | ScoreCondition
  | RadioAnswerCondition
  | BoolCondition
  | Conjunction
  | Disjunction;

// ScoreCondition checks if the score of a given category is within the specified range
export class ScoreCondition {
  category: string;
  min?: number | null;
  max?: number | null;
  constructor(category: string, min = null, max = null) {
    this.category = category;
    this.min = min;
    this.max = max;
  }
  evaluate(scores: Scores, _answers: Answers): boolean {
    const categoryExists = !!scores[this.category];
    if (this.min !== null) {
      if (!categoryExists) {
        return false;
      }
      if (scores[this.category] < this.min) {
        return false;
      }
    }
    if (this.max !== null) {
      if (categoryExists && scores[this.category] > this.max) {
        return false;
      }
    }
    return true;
  }
}

// RadioAnswerCondition checks if the answer for a specific radio question is in a set of accepted answers
export class RadioAnswerCondition {
  questionID: string;
  acceptedAnswers: string[];
  constructor(questionID: string, acceptedAnswers: string[]) {
    this.questionID = questionID;
    this.acceptedAnswers = acceptedAnswers;
  }
  evaluate(_scores: Scores, answers: Answers): boolean {
    const answer = answers[this.questionID];
    if (answer) {
      if (Array.isArray(answer)) {
        return false;
      }
      if (answer.split('.').length > 1) {
        return false;
      }
      return this.acceptedAnswers.indexOf(answer) >= 0;
    }
    return false;
  }
}

// BoolCondition checks if a condition is true or false
export class BoolCondition {
  condition: boolean;
  constructor(condition: boolean) {
    this.condition = condition;
  }
  evaluate(_scores: Scores, _answers: Answers): boolean {
    return this.condition;
  }
}

// Conjunctions combine a set of Guards with AND
export class Conjunction {
  conditions: Guard[];
  constructor(conditions: Guard[]) {
    this.conditions = conditions;
  }
  evaluate(scores: Scores, answers: Answers): boolean {
    for (const condition of this.conditions) {
      if (!condition.evaluate(scores, answers)) {
        return false;
      }
    }
    return true;
  }
}

// Disjunction combine a set of Guards with OR
export class Disjunction {
  conditions: Guard[];
  constructor(conditions: Guard[]) {
    this.conditions = conditions;
  }
  evaluate(scores: Scores, answers: Answers): boolean {
    for (const condition of this.conditions) {
      if (condition.evaluate(scores, answers)) {
        return true;
      }
    }
    return false;
  }
}
