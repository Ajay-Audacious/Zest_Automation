/// <reference types="cypress-xpath" />
// import { login, orgErrorMessage } from "../common_component/common_All";
// import { credentials } from "../../Validation/logs";
const dayjs = require("dayjs");
describe("Login Test", () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Settings", { timeout: 5000 }).click();
    cy.contains("Organization", { timeout: 5000 }).click();
    cy.get('[data-node-key="holidays"]').click();
  });

  describe("Add Holidays", () => {
    it("Add Holidays", () => {
      cy.get("#add_holiday").click();
      cy.get("#title").type("15 August");
      cy.get('#startDate').click();
      cy.get("td[title='2023-08-15']").click();
      cy.get("input[type='checkbox']").click();
      cy.get("#description").type("Happy Independence Day");
      cy.contains('Save').click();
    });
    it('Update Holiday', () => {
      cy.get('span[aria-label="edit"]').eq(0).click();
      cy.get('#description').clear().type("Enjoy Your Day");
      cy.contains("Save").click();
      cy.contains("Holiday updated successfully.").should("be.visible");
    });
    it('Delete Holiday', () => {
      cy.get('span[aria-label="delete"]').eq(0).click();
      cy.contains("Do you want to delete this holiday?").should("be.visible");
      cy.get('#yes').click();
    });
  });
});
