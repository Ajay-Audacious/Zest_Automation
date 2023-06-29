/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { faker } from "@faker-js/faker";
import { verifyErrorRole } from "../Validation/errorValidation";

const name = faker.name.findName();
const message = faker.lorem.sentence();
describe("Roles Test cases", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
    cy.get("input[type=text]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("#submit").click();
    cy.contains("Roles", { timeout: 5000 }).click();
  });
  it("CheckError Message", () => {
    cy.get("#add_role").click();
    cy.get("#role_submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/role/add");

    const errors = {
      register_name_help: "Please enter the role name",
      register_description_help: "Please enter the description",
      register_dashBoard_help:
        "Please enter at least one permission in dashboard",
    };
    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const message = errors[key];
        verifyErrorRole(key, message);
      }
    }
  });
  it("Add Role", () => {
    cy.get("#add_role").click();
    const message = faker.lorem.sentence();
    cy.get("#role_name").type(name);
    cy.get("#role_description").type(message);
    cy.get("div[id='register_dashBoard'] input[value='write']").check();
    cy.get("#role_submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/role/add");
  });
  it("Dublicate Roles", () => {
    cy.get("#add_role").click();
    cy.get("#role_name").type(name);
    cy.get("#role_description").type(message);
    cy.get("div[id='register_dashBoard'] input[value='write']").check();
    cy.get("#role_submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/role/add");
  });
  it("Search Role & Edit Role", () => {
    cy.get("#search_here").type(name);
    cy.get("#role_edit").click();
    cy.get("div[id='register_role'] input[value='admin']", { timeout: 5000 })
      .click()
      .should("be.visible");
    cy.get("#role_submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/roles");

  });
  it("Delete Role", () => {
    cy.get("#search_here").type(name);
    cy.get("#role_delete").click();
    cy.get("#role_submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/roles");
  });
});
