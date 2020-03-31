import { newE2EPage } from '@stencil/core/testing';

describe('ia-start', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ia-start></ia-start>');

    const element = await page.find('ia-start');
    expect(element).toHaveClass('hydrated');
  });
});
