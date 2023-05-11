const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    MAILSLURP_API_KEY:
      "9898dec47b0baa693f8fffff8d5a14345e957702eceb59df8fe7c7d9bbccac59",
  },
  e2e: {
    defaultCommandTimeout: 40000,
    responseTimeout: 40000,
    requestTimeout: 40000,
    setupNodeEvents(on, config) {
      // return require('./cypress/support/index.js')(on, config)
    },
    baseUrl: 'http://preprod.backmarket.fr/'
  },
});
