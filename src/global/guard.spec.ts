import {
  ScoreCondition,
  Conjunction,
  Disjunction,
  RadioAnswerCondition,
  BoolCondition,
} from './guard';
import { QUESTION, NO_XML } from './questions';

const testCondition = new ScoreCondition('test', 1, null);
const otherCondition = new ScoreCondition('other', null, 1);
const testConjunction = new Conjunction([
  testCondition,
  new ScoreCondition('test', null, 1),
]);
const otherDisjunction = new Disjunction([
  otherCondition,
  new ScoreCondition('other', 2, 2),
]);

describe('guard', () => {
  describe('ScoreCondition', () => {
    it('can be constructed', () => {
      expect(new ScoreCondition('test', null, null)).toBeTruthy();
      expect(new ScoreCondition('test', 0, 0)).toBeTruthy();
      expect(new ScoreCondition('test', null, 1)).toBeTruthy();
      expect(new ScoreCondition('test', 1, null)).toBeTruthy();
    });

    it('can be evaluated', () => {
      const condition = new ScoreCondition('test', null, null);
      expect(condition.evaluate({}, {})).toBeTruthy();
    });

    it('can correctly evaluate min', () => {
      const condition = new ScoreCondition('test', 2, null);
      expect(condition.evaluate({ test: 1 }, {})).toBeFalsy();
      expect(condition.evaluate({ test: 2 }, {})).toBeTruthy();
    });

    it('can correctly evaluate max', () => {
      const condition = new ScoreCondition('test', null, 2);
      expect(condition.evaluate({ test: 2 }, {})).toBeTruthy();
      expect(condition.evaluate({ test: 3 }, {})).toBeFalsy();
    });

    it('can correctly evaluate ranges', () => {
      const condition = new ScoreCondition('test', 2, 2);
      expect(condition.evaluate({ test: 1 }, {})).toBeFalsy();
      expect(condition.evaluate({ test: 2 }, {})).toBeTruthy();
      expect(condition.evaluate({ test: 3 }, {})).toBeFalsy();
    });
  });

  describe('RadioAnswerCondition', () => {
    it('can be constructed', () => {
      expect(new RadioAnswerCondition('P0', [])).toBeTruthy();
      expect(new RadioAnswerCondition('P0', ['0', '1'])).toBeTruthy();
    });

    it('can be evaluated', () => {
      const condition = new RadioAnswerCondition('P0', ['0', '1']);
      expect(condition.evaluate({}, {})).toBeFalsy();
    });

    it('can correctly evaluate radio questions', () => {
      const condition = new RadioAnswerCondition('P0', ['0']);
      expect(condition.evaluate({}, { P0: '0' })).toBeTruthy();
      expect(condition.evaluate({}, { P0: '1' })).toBeFalsy();
      expect(condition.evaluate({}, { P1: '0' })).toBeFalsy();
    });

    it('can correctly evaluate radio questions with multiple accepted answers', () => {
      const condition = new RadioAnswerCondition('P0', ['0', '1']);
      expect(condition.evaluate({}, { P0: '0' })).toBeTruthy();
      expect(condition.evaluate({}, { P0: '1' })).toBeTruthy();
      expect(condition.evaluate({}, { P1: '0' })).toBeFalsy();
    });

    it('can handle multiple choice question ids', () => {
      const condition = new RadioAnswerCondition(`${NO_XML}0`, ['1']);
      expect(condition.evaluate({}, { X0: ['1', '2'] })).toBeFalsy();
    });

    it('can handle date question ids', () => {
      const condition = new RadioAnswerCondition(QUESTION.CONTACT_DATE, ['1']);
      expect(
        condition.evaluate({}, { [QUESTION.CONTACT_DATE]: '2020.03.20' })
      ).toBeFalsy();
    });
  });

  describe('BoolCondition', () => {
    it('can be constructed', () => {
      expect(new BoolCondition(true)).toBeTruthy();
      expect(new BoolCondition(false)).toBeTruthy();
    });

    it('can be evaluated', () => {
      const condition = new BoolCondition(true);
      expect(condition.evaluate({}, {})).toBeTruthy();
      const condition1 = new BoolCondition(false);
      expect(condition1.evaluate({}, {})).toBeFalsy();
    });
  });

  describe('Conjunction', () => {
    it('can be constructed', () => {
      expect(new Conjunction([testCondition, otherCondition])).toBeTruthy();
    });

    it('can be evaluated', () => {
      const conjunction = new Conjunction([]);
      expect(conjunction.evaluate({}, {})).toBeTruthy();
    });

    it('can correctly single conditions', () => {
      const conjunction = new Conjunction([testCondition]);
      expect(conjunction.evaluate({ test: 1 }, {})).toBeTruthy();
      expect(conjunction.evaluate({ test: 0 }, {})).toBeFalsy();
    });

    it('can correctly evaluate multiple conditions', () => {
      const conjunction = new Conjunction([testCondition, otherCondition]);
      expect(conjunction.evaluate({ test: 1, other: 1 }, {})).toBeTruthy();
      expect(conjunction.evaluate({ test: 0, other: 1 }, {})).toBeFalsy();
      expect(conjunction.evaluate({ test: 1, other: 2 }, {})).toBeFalsy();
      expect(conjunction.evaluate({ test: 0, other: 2 }, {})).toBeFalsy();
    });

    it('can correctly evaluate other conjunction/disjunctions', () => {
      const conjunction = new Conjunction([testConjunction, otherDisjunction]);
      expect(conjunction.evaluate({ test: 1, other: 1 }, {})).toBeTruthy();
      expect(conjunction.evaluate({ test: 1, other: 3 }, {})).toBeFalsy();
      expect(conjunction.evaluate({ test: 0, other: 1 }, {})).toBeFalsy();
      expect(conjunction.evaluate({ test: 0, other: 3 }, {})).toBeFalsy();
    });
  });

  describe('Disjunction', () => {
    it('can be constructed', () => {
      expect(new Disjunction([testCondition, otherCondition])).toBeTruthy();
    });

    it('can be evaluated', () => {
      const disjunction = new Disjunction([]);
      expect(disjunction.evaluate({}, {})).toBeFalsy();
    });

    it('can correctly single conditions', () => {
      const disjunction = new Disjunction([testCondition]);
      expect(disjunction.evaluate({ test: 1 }, {})).toBeTruthy();
      expect(disjunction.evaluate({ test: 0 }, {})).toBeFalsy();
    });

    it('can correctly evaluate multiple conditions', () => {
      const disjunction = new Disjunction([testCondition, otherCondition]);
      expect(disjunction.evaluate({ test: 1, other: 1 }, {})).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 1 }, {})).toBeTruthy();
      expect(disjunction.evaluate({ test: 1, other: 2 }, {})).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 2 }, {})).toBeFalsy();
    });

    it('can correctly evaluate other conjunction/disjunctions', () => {
      const disjunction = new Disjunction([testConjunction, otherDisjunction]);
      expect(disjunction.evaluate({ test: 1, other: 1 }, {})).toBeTruthy();
      expect(disjunction.evaluate({ test: 1, other: 3 }, {})).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 1 }, {})).toBeTruthy();
      expect(disjunction.evaluate({ test: 0, other: 3 }, {})).toBeFalsy();
    });
  });
});
