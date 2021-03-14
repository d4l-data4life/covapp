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
          <slot></slot>
        </mock:shadow-root>
      </input-boolean>
    `);
  });
});
