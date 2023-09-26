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
    cy.get("input[type=text]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("#submit").click();
    cy.contains("Employee", { timeout: 5000 }).click();
  });
  it("Employee Delete", () => {
    const deleteEmployees = () => {
      cy.get(".ant-table-container").then(($employees) => {
        if ($employees.length === 0) {
          // If no employees are present, all employees are deleted
          return;
        }
        cy.get(".ant-table-row").each(($row) => {
          cy.wrap($row).find(":nth-child(2) > .ant-btn").click();
          cy.contains("Yes").click();
        });
        deleteEmployees();
      });
    };
    deleteEmployees();  // To repeated delete data 
    
  });
});
