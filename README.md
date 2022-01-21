# electron-demo-app

[![Workflow status](https://github.com/sep/electron-demo-app/actions/workflows/node.js.yml/badge.svg)](https://github.com/sep/electron-demo-app/actions/workflows/node.js.yml)

This is a demonstration of an Electron desktop app with basic CI/CD and cross-platform functionality.

Our goals with this app are to learn how to:

* structure a basic Electron app
* use TypeScript
* build installers for Linux, Mac, and Windows
* automated testing
* use the CI/CD functionality (workflows) of GitHub with an Electron app

# Usage

You'll need [Node.js](https://nodejs.org/) installed on your computer in order to build this app.

```
$ git clone https://github.com/sep/electron-demo-app
$ cd electron-demo-app
$ npm install
$ npm start
```

# Other commands

* **compile** - transpile TypeScript into JavaScript
* **start** - launch the Electron app
* **lint** - run ESLint
* **test** - run automated _UNIT_ tests
* **test-*-*** - run automated _INTEGRATION_ tests with the specified tool and platform
* **package** - bundle the Electron app to get it ready for distribution
* **make-*** - make installer for the specified platform(s)
