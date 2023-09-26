/// <reference types="cypress-xpath" />
// import 'cypress-file-upload';
// const dayjs = require("dayjs");
// describe("Login Test", () => {
//   beforeEach(() => {
//     // login(credentials);
//     cy.viewport(3000, 1500);
//     cy.visit("https://staging.zesthrm.com/login");
//     cy.get("#login_email").type("superadmin@yopmail.com");
//     cy.get("#login_password").type("Demo@12345");
//     cy.get("#submit").click();
//     cy.contains("Settings", { timeout: 5000 }).click();
//     cy.contains("Organization", { timeout: 5000 }).click();
//     cy.get('[data-node-key="holidays"]').click();
//   });
//   it.only("Add Holidays", () => {
//     cy.get("#add_holiday").click();
//     cy.get("#title").type("15 August");
//     cy.get('#startDate').click();
  
//     // Function to select the desired date, scrolling to it if necessary
//     const selectDate = () => {
//       cy.get("td[title='2023-08-15']").then(($date) => {
//         if (!$date.is(':visible')) {
//           if ($date.prev().length) {
//             cy.get('.ant-picker-header-prev-btn')
//           } else {
//             cy.get('.ant-picker-next-icon').click();
//           }
//           selectDate(); 
//         } else {
//           $date.click();
//         }
//       });
//     };
  
//     // Call the selectDate function to pick the date
//     selectDate();
  
//     cy.get("input[type='checkbox']").click();
//     cy.get("#description").type("Happy Independence Day");
//     cy.contains('Save').click();
//   });
  
//   it('Update', () => {
//     // cy.get('[data-row-key]').eq(0).click();
//     // cy.get('span[aria-label="edit"]').eq(0).click();
//     cy.get('span[aria-label="delete"]').eq(0).click();
//   });
// });
beforeEach(() => {
  cy.viewport(3000, 1500);
  cy.visit('https://staging.techiegent.com/');
  cy.wait(5000);
});
describe("",()=>{


it('Website', () => {
  
  // cy.get('#gotoContact').click();
  // cy.get('#gotoContact').should('be.visible').click();
  cy.get('.navbar-brand').click();
  cy.wait(3000);
  cy.get('#fullName').type("Ajay Sharma")
  cy.get('#phone').type("9876543323")
  cy.get('#email')
});
it.only('New Test', () => {
  cy.contains("About us").click();
  cy.contains("Our Team").click();
});

})
