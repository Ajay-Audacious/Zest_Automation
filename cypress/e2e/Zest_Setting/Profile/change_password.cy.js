import { credentials } from "../../Validation/logs";
import { changePassword } from "../../Validation/logs";
// import { Faker, faker } from "@faker-js/faker";
import { login } from '../../common_component/common_All';
describe('Login Test', () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Setting", { timeout: 5000 }).click();
    cy.get('#Profile').click();
    cy.contains("Security", { timeout: 5000 }).click();
  });
  describe('Change Password', () => {
    it("Verify error message", () => {
    cy.get("#save").click();
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

});