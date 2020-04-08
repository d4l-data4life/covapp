require('dotenv').config();

const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');
const { stringify } = require('javascript-stringify');
const deepAssign = require('deep-assign');
const prettier = require('prettier');

const prettierOptions = {
  ...JSON.parse(readFileSync(join(__dirname, '..', '.prettierrc'), 'utf8')),
  parser: 'typescript',
};

function tryToReadTranslationFile(filePath) {
  try {
    return require(filePath);
  } catch (error) {
    // only throw errors in case of JSON syntax errors
    // due to the fallback logic it might be okay to have missing files
    // later validations will catch missing files
    if (error instanceof SyntaxError) {
      throw new Error(
        `The translation file '${filePath}' does not include valid JSON`
      );
    }

    return {};
  }
}

function tryToReadLogo() {
  try {
    return readFileSync(join(__dirname, '..', 'src', 'custom', 'logo.svg'), 'utf8');
  } catch (error) {
    return '';
  }
}

function getTranslationsForLanguageCode(code) {
  const sourcePath = '../src';
  const defaultTranslationPath = `${sourcePath}/global/i18n/${code}.json`;
  const customTranslationsPath = `${sourcePath}/custom/translations/${code}.json`;

  const defaultTranslations = tryToReadTranslationFile(defaultTranslationPath);
  const customTranslations = tryToReadTranslationFile(customTranslationsPath);

  const translations = deepAssign(defaultTranslations, customTranslations);

  if (!translations.keys) {
    throw new Error(
      `The translations for "${code}" are missing a "keys" property.\nPlease add it in "${customTranslationsPath}"`
    );
  }

  if (!translations.label) {
    throw new Error(
      `The translations for "${code}" are missing a "label" property.\nPlease add it in ${customTranslationsPath}`
    );
  }

  return translations;
}

function getTranslations(supportedLanguages) {
  return supportedLanguages.map(code => ({
    code,
    translations: getTranslationsForLanguageCode(code),
  }));
}

function writeCustomizationAppFile({
  layout,
  logo,
  matomoUrl,
  matomoSiteId,
  sentryDSN,
  pandemicTrackingUrl,
  translations,
}) {
  const appFilePath = join(__dirname, '..', 'src', 'global', 'custom.ts');

  const fileContent = prettier.format(
    `
  // THIS FILE IS GENERATED VIA 'npm run prepare-translations'
  // IT IS BASED ON CONTENT under /src/custom
  // ! DON'T EDIT IT – EDITS WILL BE OVERWRITTEN !

  export const LANGUAGES = ${stringify(
    translations.map(({ code, translations }) => ({
      code,
      label: translations.label,
    }))
  )};

  export const LANGUAGE_RESOURCES = ${stringify(
    translations.reduce((acc, cur) => {
      acc[cur.code] = { translation: cur.translations.keys };
      return acc;
    }, {})
  )};

  // layout flag to adjust the header layout for charite and official collaborations
  export const LAYOUT = '${layout}';

  // custom logo defined in /src/custom/logo.svg
  export const CUSTOM_LOGO = \`${logo}\`;

  export const TRACKING_IS_ENABLED = ${!!(matomoUrl && matomoSiteId)};
  export const MATOMO_URL = '${matomoUrl}';
  export const MATOMO_SITE_ID = '${matomoSiteId}';
  export const ERROR_TRACKING_ENABLED = ${!!sentryDSN};
  export const SENTRY_DSN = '${sentryDSN}';
  export const PANDEMIC_TRACKING_IS_ENABLED = ${!!pandemicTrackingUrl};
  export const PANDEMIC_TRACKING_URL = '${pandemicTrackingUrl}';
  `,
    prettierOptions
  );

  writeFileSync(appFilePath, fileContent);
}

const {
  LAYOUT,
  MATOMO_URL,
  MATOMO_SITE_ID,
  SUPPORTED_LANGUAGES,
  SENTRY_DSN,
  PANDEMIC_TRACKING_URL,
} = process.env;
const supportedLanguages = SUPPORTED_LANGUAGES
  ? SUPPORTED_LANGUAGES.split(',')
  : ['de', 'en'];

const translations = getTranslations(supportedLanguages);
const logo = tryToReadLogo();

writeCustomizationAppFile({
  layout: LAYOUT,
  logo,
  matomoUrl: MATOMO_URL,
  matomoSiteId: MATOMO_SITE_ID,
  sentryDSN: SENTRY_DSN,
  pandemicTrackingUrl: PANDEMIC_TRACKING_URL,
  translations,
});
