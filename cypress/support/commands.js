// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// cypress/support/commands.ts

Cypress.Commands.add('getBySel', (selector, ...args) => {
    return cy.get(`[data-test=${selector}]`, ...args)
  })
  
  Cypress.Commands.add('getBySelLike', (selector, ...args) => {
    return cy.get(`[data-test*=${selector}]`, ...args)
  })
//   cy.get('[data-test="submit"]').click()

// cypress/support/commands.js

Cypress.Commands.add('uploadFile', (fileName, fileType) => {
  cy.get('input[type="file"]').as('fileInput');
  cy.fixture(fileName).then(fileContent => {
    let mimeType;
    switch (fileType) {
      case 'png':
        mimeType = 'image/png';
        break;
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      default:
        throw new Error('Unsupported file type');
    }

    cy.get('@fileInput').attachFile({
      fileContent: fileContent.toString(),
      fileName,
      mimeType,
    });
  });
});

//seprate file upload
 
// cy.get('input[type="file"]').as('fileInput');
    // cy.fixture('testimg.png').then(fileContent => {
    //   cy.get('@fileInput').attachFile({
    //   fileContent: fileContent.toString(),
    //   fileName: 'testimg.png',
    //   mimeType: 'image/png'
    //   });
    //   });

    Cypress.Commands.add("navigateToPreviousMonth", () => {
      cy.get(".fc-prev-button").click();
    });
//For Working hours
    Cypress.Commands.add("checkSuccessMessage", () => {
      cy.get('.ant-message-notice-content').should("be.visible").then(($message) => {
        const messageText = $message.text();
        if (messageText.includes("Created successfully")) {
          // Handle the "Created successfully" case
          expect(messageText).to.include("Created successfully");
        } else if (messageText.includes("Updated successfully")) {
          // Handle the "Updated successfully" case
          expect(messageText).to.include("Updated successfully");
        } else {
          // Handle other cases or fail the test if needed
          cy.wrap(false).should("equal", true);
        }
      });
    });

    //Login 
    // commands.js

Cypress.Commands.add("login", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  })
  cy.viewport(3000, 1500);
  cy.visit("https://staging.zesthrm.com/login");
  cy.get("#login_email").type("superadmin@yopmail.com");
  cy.get("#login_password").type("Demo@12345");
  cy.get("#submit").click();
});


    