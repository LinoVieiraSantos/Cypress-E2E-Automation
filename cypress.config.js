const { defineConfig } = require("cypress");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  video: false,

  reporter: "mocha-allure-reporter",

  reporterOptions: {
    resultsDir: "allure-results",
  },

  e2e: {
    specPattern: "cypress/e2e/**/*.feature",

    baseUrl: "https://front.serverest.dev",

    viewportWidth: 1280,
    viewportHeight: 720,

    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    requestTimeout: 5000,
    responseTimeout: 30000,

    retries: {
      runMode: 2,
      openMode: 0,
    },

    async setupNodeEvents(on, config) {
      await addCucumberPreprocessorPlugin(on, config);

      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      return config;
    },
  },

  env: {
    allure: true,
  },
});