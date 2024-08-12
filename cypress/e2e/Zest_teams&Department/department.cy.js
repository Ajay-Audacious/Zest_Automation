/// <reference types="cypress" />
/// <reference types="cypress-xpath"/>
import { faker } from "@faker-js/faker";
import { login } from "../common_component/common_All";
import { credentials } from "../Validation/logs";
import "cypress-file-upload";

const departmentName = faker.commerce.department();
const description = `This department, ${departmentName}, focuses on ${faker.company.bsBuzz()} and ${faker.company.bsNoun()}.`;

describe("Department Management", () => {
  beforeEach(() => {
    login(credentials);
    cy.wait(5000);
    cy.get('[href="/departments"]').click();
  });
  it("Verify Error Message", () => {
    cy.get("#add_role").click();
    cy.xpath("//span[normalize-space()='Save']").click();
    cy.get("#name_help").should("have.text", "Please enter department name");
    cy.get("#leaderId_help").should("have.text", "Select department leader");
    cy.get("#uniqueIdentifier_help").should(
      "have.text",
      "Please enter unique identifier"
    );
  });

  it("Add Department", () => {
    cy.get("#add_role").click();
    cy.get("#name").type(departmentName);
    cy.get("#manager_name").click();
    cy.get(".rc-virtual-list-holder-inner>").eq(2).click();
    cy.get("#uniqueIdentifier").type(faker.datatype.uuid());
    cy.get("#description").type(description);
    cy.get(".ant-upload-drag").click();
    cy.uploadFile("testimg.png", "png");
    cy.xpath("//span[normalize-space()='Save']").click();
    cy.contains("Department create successfully").should("be.visible");
  });
  it("Department Update", () => {
    cy.xpath(`//a[normalize-space()='${departmentName}']`).click();
    cy.xpath("//span[contains(text(),'Edit')]").click();
    cy.xpath("//span[normalize-space()='Save']").click();
    cy.contains("Department update successfully").should("be.visible");
  });

  it("Add Teams", () => {
    cy.xpath(`//a[normalize-space()='${departmentName}']`).click();
    cy.get(".ant-empty-footer").click();
    cy.xpath("//h1[normalize-space()='Existing team']").click();
    const indices = [1, 2, 3];
    indices.forEach((index) => {
      cy.get(".ant-table-selection-column").eq(index).click();
    });
    cy.xpath("//span[normalize-space()='Add']").click();
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Team assign successfully"
    );
  });
  it("Unassign the Team", () => {
    cy.xpath(`//a[normalize-space()='${departmentName}']`).click();
    cy.get(".ant-page-header-heading-extra > ").eq(1).click();
    cy.xpath("//h1[normalize-space()='Existing team']").click();
    const indices = [1, 2, 3];
    indices.forEach((index) => {
      cy.get(".ant-table-selection-column").eq(index).click();
    });
    cy.xpath("//span[normalize-space()='Add']").click();
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Team Unssign successfully"
    );
  });
  it("Delete Department", () => {
    cy.xpath(`//a[normalize-space()='${departmentName}']`).click();
    cy.get('[data-node-key="settings"]').click();
    cy.get(".ant-list-item-meta-title").last().click();
    cy.get("#text").type(departmentName);
    cy.xpath("//span[normalize-space()='Delete']").click();
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Department deleted successfully"
    );
  });
});
