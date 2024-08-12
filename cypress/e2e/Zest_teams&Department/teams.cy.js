/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { login } from "../common_component/common_All";
import "cypress-file-upload";
const teamName = faker.company.name();
const description = `This Team, ${teamName}, focuses on ${faker.company.bsBuzz()} and ${faker.company.bsNoun()}.`;
describe("Teams management", () => {
  beforeEach(() => {
    login(credentials);
    cy.get('[href="/teams"]').click();
  });
  it("Add Team Verify Required Messages", () => {
    cy.xpath("//button[@class='ant-btn ant-btn-primary']").click();
    cy.xpath("//span[normalize-space()='Save']").click();
    // validation messages
    cy.get("#name_help").should("have.text", "Please enter team name");
    cy.get("#teamLeader_help").should("have.text", "Please select team Leader");
    cy.get("#uniqueIdentifier_help").should(
      "have.text",
      "Please enter unique identifier"
    );
    cy.get("#members_help").should("have.text", "Please select team member");
  });
  it("Add Team", () => {
    cy.xpath("//button[@class='ant-btn ant-btn-primary']").click();
    cy.get("#name").should("be.visible").type(teamName);
    cy.get("#manager_name").click();
    cy.get(".rc-virtual-list-holder-inner>").eq(2).click();
    cy.get("#uniqueIdentifier").type(faker.datatype.uuid());
    cy.get("#team_member").click();
    cy.wait(3000);
    cy.get(
      '[style="height: 594px; position: relative; overflow: hidden;"] > .rc-virtual-list-holder-inner > :nth-child(3)'
    ).click();
    cy.get(".ant-modal-body").click();
    cy.get("#description").type(description);
    cy.get(".ant-upload-drag").click();
    cy.uploadFile("testimg.png", "png");
    cy.xpath("//span[normalize-space()='Save']").click();
    cy.get(".ant-notification-notice-description").should("be.visible");
    cy.contains("Team created successfully");
  });
  it("Update Team", () => {
    cy.xpath(`//a[normalize-space()='${teamName}']`).click();
    cy.xpath("//span[contains(text(),'Edit')]").click();
    cy.xpath("//span[normalize-space()='Save']").click();
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Team updated successfully"
    );
  });
  it("Add Existing member", () => {
    cy.xpath(`//a[normalize-space()='${teamName}']`).click();
    cy.xpath("//span[contains(text(),'Add Members')]").click();
    cy.xpath("//h1[normalize-space()='Existing member']").click();
    const indices = [1, 2, 3];
    indices.forEach((index) => {
      cy.get(".ant-table-selection-column").eq(index).click();
    });
    cy.xpath("//span[normalize-space()='Add']").click();
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Member assign successfully"
    );
  });
  it("Unassign Members", () => {
    cy.xpath(`//a[normalize-space()='${teamName}']`).click();
    cy.xpath("//span[contains(text(),'Add Members')]").click();
    cy.xpath("//h1[normalize-space()='Existing member']").click();
    cy.get('.ant-table-selection-column input[type="checkbox"]').each(
      ($checkbox) => {
        if ($checkbox.prop("checked")) {
          cy.wrap($checkbox).click();
        }
      }
    );
  });
  it("Add Teams", () => {
    cy.xpath(`//a[normalize-space()='${teamName}']`).click();
    cy.get('[data-node-key="sub-teams"]').click();
    cy.xpath("(//span[contains(text(),'Add Team')])[3]").click();
    cy.xpath("//h1[normalize-space()='Add Existing team']").click();
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
  it("Team Unassign", () => {
    cy.xpath(`//a[normalize-space()='${teamName}']`).click();
    cy.get('[data-node-key="sub-teams"]').click();
    cy.get(".ant-space-item > .ant-btn").eq(2).click();
    cy.xpath("//h1[normalize-space()='Add Existing team']").click();
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
  it("Delete Team", () => {
    cy.xpath(`//a[normalize-space()='${teamName}']`).click();
    cy.get('[data-node-key="settings"]').click();
    cy.get(".ant-list-item-meta-title").last().click();
    cy.get("#text").type(teamName);
    cy.xpath("//span[normalize-space()='Delete']").click();
    cy.get(".ant-notification-notice-description").should(
      "be.visible",
      "Team deleted successfully"
    );
  });
});
