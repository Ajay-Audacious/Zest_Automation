/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { verifyErrorMessage } from "../Validation/errorValidation";

const email =  faker.internet.email() 
const name = faker.name.findName();
const contactNumber = `9${faker.phone.phoneNumber('#########')}`; // Generate a 10-digit phone number
describe("Roles Test cases", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
    cy.get("input[type=text]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("#submit").click();
    cy.contains("Employee", { timeout: 5000 }).click();
  });

  it("Check Validation", () => {
    cy.get("#employee_list_add").click();
    cy.get("#save").click();
    const errors = {
      register_name_help: "Please enter name",
      register_email_help: "Please enter email address",
      register_contactNumber_help:"Please enter contact number",
      register_gender_help: "Please select gender",
      register_DOB_help: "Please select date of birth",
      register_joiningDate_help: "Please select joining date"
    };
    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const message = errors[key];
        verifyErrorMessage(key, message);
      }
    }
  });
  it("Employee Add", () => {
    cy.get("#employee_list_add").click();
    faker;
    cy.get("#register_name").type(name);
    cy.get("#register_email").type(email);
    cy.get("#register_number").type(contactNumber);
    cy.get("#register_gender").click()
    cy.get('.ant-select-item-option-active').click(); //Select male
    cy.get("#register_dob").click();
    cy.get("td[title='2005-06-01']").click();
    cy.get('#register_joiningdate').click();
    cy.get("td[title='2023-06-01']").click();
    cy.get("#save").click();
  });
  it("Dublicate Employee Add", () => {
    cy.get("#employee_list_add").click();
    cy.get("#register_name").type(name);
    cy.get("#register_email").type(email);
    cy.get("#register_number").type(contactNumber);
    cy.get("#register_gender").click();
    cy.get('.ant-select-item-option-active').click(); //Select male
    cy.get("#register_dob").click();
    cy.get("td[title='2005-06-01']").click();
    cy.get('#register_joiningdate').click();
    cy.get("td[title='2023-06-01']").click();
    cy.get("#save").click();
    cy.contains("Mobile Already Exists").should('be.visible')
    // cy.contains("Email already exist").should('be.visible')
  });
  //Search User Test cases
  it.only("Employee Edit", () => {
    cy.get("#search_here").type(name);
    cy.wait(5000)
    cy.get("#list_edit_icon").eq(0).click();
    cy.get("#register_name").clear()
    .type('Vicky');
    cy.get("#save").click();
  });
  it("Delete Employee", () => {
    cy.get("#search_here").type("Vicky");
    cy.wait(5000)
    cy.xpath("(//button[@type='button'])[3]").click();
    cy.contains('Yes').click()
  }); 
});
