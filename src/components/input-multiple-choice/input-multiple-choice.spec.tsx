import { newSpecPage } from '@stencil/core/testing';
import { InputMultipleChoice } from './input-multiple-choice';
import { h } from '@stencil/core';

describe('input-multiple-choice', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputMultipleChoice],
      template: () => (
        <ia-input-multiple-choice
          inputId={'test'}
          options={[
            {
              text: 'test-option-1',
              value: 'opt1',
            },
          ]}
          value={['opt1']}
        />
      ),
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
