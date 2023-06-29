/// <reference types="cypress" />
import { credentials } from "../Validation/logs";
let totalLeaves = 0;
beforeEach(() => {
  cy.visit("https://staging.zesthrm.com");
  cy.viewport(3000, 1500);
  cy.get("input[type=text]").type(credentials.id);
  cy.get("input[type=password").type(credentials.password);
  cy.get("button[type=submit").click();
  cy.contains("Leaves").click();
  cy.get('.fc-daygrid-event').eq(0).click();
});

describe("Leaves", () => {
  it("Leave Approved", () => {
    cy.get('#leave_approve').click();
  });
  it("Reject Leave", () => {
    cy.get("#leave_reject").click();
    cy.get('#reject_leave').type("Sorry")
    cy.contains('OK').click();
  });

  it("Delete Leave", () => {
    cy.contains('Delete').click();
  });
  it('Pending Leave Delete', () => {
    cy.get('.fc-event-main').should('have.css','background-color','rgba(0, 0, 0, 0)');
    cy.contains('Delete').click();
  });
  
});
