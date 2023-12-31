/// <reference types="cypress-xpath" />
import { credentials, testCredentials } from "../Validation/logs";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import 'chai-jquery';
import { login } from '../common_component/common_All';
describe('Login Test', () => {
  beforeEach(() => {
    login(credentials);
  });
describe("Verify Dashboard Data", () => {
  it("Check Dashboard Data Total Record", () => {
    cy.get(".ant-btn-primary").click();
    cy.get(".ant-row").should(($row) => {
      const expectedPattern =
        /(\d+)Total Users(\d+)Total Roles(\d+)Pending Leave Request/;
      const actualText = $row.text();
      expect(actualText).to.match(expectedPattern);
      const matches = actualText.match(expectedPattern);
      const [_, totalUsers, totalRoles, pendingLeaveRequests] = matches;
      const expectedText = `${totalUsers}Total Users${totalRoles}Total Roles${pendingLeaveRequests}Pending Leave Request`;
      expect(actualText).to.equal(expectedText);
    });
  });
  it("Add Leave From Dashboard", () => {
    cy.get(".ant-btn-primary").click();
    cy.get('.fc-day-today').click();
    cy.get('#title').type(faker.name.firstName());
    cy.get('#description').type(faker.lorem.sentence());
    const startDate = dayjs().add(1, 'day').format('DD-MM-YYYY');
    const endDate = dayjs().add(2, 'day').format('DD-MM-YYYY');
    cy.get('#start').invoke('val', startDate).trigger('change');
    cy.get('#end').invoke('val', endDate).trigger('change'); 
    cy.get('.ant-btn-primary').click();
  
  });
  it("Count Total Leaves", () => {
    cy.get('.fc-event-main').then(leaves => {
      const totalLeaves = Cypress.$(leaves).length;
      const styledOutput = `Total Leaves: ${totalLeaves}`;
      cy.log(styledOutput);
  
    });
  });
  });
});

