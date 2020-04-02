import { newE2EPage } from '@stencil/core/testing';

describe('input-multiple-choice', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ia-input-multiple-choice></ia-input-multiple-choice>');

    const element = await page.find('ia-input-multiple-choice');
    expect(element).toHaveClass('hydrated');
  });
});
