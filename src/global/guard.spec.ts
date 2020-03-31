import { Condition, Conjunction, Disjunction } from './guard';

const testCondition = new Condition('test', 1, null);
const otherCondition = new Condition('other', null, 1);
const testConjunction = new Conjunction([
  testCondition,
  new Condition('test', null, 1),
]);
const otherDisjunction = new Disjunction([
  otherCondition,
  new Condition('other', 2, 2),
]);

describe('guard', () => {
  describe('condition', () => {
    it('can be constructed', () => {
      expect(new Condition('test', null, null)).toBeTruthy();
      expect(new Condition('test', 0, 0)).toBeTruthy();
      expect(new Condition('test', null, 1)).toBeTruthy();
      expect(new Condition('test', 1, null)).toBeTruthy();
    });

    it('can be evaluated', () => {
      const condition = new Condition('test', null, null);
      expect(condition.evaluate({})).toBeTruthy();
    });

    it('can correctly evaluate min', () => {
      const condition = new Condition('test', 2, null);
      expect(condition.evaluate({ test: 1 })).toBeFalsy();
      expect(condition.evaluate({ test: 2 })).toBeTruthy();
    });

    it('can correctly evaluate max', () => {
      const condition = new Condition('test', null, 2);
      expect(condition.evaluate({ test: 2 })).toBeTruthy();
      expect(condition.evaluate({ test: 3 })).toBeFalsy();
    });

    it('can correctly evaluate ranges', () => {
      const condition = new Condition('test', 2, 2);
      expect(condition.evaluate({ test: 1 })).toBeFalsy();
      expect(condition.evaluate({ test: 2 })).toBeTruthy();
      expect(condition.evaluate({ test: 3 })).toBeFalsy();
    });
  });

  describe('conjunction', () => {
    it('can be constructed', () => {
      expect(new Conjunction([testCondition, otherCondition])).toBeTruthy();
    });

    it('can be evaluated', () => {
      const conjunction = new Conjunction([]);
      expect(conjunction.evaluate({})).toBeTruthy();
    });

    it('can correctly single conditions', () => {
      const conjunction = new Conjunction([testCondition]);
      expect(conjunction.evaluate({ test: 1 })).toBeTruthy();
      expect(conjunction.evaluate({ test: 0 })).toBeFalsy();
    });

    it('can correctly evaluate multiple conditions', () => {
      const conjunction = new Conjunction([testCondition, otherCondition]);
      expect(conjunction.evaluate({ test: 1, other: 1 })).toBeTruthy();
      expect(conjunction.evaluate({ test: 0, other: 1 })).toBeFalsy();
      expect(conjunction.evaluate({ test: 1, other: 2 })).toBeFalsy();
      expect(conjunction.evaluate({ test: 0, other: 2 })).toBeFalsy();
    });

    it('can correctly evaluate other conjunction/disjunctions', () => {
      const conjunction = new Conjunction([testConjunction, otherDisjunction]);
      expect(conjunction.evaluate({ test: 1, other: 1 })).toBeTruthy();
      expect(conjunction.evaluate({ test: 1, other: 3 })).toBeFalsy();
      expect(conjunction.evaluate({ test: 0, other: 1 })).toBeFalsy();
      expect(conjunction.evaluate({ test: 0, other: 3 })).toBeFalsy();
    });
  });

  describe('disjunction', () => {
    it('can be constructed', () => {
      expect(new Disjunction([testCondition, otherCondition])).toBeTruthy();
    });

    it('can be evaluated', () => {
      const disjunction = new Disjunction([]);
      expect(disjunction.evaluate({})).toBeFalsy();
    });

    it('can correctly single conditions', () => {
      const disjunction = new Disjunction([testCondition]);
      expect(disjunction.evaluate({ test: 1 })).toBeTruthy();
      expect(disjunction.evaluate({ test: 0 })).toBeFalsy();
    });

    it('can correctly evaluate multiple conditions', () => {
      const disjunction = new Disjunction([testCondition, otherCondition]);
      expect(disjunction.evaluate({ test: 1, other: 1 })).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 1 })).toBeTruthy();
      expect(disjunction.evaluate({ test: 1, other: 2 })).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 2 })).toBeFalsy();
    });

    it('can correctly evaluate other conjunction/disjunctions', () => {
      const disjunction = new Disjunction([testConjunction, otherDisjunction]);
      expect(disjunction.evaluate({ test: 1, other: 1 })).toBeTruthy();
      expect(disjunction.evaluate({ test: 1, other: 3 })).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 1 })).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 3 })).toBeFalsy();
    });
  });
});
