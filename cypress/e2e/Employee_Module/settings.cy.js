/// <reference types="cypress-xpath" />
import { testCredentials } from "../Validation/logs";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import 'chai-jquery';
const updateName = faker.name.findName();
beforeEach(() => {
    cy.visit("https://staging.zesthrm.com");
    cy.get("input[type=text]").type(testCredentials.id);
    cy.get("input[type=password").type(testCredentials.password);
    cy.get("button[type=submit").click();
    cy.viewport(1920, 1080)
    cy.contains("Setting").click();
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
  });

  describe('Setting module update employee',()=>{
    //Update Name only
it('Setting Update Employee', () => {
    cy.get("input[placeholder='Enter Name']").clear().type(updateName);
    cy.get("button[type=submit").click();  
});

it('Update Password', () => {
    cy.contains("Security").click();
    cy.get("input[placeholder='Enter old password']").type(testCredentials.password);
    cy.get("input[placeholder='Enter new password']").type(testCredentials.password);
    cy.get("input[placeholder='Enter confirm password']").type(testCredentials.password); 
});
});
