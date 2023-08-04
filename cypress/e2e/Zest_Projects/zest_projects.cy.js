/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { login, projectsErrorMessage } from "../common_component/common_All";
import dayjs from "dayjs";
const projectName = faker.company.companyName();
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Projects", { timeout: 5000 }).click();
  });
  describe("Projects", () => {
    it("Check Validation for Projects", () => {
      projectsErrorMessage(); //Validation Error message verify
    });
    it("Create a Project", () => {
      cy.get('#add_project').click();
      cy.get("#project_name").type(projectName);
      cy.get("#project_managerId").click();
      cy.get(".ant-select-item-option-content").first().click();
      cy.get('#start_date').click();
      cy.get(`[title=${dayjs().format("YYYY-MM-DD")}]`).click();
      cy.get("#project_estimatedEndDate").click();
      cy.get(`[title=${dayjs().add(1, "day").format("YYYY-MM-DD")}]`)
        .last()
        .click();
      cy.get("#project_endDate").click();
      cy.get(`[title=${dayjs().add(1, "day").format("YYYY-MM-DD")}]`)
        .last()
        .click();
      cy.get("#project_submit").click();
    });
    it("Create a Dublicate Projects", () => {
      cy.get('#add_project').click();
      cy.get("#project_name").type(projectName);
      cy.get("#project_managerId").click();
      cy.get(".ant-select-item-option-content").first().click();
      cy.get("#project_startDate").click();
      cy.get(`[title=${dayjs().format("YYYY-MM-DD")}]`).click();
      cy.get("#project_estimatedEndDate").click();
      cy.get(`[title=${dayjs().add(1, "day").format("YYYY-MM-DD")}]`)
        .last()
        .click();
      cy.get("#project_endDate").click();
      cy.get(`[title=${dayjs().add(1, "day").format("YYYY-MM-DD")}]`)
        .last()
        .click();
      cy.get("#project_submit").click();
      cy.contains("Project name is already exist.").should("be.visible");
    });
    it("Update Project Details", () => {
      cy.get("#search_here").type("list");
      cy.get('button span[aria-label="edit"]').first().click();
      cy.get("#project_endDate").click();
      cy.get(`[title=${dayjs().add(2, "day").format("YYYY-MM-DD")}]`)
        .last()
        .click();
      cy.get("#project_submit").click();
    });
    it("Delete Project Details", () => {
      cy.get("#search_here").type(projectName);
      cy.get('button span[aria-label="delete"]').first().click();
      cy.contains("Do you want to remove this project?").should("be.visible");
      cy.contains("Yes").click();
      cy.contains("Project Deleted Successfully").should("be.visible");
    });
  });
});
