// const { defineConfig } = require("cypress");

// module.exports = defineConfig({
//   reporter: 'cypress-mochawesome-reporter', //For html report download
//   e2e: {
//     chromeWebSecurity: false,
//     pageLoadTimeout: 120000, // Increase to 120 seconds
//     setupNodeEvents(on, config) {
//       // implement node event listeners here if needed
//       require('cypress-mochawesome-reporter/plugin')(on); //for html report
//     },
//   },
// });

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      require("cypress-mochawesome-reporter/plugin")(on);
      return config;
    },
  },
  //Setup env for the login in this for the new 
  env: {
    URL: "https://naveenautomationlabs.com/opencart/index.php?route=account/register",
  },
});
