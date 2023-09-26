// baseUrlSetup.js

Cypress.config("baseUrl", "https://staging.zesthrm.com");

// import { config } from "cypress/types/bluebird";
// Your test file
import "./";
it("should navigate to roles/new page", () => {
  cy.visit("/roles/new");
  cy.url().should("include", "/roles/new");
});