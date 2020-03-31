import { newSpecPage } from '@stencil/core/testing';
import { QUESTIONS } from '../../global/questions';
import { InputRadio } from './input-radio';
import { h } from '@stencil/core';

describe('input-radio', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputRadio],
      template: () => (
        <ia-input-radio question={QUESTIONS[0]} currentSelection={0} />
      ),
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
