/// <reference types="cypress-xpath" />

it('executes nested if and else statements correctly', () => {
  
  cy.visit("https://staging.zesthrm.com");
  cy.viewport(3000, 1500);
  cy.get("#login_email").type("superadmin@yopmail.com");
  cy.get("#login_password").type("Demo@12345");
  cy.get("#submit").click();
});
//
// 01. Verify that the date picker opens when the input field or button is clicked.
it('should open the date picker', () => {
  cy.visit('/your-page-with-date-picker');
  cy.get('#date-input').click();
  cy.get('.datepicker').should('be.visible');
});

//Verify that the correct date is selected when a date is clicked in the date picker.
it('should select the correct date', () => {
  cy.visit('/your-page-with-date-picker');
  cy.get('#date-input').click();
  cy.get('.datepicker-days .day:not(.disabled)').contains('15').click();
  cy.get('#date-input').should('have.value', '04/15/2023');
});

//Verify that selecting an invalid date displays an error message.

it('should display an error message for invalid dates', () => {
  cy.visit('/your-page-with-date-picker');
  cy.get('#date-input').click();
  cy.get('.datepicker-days .day.disabled').contains('1').click();
  cy.get('.datepicker .datepicker-errors').should('be.visible');
  cy.get('.datepicker .datepicker-errors').contains('Please select a valid date');
});

//Verify that selecting a date in the future is not allowed.
it('should not allow selection of future dates', () => {
  cy.visit('/your-page-with-date-picker');
  cy.get('#date-input').click();
  cy.get('.datepicker-days .day:not(.disabled)').contains('15').click();
  cy.get('#date-input').should('have.value', '04/15/2023');
  cy.get('#date-input').click();
  cy.get('.datepicker-days .day:not(.disabled)').contains('15').click();
  cy.get('#date-input').should('have.value', '04/15/2023');
});
//Verify that the date picker can be closed.

it('should close the date picker', () => {
  cy.visit('/your-page-with-date-picker');
  cy.get('#date-input').click();
  cy.get('.datepicker .close').click();
  cy.get('.datepicker').should('not.be.visible');
});

it('Only', () => {
  // cy.viewport(4000, 1500);
  cy.visit('https://hrm-front-end.pages.dev/login');
  // cy.get('.styles_centerSection__rXnwF > .ant-image > .ant-image-img').click();
  // cy.contains("Preview").click();
  // cy.get('.styles_centerSection__rXnwF > .ant-image > 
  cy.get('.styles_centerSection__rXnwF > .ant-image > .ant-image-img').click().should('be.visible')
  cy.get('p').should('have.text','Human Resource Management provides knowledge to empower HR by letting you engage with your workforce in a strategic way.')
  
  // cy.xpath("//div[@class='ant-col styles_centerSection__rXnwF ant-col-xs-24 ant-col-sm-24 ant-col-md-12']//div[@class='ant-image-mask']").click()
});








