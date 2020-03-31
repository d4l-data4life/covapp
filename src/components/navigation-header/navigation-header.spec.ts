import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { NavigationHeader } from './navigation-header';

describe('verify card header', () => {
  let page: SpecPage = null;

  beforeEach(async () => {
    jest.clearAllMocks();
    page = await newSpecPage({
      components: [NavigationHeader],
      html: '<ia-navigation-header>',
    });
  });

  it('builds', () => {
    expect(page.rootInstance).toBeTruthy();
  });

  it('should render with provided data', async () => {
    page.root.headline = 'Hi from the header';
    await page.waitForChanges();

    expect(page.root.querySelector('h2').textContent).toContain(
      'Hi from the header'
    );
  });

  it('renders back arrow only with a click event', async () => {
    expect(page.root.querySelector('button')).toBeFalsy();

    page.root.handleClick = () => console.log('add event');
    await page.waitForChanges();

    expect(page.root.querySelector('button')).toBeTruthy();
  });

  it('hide back arrow button when specified', async () => {
    page.root.handleClick = () => console.log('add event');
    page.root.hasBackButton = false;
    await page.waitForChanges();

    expect(page.root.querySelector('button')).toBeFalsy();
  });
});
