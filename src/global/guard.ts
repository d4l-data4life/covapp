export type Scores = { [key: string]: number };

// Guard is used to check if a question should be skipped.
// This can be done by one of the following types
export type Guard = Condition | Conjunction | Disjunction;

// Condition checks if the score of a given category is within the specified range
export class Condition {
  category: string;
  min?: number | null;
  max?: number | null;
  constructor(category: string, min = null, max = null) {
    this.category = category;
    this.min = min;
    this.max = max;
  }
  evaluate(scores: Scores): boolean {
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

// Conjunctions combine a set of Guards with AND
export class Conjunction {
  conditions: Guard[];
  constructor(conditions: Guard[]) {
    this.conditions = conditions;
  }
  evaluate(scores: Scores): boolean {
    for (const condition of this.conditions) {
      if (!condition.evaluate(scores)) {
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
  evaluate(scores: Scores): boolean {
    for (const condition of this.conditions) {
      if (condition.evaluate(scores)) {
        return true;
      }
    }
    return false;
  }
}
