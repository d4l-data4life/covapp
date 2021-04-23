import { newSpecPage } from '@stencil/core/testing';
import { InputRadio } from './input-radio';
import { h } from '@stencil/core';

describe('input-radio', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputRadio],
      template: () => (
        <ia-input-radio
          inputId={'test'}
          options={[
            {
              text: 'test-option-1',
              value: 'opt1',
            },
          ]}
          value={'opt1'}
        />
      ),
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
