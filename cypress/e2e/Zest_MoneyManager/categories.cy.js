/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import {
  generateRandomExpenseCategory,
  generateRandomIncomeCategory,
  login,
} from "../common_component/common_All";

const randomIncome = generateRandomIncomeCategory();
const randomExpense = generateRandomExpenseCategory();
let category = randomIncome.category;
let description = randomIncome.description;
describe("Login", () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Categories", { timeout: 5000 }).click();
  });

  it("Verify error message when saving without entering data", () => {
    cy.get("#add_categories").click();
    cy.contains("button.ant-btn-primary", "Save").click();
    cy.get("#Categories_name_help")
      .should("be.visible")
      .contains("Please enter name");
    cy.get("#Categories_description_help")
      .should("be.visible")
      .contains("Please enter description");
  });

  it("Add Categories with random data", () => {
    cy.get("#add_categories").click();
    cy.get("#Categories_name").type(category);
    cy.get("#Categories_description").type(description);
    cy.contains("button.ant-btn-primary", "Save").click();
  });
  it("Update First Categories", () => {
    cy.get(".ant-table-tbody")
      .find("tr")
      .first()
      .within(() => {
        cy.get('button[id$="_update"]').click();
      });
    // cy.get("#Categories_name").clear().type(); //No need to update this.
    // cy.get("#Categories_description").clear().type();
    cy.contains("button.ant-btn-primary", "Save").click();
  });
  it("Delete First Categories", () => {
    cy.get(".ant-table-tbody tr:first").within(() => {
      cy.get('button[id$="_delete"]').click();
    });
    cy.get("#text").type(category);
    cy.contains("button", "Delete").click();
  });
  it("Add Expense Category with random data", () => {
    cy.get("#add_categories").click();
    cy.get("#Categories_name").type(randomExpense.category);
    cy.get("#Categories_description").type(randomExpense.description);
    cy.contains("button.ant-btn-primary", "Save").click();
  });
});
