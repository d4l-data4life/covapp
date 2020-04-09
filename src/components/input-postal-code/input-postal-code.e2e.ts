import { newE2EPage } from '@stencil/core/testing';

describe('input-postal-code', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ia-input-postal-code></ia-input-postal-code>');

    const element = await page.find('ia-input-postal-code');
    expect(element).toHaveClass('hydrated');
  });
});
