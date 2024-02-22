/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { login } from "../common_component/common_All";
const invoiceNumber = faker.datatype.number(); // Move this line inside the test case
describe("Login", () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Income", { timeout: 5000 }).click();
  });

  it("Verify error message when saving without entering data", () => {
    cy.contains("Save").click();
    cy.get("#income-and-expenses_invoiceNo_help")
      .should("be.visible")
      .contains("Please enter invoice no");
    cy.get("#income-and-expenses_category_help")
      .should("be.visible")
      .contains("Please select category");
    cy.get("#income-and-expenses_mode_help")
      .should("be.visible")
      .contains("Please select mode");
    cy.get("#income-and-expenses_amount_help")
      .should("be.visible")
      .contains("Please enter amount");
  });
  it("Add Incomes", () => {
    cy.get("#add_incoms").click();
    cy.get("#income-and-expenses_invoiceNo").type(invoiceNumber);
    cy.get("#income-and-expenses_category").type("commission");
    cy.get('[title="Commission"]').click();
    cy.get("#income-and-expenses_mode").type("IMPS");
    cy.get("#income-and-expenses_amount").type("15000");
    cy.get("#income-and-expenses_description").type(
      "No needs to add description in commission"
    );
    cy.contains("Save").click();
    cy.get(".ant-message-notice-content")
      .should("be.visible")
      .contains("Income added successfully");
  });
  it("Update Income", () => {
    cy.get(".ant-table-tbody")
      .find("tr")
      .first()
      .within(() => {
        cy.get('button[id$="_update"]').click();
      });
    cy.get("#income-and-expenses_amount").clear().type("20000");
    cy.contains("Save").click();
  });
  it("Delete Income", () => {
    cy.get(".ant-table-tbody")
      .find("tr")
      .first()
      .within(() => {
        cy.get('button[id$="_delete"]').click();
      });
    cy.get("#text").type(invoiceNumber);
    cy.contains(
      "button.ant-btn.ant-btn-default.ant-btn-dangerous",
      "Delete"
    ).click();
  });
  it("Filter current month data", () => {
    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }
    const currentDate = new Date();
    const firstDayOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startDate = formatDate(firstDayOfMonth);
    // Set the date values in the input fields
    cy.get("#start_date").click();
    cy.get("#start_date").type(startDate);
    cy.get(".ant-picker-cell-start").first().click();
  });
});
