/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { login } from "../common_component/common_All";
describe("Login", () => {
  beforeEach(() => {
    login(credentials);
    cy.get('[href="/money-manager/report"]', { timeout: 5000 }).click();
  });
  it("Filters data for each option", () => {
    const options = ["This Month", "Last Month"];
    cy.wrap(options)
      .each((option) => {
        cy.get(`[title="${option}"]`)
          .click()
          .then(() => {
            cy.wait(5000);
          });
      })
      .then(() => {});
  });
});
