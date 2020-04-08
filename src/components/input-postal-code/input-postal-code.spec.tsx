import { newSpecPage } from '@stencil/core/testing';
import { QUESTIONS } from '../../global/questions';
import { InputPostalCode } from './input-postal-code';
import { h } from '@stencil/core';

describe('input-postal-code', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputPostalCode],
      template: () => <ia-input-postal-code question={QUESTIONS[0]} />,
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
