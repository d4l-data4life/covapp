import { newE2EPage } from '@stencil/core/testing';

describe('input-number', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ia-input-number />');

    const element = await page.find('ia-input-number');
    expect(element).toHaveClass('hydrated');
  });
});
