/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { verifyErrorMessage } from "../Validation/errorValidation";

// const email =  faker.internet.email()
const email = `${faker.internet.userName()}@yopmail.com`; //To be create end point @yopmail.com
const name = faker.name.findName();
const contactNumber = `9${faker.phone.phoneNumber("#########")}`; // Generate a 10-digit phone number
import { employeesErrorMessage, login } from "../common_component/common_All";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Employee", { timeout: 5000 }).click();
  });

  describe("Employees Module", () => {
    it("Check Validation", () => {
      employeesErrorMessage(); //Verify the Placeholder error message
    });
    it("Employee Add", () => {
      cy.get("#employee_add").click();
      faker;
      cy.get("#register_name").type(name);
      cy.get("#register_email").type(email);
      cy.get("#register_number").type(contactNumber);
      cy.get("#register_gender").click();
      cy.contains('div[title="Male"]', "Male").click(); //Select male
      cy.get("#register_dob").click();
      cy.get("td[title='2005-07-01']").click();
      cy.get("#register_joiningdate").click();
      cy.get("td[title='2023-07-01']").click();
      cy.get('#add_document').click();
      cy.get('#register_document').type('Pancard')
      cy.uploadFile('testimg.png', 'png');
      cy.get("#save").click();
    });
    it("Dublicate Employee Add", () => {
      cy.get("#employee_add").click();
      cy.get("#register_name").type(name);
      cy.get("#register_email").type(email);
      cy.get("#register_number").type(contactNumber);
      cy.get("#register_gender").click();
      cy.contains('div[title="Male"]', "Male").click(); //Select male
      cy.get("#register_dob").click();
      cy.get("td[title='2005-07-01']").click();
      cy.get("#register_joiningdate").click();
      cy.get("td[title='2023-07-01']").click();
      cy.get('#add_document').click();
      cy.get('#register_document').type('Pancard')
      cy.uploadFile('testimg.png', 'png');
      cy.get("#save").click();
      cy.contains("Email already exists").should('be.visible')
      cy.contains("Mobile Already Exists").should("be.visible");
    });
    //Search User Test cases
    it("Employee Edit", () => {
      cy.get("#search_here").type(name);
      cy.wait(5000);
      const formattedName = name.replace(/\s+/g, "_").toLowerCase();
      const elementId = `#${formattedName}_edit`;
      cy.get(elementId).click();
      cy.get("#register_name").clear().type("Vicky");
      cy.get("#save").click();
    });
    it("Delete Employee", () => {
      cy.get("#search_here").type("Vicky");
      cy.get('input[type="radio"][value="deleted"]').click({ force: true });
      cy.wait(5000);
      cy.get("#vicky_archive").click();
      cy.contains("Yes").click();
    });
  });

  it("Archived & Unarchived User", () => {
    cy.get("#search_here").type("Vicky");
    cy.wait(5000);
    cy.get("#vicky_archive").click();
    cy.get(".ant-table-tbody tr:first-child td:nth-child(2)")
      .invoke("text")
      .then((userName) => {
        userName = userName.trim();
        cy.get(".ant-modal-confirm-title").should(
          "have.text",
          `Once you archive ${userName} they can no longer login to the system. Are you sure, you still want to archive?`
        );
      });
    cy.contains("Yes").click();
    cy.get(".ant-message-notice-content").should(
      "have.text",
      "User archived successfully"
    );
    cy.get('input[type="radio"][value="deleted"]').click({ force: true });
    cy.get("#vicky_unarchive").click();
    cy.contains("Do you want to Unarchived this").should("be.visible");
    cy.get("#yes").click();
  });
});
