import { newE2EPage } from '@stencil/core/testing';

describe('input-boolean', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-boolean></input-boolean>');

    const element = await page.find('input-boolean');
    expect(element).toHaveClass('hydrated');
  });
});
