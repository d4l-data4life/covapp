import { LANGUAGES, LANGUAGE_RESOURCES } from './custom';
import TRANSLATION_DE from './i18n/de.json';
import TRANSLATION_EN from './i18n/en.json';

describe('translations', () => {
  it('includes at least the default languages', () => {
    const GERMAN = LANGUAGES.find(lang => lang.code === 'de');
    const ENGLISH = LANGUAGES.find(lang => lang.code === 'en');

    expect(GERMAN.code).toBe('de');
    expect(GERMAN.label).toBe(TRANSLATION_DE.label);
    expect(ENGLISH.code).toBe('en');
    expect(ENGLISH.label).toBe(TRANSLATION_EN.label);
  });

  it('includes the correct number of keys', () => {
    expect(Object.keys(LANGUAGE_RESOURCES.de.translation).length).toBe(
      Object.keys(TRANSLATION_DE.keys).length
    );

    expect(Object.keys(LANGUAGE_RESOURCES.en.translation).length).toBe(
      Object.keys(TRANSLATION_EN.keys).length
    );
  });
});
