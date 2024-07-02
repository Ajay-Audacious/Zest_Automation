/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { login } from "../common_component/common_All";
const companyName = faker.company.bsBuzz();
describe("Login", () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Payroll", { timeout: 5000 }).click();
    cy.get("#salary_templates").click();
  });
  it.only("Add Salary Template", () => {
    cy.get("#add_holiday").click();
    cy.get("#SalaryTemplate_templateName").type(companyName);
    cy.get("#SalaryTemplate_description").type("For this ORG Template");
    // Earningss
    cy.get("#SalaryTemplate_earnings_0_title").click();
    cy.get("#SalaryTemplate_earnings_0_title").type("Medical");
    cy.get("#SalaryTemplate_earnings_0_amount").type("3000");
    cy.get('svg[data-icon="plus-circle"]').first().click();
    cy.get("div#type").click();
    
    // cy.get('#SalaryTemplate_earnings_1_title').type("Basic");
    // cy.get('#SalaryTemplate_earnings_1_amount').type("40");
    // Deduction
    // cy.get("#SalaryTemplate_deductions_0_title").click();
    // cy.get('div.ant-select-item-option-content:contains("Percentage")').eq().last().click();
  });
});
