import { newSpecPage } from '@stencil/core/testing';
import { AnswersTable } from './answers-table';
import { h } from '@stencil/core';

describe('answers-table', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [AnswersTable],
      template: () => (
        <ia-answers-table/>
      ),
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
