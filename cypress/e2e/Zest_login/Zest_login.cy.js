/// <reference types="cypress" />
import { credentials } from "../Validation/logs";

describe("Zest_login", () => {
  beforeEach("", () => {
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
  });
  it("Incorrect Password", () => {
    cy.get("input[type=email]").type("superadmin@yopmail.com");
    cy.get("input[type=password").type("Demo@1234");
    cy.get("button[type=submit").click();
    cy.contains("Please enter correct email or password").should("be.visible");
    cy.url().should("include", "https://staging.zesthrm.com/login");
  });
  it("Verify error message", () => {
    cy.get("button[type=submit").click();
    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
    cy.url().should("include", "https://staging.zesthrm.com/login");
  });
  it("Positive Test case for Login", () => {
    cy.get("input[type=email]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("button[type=submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/");
  });
});
