/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

beforeEach(() => {
  cy.visit("https://hrm-front-end.pages.dev/login");
  cy.get('input[type=text]').type(credentials.id);
  cy.get('input[type=password').type(credentials.password);
  cy.get("button[type=submit").click();
  cy.viewport(5000, 4000);
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});
describe("Dashboard", () => {

  it.only("Add Leave From Dashboard", () => {
    cy.get(".ant-btn-primary").click();
    cy.get('.fc-day-today').click();
    cy.get('#title').type(faker.name.firstName());
    cy.get('#description').type(faker.lorem.sentence());
    const startDate = dayjs().add(1, 'day').format('DD-MM-YYYY');
    const endDate = dayjs().add(2, 'day').format('DD-MM-YYYY');
    cy.get('#start').invoke('val', startDate).trigger('change');
    cy.get('#end').invoke('val', endDate).trigger('change'); 
    cy.get('.ant-btn-primary').click();
    const leaveAlreadyApplied = Cypress.$(`[data-start="${startDate}"][data-end="${endDate}"].already-applied`);
  if (leaveAlreadyApplied) {
    cy.contains('You have already applied for this date leave');
  }
  });
  it("Apply Past date leave", () => {
    cy.get(".ant-btn-primary").click();
  cy.get('.fc-day-future:not(.already-applied)').then(($days) => {
    if ($days.length > 0) {
      cy.wrap($days[0]).click();
      cy.get('#title').type(faker.name.firstName());
      cy.get('#description').type(faker.lorem.sentence());
      const startDate = dayjs().add(1, 'day').format('DD-MM-YYYY');
      const endDate = dayjs().add(2, 'day').format('DD-MM-YYYY');
      cy.get('#start').invoke('val', startDate).trigger('change');
      cy.get('#end').invoke('val', endDate).trigger('change');
      cy.get('.ant-btn-primary').click();
    } else {
      cy.contains('You have already applied for this date leave').should('not.exist');
    }
  })

  });

  it.skip("Click on Apply Leave Date", () => {
    cy.get(".ant-btn-primary").click();
    cy.get(`[data-start="${startDate}"][data-end="${endDate}"]`).click();
  });
  
  
  it("Check Dashboard Data Total Record", () => {
  cy.get(".ant-btn-primary").click();
  cy.get('.ant-row').should(($row) => {
    const expectedPattern = /(\d+)Total Users(\d+)Total Roles(\d+)Pending Leave Request/;
    const actualText = $row.text();
    expect(actualText).to.match(expectedPattern);
    const matches = actualText.match(expectedPattern);
    // expect(matches).to.not.be.null;
    // expect(matches.length).to.equal(4);
    const [_, totalUsers, totalRoles, pendingLeaveRequests] = matches;
    const expectedText = `${totalUsers}Total Users${totalRoles}Total Roles${pendingLeaveRequests}Pending Leave Request`;
    expect(actualText).to.equal(expectedText);
  });
  });
  it("Count Total Leaves", () => {
    cy.get('.fc-event-main').then(leaves => {
      const totalLeaves = Cypress.$(leaves).length;
      const styledOutput = `Total Leaves: ${totalLeaves}`;
      cy.log(styledOutput);
  
    });
  });
});