import { credentials } from "../Validation/logs";
import { changePassword } from "../Validation/logs";
// import { Faker, faker } from "@faker-js/faker";

describe("Security", () => {
  beforeEach("Security Change Password", () => {
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    cy.get("input[type=text]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("#submit").click();
    cy.contains("Setting", { timeout: 5000 }).click();
    cy.contains("Security", { timeout: 5000 }).click();
  });
  it("Verify error message", () => {
    cy.get("button[class='ant-btn ant-btn-primary _submitBB_euuxx_29']").click();
    cy.get("#changePassword_oldPassword_help").should("contain", "Please enter old password");
    cy.get("#changePassword_newPassword_help").should("contain", "Please enter new password");
    cy.get("#changePassword_confirmPassword_help").should("contain", "Please enter confirm password");
    

  });
  it('Change password', () => {
    cy.get('#changePassword_oldPassword').type(changePassword.oldPassword);
    cy.get('#changePassword_newPassword').type(changePassword.newPassword);
    cy.get('#changePassword_confirmPassword').type(changePassword.confirmPassword);
    cy.get("#submit").click();
  });
});
