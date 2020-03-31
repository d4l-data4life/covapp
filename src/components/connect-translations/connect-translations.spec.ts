import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { ConnectTranslations } from './connect-translations';
import i18next from '../../global/utils/i18n';

describe('connect translations', () => {
  let page: SpecPage = null;

  beforeEach(async () => {
    jest.clearAllMocks();
    page = await newSpecPage({
      components: [ConnectTranslations],
      html: '<connect-translations />',
    });
  });

  it('builds', async () => {
    expect(page.rootInstance).toBeTruthy();
  });

  it('should listen for changeLanguage event', async () => {
    await i18next.changeLanguage('en');

    let changeLangaugeEvent = new CustomEvent('changeLanguage', {
      detail: {
        code: 'de',
      },
    });
    page.rootInstance.changedLanguageHandler = jest.fn();

    await page.rootInstance.changeLanguageHandler(changeLangaugeEvent);
    await page.waitForChanges();

    expect(page.rootInstance.changedLanguageHandler).toHaveBeenCalled();
    expect(i18next.language).toBe('de');
  });
});
