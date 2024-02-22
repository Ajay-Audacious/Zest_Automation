/// <reference types="cypress-xpath" />
import { Faker, faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { verifyErrorMessage } from "../Validation/errorValidation";
const deleteEmployees = require("../common_component/common_All");

describe("Roles Test cases", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
    cy.get("#login_email").type(credentials.id);
    cy.get('#login_password').type(credentials.password);
    cy.get("#submit").click();
  });
  it('New', () => {
    
    cy.contains("Users", { timeout: 5000 }).click();
  });
});