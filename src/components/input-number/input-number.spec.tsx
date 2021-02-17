import { newSpecPage } from '@stencil/core/testing';
import { QUESTIONS } from '../../global/questions';
import { InputNumber } from './input-number';
import { h } from '@stencil/core';

describe('input-number', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputNumber],
      template: () => <ia-input-number question={QUESTIONS[0]} />,
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
