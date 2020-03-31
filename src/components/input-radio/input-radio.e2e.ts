import { newE2EPage } from '@stencil/core/testing';

describe('input-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ia-input-radio></ia-input-radio>');

    const element = await page.find('ia-input-radio');
    expect(element).toHaveClass('hydrated');
  });
});
