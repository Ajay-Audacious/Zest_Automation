/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { faker } from "@faker-js/faker";
import { verifyErrorRole } from "../Validation/errorValidation";

const name = faker.name.findName();
const message = faker.lorem.sentence();
import { login, rolesErrorMessage } from '../common_component/common_All';
describe('Login Test', () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Roles", { timeout: 5000 }).click();
  });
  describe("Roles Test cases", () => {
    it("CheckError Message", () => {
      rolesErrorMessage(); //Verify the all placeholder error message
  });
  it("Add Role", () => {
    cy.get("#add_role").click();
    const message = faker.lorem.sentence();
    cy.get("#role_name").type(name);
    cy.get("#role_description").type(message);
    cy.get("div[id='register_dashBoard'] input[value='write']").check();
    cy.get("#role_submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/roles/new");
  });
  it("Dublicate Roles", () => {
    cy.get("#add_role").click();
    cy.get("#role_name").type(name);
    cy.get("#role_description").type(message);
    cy.get("div[id='register_dashBoard'] input[value='write']").check();
    cy.get("#role_submit").click();
    cy.url().should("include", "https://staging.zesthrm.com/roles/new");
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
});