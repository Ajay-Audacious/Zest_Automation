/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import { faker } from "@faker-js/faker";
const email = `${faker.internet.userName()}@yopmail.com`; //To be create end point @yopmail.com

describe("Signup Onboarding", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
      });
    cy.visit("https://staging.zesthrm.com/signup");
    cy.viewport(3000, 1500);
  });
  it("Create an account", () => {
    cy.get("#login_name").type(faker.name.firstName());
    cy.get("#login_email").type(email);
    cy.get("#login_org_name").type(faker.company.companyName());
    cy.get("#login_industry_type").type(faker.company.bs());
    cy.get('#horizontal_signup_terms').click();
    cy.get("#submit").click();
  });
});
