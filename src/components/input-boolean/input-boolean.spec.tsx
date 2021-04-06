import { newSpecPage } from '@stencil/core/testing';
import { InputBoolean } from './input-boolean';

describe('input-boolean', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputBoolean],
      html: `<input-boolean></input-boolean>`,
    });
    expect(page.root).toEqualHtml(`
      <input-boolean>
        <mock:shadow-root>
          <ia-input-radio value=""></ia-input-radio>
        </mock:shadow-root>
      </input-boolean>
    `);
  });
});
