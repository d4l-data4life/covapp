# Customization options

**⚠️ We do not support changes in the semantic meaning or evaluation logic of the questionnaire.**

**⚠️ Before you have a look at how to customize the application, make sure you followed [the development instruction](./DEVELOPMENT.md).**

The following instructions require a local development environment of this application including a functional `npm start` and `npm run build` command.

**⚠️ It is highly recommended to only use described customization options. Any other source code changes will break the ability to receive updates of the application.**

To apply and see below described changes of your environment or changes to the `custom` directory during development, you have to restart the `npm start` command.

## Internationalization and translation

This application supports several languages. **This repository includes translations for English (`en`) and German (`de`), with some placeholders (see below).** Languages and their language codes map to file names. For example, English translation files are named `en.json`.

Translations are key-value mappings. A key like `button_start_now` is defined and mapped to `Start questionnaire` in its corresponding language file.

### Adjustment of existing translation keys

You can control all the translation values in the application. The app provides two default translation files (`en.json`/`de.json`), that are located at `src/global/i18n/`. **These files don't need to be changed to make translation changes in these languages.**

To adjust keys, wording, addresses, ... create a new JSON file with the matching language code (`en.json`/`de.json`/`it.json`/...) in `src/custom/translations/`. Files in the `custom` directory overwrite possibly provided default translations.

To overwrite the value of the translation key `button_start_now` in English, add the file `src/custom/translations/en.json` to your project like the following:

```json
{
  "keys": {
    "button_start_now": "YOUR NEW START BUTTON TEXT"
  }
}
```

The folder structure with adjusted keys for English should look as follows:

```
/src
  |_ custom
      |_ translations
          |_ en.json
```

The best approach to find translation keys for strings in the application is to search for a value like `Start questionnaire` in the provided default file (e.g. `src/global/i18n/en.json`) . This way, you can find the translation key and provide your new translation value in `src/custom/translations/*.json`.

### Existing placeholders

Several keys in the application have placeholder content because their original content applies only to the original use case at the Charité-Unversitätsmedizin Berlin. You have to provide your own content and translations.

These keys are listed in the [`example.json`](../src/custom/translations/example.json) translation file as described above.

### Adding a new language

You can control which languages should be served by the application be renaming `.env.sample` in the root of this repository to `.env`. This file defines available environment variables.

The new `.env` file defines the supported languages via a `SUPPORTED_LANGUAGES` environment variable.

```
SUPPORTED_LANGUAGES=de,en
```

The value of this variable should include a comma-separated list of language codes. If you don't define supported languages, the applications will fall back to `en`. The included codes will be used to load default translation files at `src/global/i18n/`.

⚠️ If you plan to deploy your application via a CI/CD system, make sure to define `SUPPORTED_LANGUAGES` as an environment variable there, too.

To set up a new language, add a new language code like `it` to `SUPPORTED_LANGUAGES`. You `.env` file should then look as follows.

```
SUPPORTED_LANGUAGES=de,en,it
```

The `it` language code leads the application to look for translations in `src/custom/translations/it.json`. You can rename the provided `src/custom/translations/example.json` to `it.json` and it should look as follows.

```json
{
  "label": "Italiano",
  "keys": {
    "button_start_now": "YOUR NEW ITALIAN START BUTTON TEXT"
  }
}
```

⚠️ New languages have to provide a `label` property in their translation JSON file.

The folder structure with adjusted keys for e.g. Italian should look as follows:

```
/src
  |_ custom
      |_ translations
          |_ it.json
```

#### Using the example languages and contributing a new language

In the `src/custom/translations` folder, you find example translations by open source contributors 🙌

The files follow the `example.{language-id}.json` naming pattern, for example, `example.es.json` for Spanish. To include any of the language files, rename them by removing the example prefix and review them before releasing your custom application.

If you want to add more languages, open a pull request with your example JSON file which follows the naming pattern and is saved in the described file location.

## Changing of colors

To adjust the colors or do minor style tweaks, you can edit `src/custom/styles/app.css`. This stylesheet loads all the default styling included in the app but also gives you the possibility to add your own CSS.

**Make sure not to remove the line `@import '../../global/app.css';` or the styling of the application will be broken!**

An example `app.css` with adjusted colores could look as follows.

```css
/* REMOVING THE FOLLOWING LINE WILL BREAK THE STYLING OF THE APPLICATION */
@import '../../global/app.css';

:root {
  --c-primary: #ff3f97;
  --c-primary-light: #ff4ebb;
  --c-primary-lighter: #ff5fdf;
  --c-primary-lightest: #ff81ff;
}
```

You can a complete overview of all used colors in `src/global/styles/variables.css`.

While you can apply styles to other elements, too, **it is recommended to use this stylesheet only for minor tweaks like color changes**. Class names and HTML structures are most likely to change in future updates.

## How to add a custom logo

To set up a custom logo change `/src/custom/logo.svg`. This logo file will be automatically picked up and be included in the header index navigation.

The folder structure with a custom logo should look as follows:

```
/src
  |_ custom
      |_ logo.svg
```

⚠️ Currently, the application only supports SVG logos.

---

### ⚠️ Any changes to files that are not the `.env` file or are outside of the `custom` directory will break the possibility to receive future updates of the official CovApp.
