/// <reference types="cypress" />
import { credentials } from "../Validation/logs";
let totalLeaves = 0;
import { login } from '../common_component/common_All';
describe('Login Test', () => {
  beforeEach(() => {
    login(credentials);
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
});
