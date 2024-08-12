/// <reference types="cypress" />
import { credentials } from "../Validation/logs";
let totalLeaves = 0;
import { login } from "../common_component/common_All";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
    cy.get("#attendance").click();
    cy.contains("Leaves").click();
    cy.get(".fc-daygrid-event").eq(0).click();
  });

  describe("Leaves", () => {
    it("Leave Approved", () => {
      cy.get("#leave_approve").click();
      cy.contains("Leave approved successfully").should("be.visible");
    });
    it("Reject Leave", () => {
      cy.get("#leave_reject").click();
      cy.get("#reject_leave").type("Sorry");
      cy.contains("OK").click();
      cy.contains("Leave rejected successfully").should("be.visible");
    });

    it("Delete Leave", () => {
      cy.get("#leave_delete").click();
      cy.get("#delete_leave").type("No need thanks for the update");
      cy.contains("OK").click();
      cy.contains("Leave deleted successfully").should("be.visible");
    });
    it("Pending Leave Delete", () => {
      cy.get(".fc-event-main").should(
        "have.css",
        "background-color",
        "rgba(0, 0, 0, 0)"
      );
      cy.get("#leave_delete").click();
      cy.contains("OK").click();
      cy.contains("Leave rejected successfully").should("be.visible");
    });
    
  });
});
