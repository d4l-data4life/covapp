import { newSpecPage } from '@stencil/core/testing';
import { QUESTIONS } from '../../global/questions';
import { InputMultipleChoice } from './input-multiple-choice';
import { h } from '@stencil/core';

describe('input-multiple-choice', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputMultipleChoice],
      template: () => <ia-input-multiple-choice question={QUESTIONS[0]} />,
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
