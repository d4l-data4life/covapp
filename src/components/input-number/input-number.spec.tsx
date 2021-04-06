import { newSpecPage } from '@stencil/core/testing';
import { InputNumber } from './input-number';
import { h } from '@stencil/core';

describe('input-number', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputNumber],
      template: () => (
        <ia-input-number
          question={{
            id: 'test-id',
            category: '',
            inputType: 'checkbox',
          }}
        />
      ),
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
