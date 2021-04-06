import { newSpecPage } from '@stencil/core/testing';
import { InputPostalCode } from './input-postal-code';
import { h } from '@stencil/core';

describe('input-postal-code', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [InputPostalCode],
      template: () => (
        <ia-input-postal-code
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
