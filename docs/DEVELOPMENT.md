# Setup and development

## Requirements

- a GitHub account
- Node.js and npm available in your environment
- git available in your environment

### A GitHub account

[GitHub](https://github.com) is a development platform that developers commonly use for open source development. You can [sign up for free](https://github.com/join).

### git, Node.js and npm

[git](https://git-scm.com/) is a distributed version control system that developers use to collaborate on and share code. You can install it via your package manager of choice or download it from [git-scm.com](https://git-scm.com/downloads).

[Node.js](https://nodejs.org/en/) is a JavaScript runtime that runs on the server and your local development machine. You can install it via your package manager of choice or download and install it manually from [nodejs.org](https://nodejs.org). Node.js comes with its own package manager called [npm](https://www.npmjs.com/).

⚠️ git, Node.js and npm are crucial to create your customized CovApp-version. Before you continue, make sure the following commands look similar in your command line/terminal.

#### Check if Node.js is properly installed by running its `version` command

```sh
node --version
# v13.11.0
```

#### Check if npm is properly installed by running its `version` command

```sh
npm --version
# 6.14.3
```

#### Check if git is properly installed by running its `version` command

```sh
git --version
# git version 2.26.0
```

## Forking of the CovApp repository

The recommended way of developing your custom CovApp-version is to fork this repository. A GitHub fork gives you the possibility to make a "copy" of the original repository and perform changes while keeping the chance to receive future updates. To find more information about the concept of a fork, visit [GitHub's documentation](https://help.github.com/en/github/getting-started-with-github/fork-a-repo).

## Install

After you forked the repository and have a copy of the application code stored in your personal GitHub account, clone your fork to your local machine.

```sh
git clone https://github.com/YOUR-USERNAME/covapp
> Cloning into `covapp`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```

Navigate into the new directory.

```sh
cd covapp
```

The application heavily relies on dependencies that are served via npm with install-scripts enabled. To install all dependencies run `npm ci` inside of the `covapp` directory.

```sh
npm ci
```

## Essential development and release commands

To develop and build the application, two primary commands are available. Both commands build and bundle the application in the `www` directory.

### `npm start` for local development

Use `npm start` for main development. The command bundles the code and starts a local webserver at `localhost:3333`. The `start` command reacts to file changes inside of the repository and rebuilds the updated application.

Its output should look as follows:

```sh
npm start

> infection-risk-assessment-app@1.7.0 prestart /Users/stefan/Sites/infection-risk-assessment
> npm run prepare-customization

> infection-risk-assessment-app@1.7.0 prepare-customization /Users/stefan/Sites/infection-risk-assessment
> node ./scripts/prepare-customization.js

> infection-risk-assessment-app@1.7.0 start /Users/stefan/Sites/infection-risk-assessment
> stencil build --dev --watch --serve --no-open

[52:54.4]  @stencil/core v1.11.0 🍿
[52:56.6]  build, app, dev mode, started ...
[52:56.6]  transpile started ...
[53:01.7]  transpile finished in 5.03 s
[53:01.7]  copy started ...
[53:01.7]  generate lazy started ...
[53:01.9]  copy finished (12 files) in 236 ms
[53:03.3]  generate lazy finished in 1.65 s
[53:03.3]  build finished, watching for changes... in 6.73 s
```

⚠️ It is not recommended to upload/deploy the `www` directory after running `npm start`. Use `npm run build` instead.

### `npm run build` to generate a deployable application

Use `npm run build` to build a release-ready application. The command prepares and minifies the source code for a production environment.

Its output should look as follows:

```sh
npm run build

> infection-risk-assessment-app@1.7.0 prebuild /Users/stefan/Sites/infection-risk-assessment
> npm run prepare-customization

> infection-risk-assessment-app@1.7.0 prepare-customization /Users/stefan/Sites/infection-risk-assessment
> node ./scripts/prepare-customization.js

> infection-risk-assessment-app@1.7.0 build /Users/stefan/Sites/infection-risk-assessment
> stencil build

[54:33.4]  @stencil/core v1.11.0 🍿
[54:35.0]  build, app, prod mode, started ...
[54:35.0]  transpile started ...
[54:39.4]  transpile finished in 4.45 s
[54:39.4]  copy started ...
[54:39.4]  generate lazy started ...
[54:39.7]  copy finished (12 files) in 240 ms
[54:50.6]  generate lazy finished in 11.13 s
[54:50.6]  build finished in 15.67 s

```

### Deployment of the application

After a successful `npm run build` the `www` directory includes a JavaScript application that is deployable and completely works by itself.

⚠️ The generated code bundles a modern single page application. Your hosting service has to offer the possibility to serve the same `index.html` file with a `200` HTTP status code for different routes (`/`, `/imprint`, ...).

There is no additional server-side logic needed and you can upload the directory to any hosting services that support static file hosting and serving the base `index.html` file to all URL paths. Uploading files via FTP works fine as well as using modern hosting services like [Netlify](https://www.netlify.com/).

**After a successful `npm run build` command you can start [customizing your CovApp](./CUSTOMIZATION.md).**

---

## Additional development commands

For advanced development, the application includes several other commands. **You only need these commands if you want to perform changes going further than [the provided customization options](./CUSTOMIZATION.md).**

```sh
# Run the unit tests once
npm test

# Run a production build and visualize the generated bundle
npm run analyze

# Run the unit tests and watch for file changes during development
npm run test:watch

# Automatically fix potential code formatting issues
npm run code-format
```

## Code formatting

We're relying on [Prettier](https://prettier.io/) as our code formatter tool of choice. You can find the defined rules in the `.prettierrc` file and the ignored files at `.prettierignore`.

To check and automatically fix potential code formatting issues, use the `npm run code-format` command.
