import { newSpecPage } from '@stencil/core/testing';
import { ConnectTranslations } from '../connect-translations/connect-translations';
import { AppRoot } from './app-root';

describe('app-root', () => {
  it('builds', async () => {
    const page = await newSpecPage({
      components: [AppRoot, ConnectTranslations],
      html: '<app-root/>',
    });
    expect(page.rootInstance).toBeTruthy();
  });
});
