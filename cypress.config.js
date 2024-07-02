const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    pageLoadTimeout: 120000, // Increase to 120 seconds
    setupNodeEvents(on, config) {
      // implement node event listeners here if needed
    },
  },
});
