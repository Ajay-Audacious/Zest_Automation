/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { verifyErrorRole } from "../Validation/errorValidation";
describe("Update employee Details", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
    cy.get("input[type=text]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("#submit").click();
    cy.contains("Setting", { timeout: 5000 }).click();
  });

  it('Verfiy Error message', () => {
    cy.get('#editUser_name').clear();
    cy.get('#register_contact').clear();
    cy.get('#submit').click();
    cy.get("#editUser_name_help").should("contain", "Please enter name");
    cy.get("#editUser_contactNumber_help").should("contain", "Please enter atleast 10 digits contact number");
  });
  it('Update Details', () => {
    cy.get('#editUser_name').clear().type('SuperAdmin')
    cy.get('#register_contact').clear().type('9876543210')
    cy.contains('Single').click(); //If change otherwise comment a same
    cy.get('#submit').click();
    cy.contains("Setting", { timeout: 5000 }).click();  //To check update details
    
  });

  it('Check Update Details on Profile overview page', () => {
    cy.xpath("//span[@class='ant-avatar ant-avatar-circle ant-avatar-icon ant-dropdown-trigger']").trigger('mouseover');
    cy.get('#profile').click();

  });
  
});