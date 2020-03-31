import { newE2EPage } from '@stencil/core/testing';

describe('ia-navigation-header', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<ia-navigation-header></ia-navigation-header>');

    const element = await page.find('ia-navigation-header');
    expect(element).toHaveClass('hydrated');
  });
});
