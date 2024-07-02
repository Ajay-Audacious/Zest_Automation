/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import {
  generateRandomAnnouncement,
  getCurrentDate,
  login,
} from "../common_component/common_All";
describe("Login", () => {
  beforeEach(() => {
    login(credentials);
    cy.get('[href="/announcements"]', { timeout: 5000 }).click();
  });
  it("Add announcements", () => {
    const announcement = generateRandomAnnouncement();
    cy.contains("Add").click();
    cy.get("#title").type(announcement.type);
    cy.get("#startDate").click();
    cy.get("#startDate").type(getCurrentDate()).click();
    cy.get(".ant-picker-cell-today").click();
    cy.get("#description").type(announcement.description);
    cy.get("#endDate").click();
    cy.get("#endDate").type(getCurrentDate()).click();
    cy.get(".ant-picker-cell-today").last().click();
    cy.contains("Preview").click();
    cy.contains("Save").click();
  });
  it("Delete Announcements", () => {
    cy.get(".ant-table-tbody")
      .find("tr")
      .first()
      .within(() => {
        cy.get('button[id$="_delete"]').click();
      });
    cy.get("#text").type(announcement.type);
    cy.get(".ant-btn-dangerous").click();
    cy.get(".ant-message-notice-content")
      .should("be.visible")
      .contains("Announcement deleted successfully");
  });
});
