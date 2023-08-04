/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
// import faker from 'faker';
import { credentials } from "../Validation/logs";
import { verifyErrorMessage } from "../Validation/errorValidation";
// const email =  faker.internet.email()
// name1 = faker.name.findName();
// contactNumber = `9${faker.phone.phoneNumber('#########')}`; // Generate a 10-digit phone number
import { employeesErrorMessage, login } from "../common_component/common_All";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
    // cy.viewport(3000, 1500);
    // cy.visit('https://staging.zesthrm.com/login');
    // cy.get('#login_email').type("ajayy3@yopmail.com");
    // cy.get('#login_password').type("Demo@123");
    // cy.get('#submit').click();
    cy.contains("Employee", { timeout: 5000 }).click();
  });

  describe("Run Employee Add Test", () => {
    it("Add Male and Female Employees", () => {
      const maleCount = 2;

      // Create Male Employees
      for (let i = 0; i < maleCount; i++) {
        const fakeName = faker.name.findName(undefined, undefined, "male"); // Use 'male' for the gender

        const fakeEmail = `${faker.internet.userName()}@yopmail.com`; //To be create end point @yopmail.com
        const fakeContactNumber = `9${faker.phone.phoneNumber("#########")}`;

        cy.get("#employee_add").click();
        cy.get("#register_name").type(fakeName);
        cy.get("#register_email").type(fakeEmail);
        cy.get("#register_number").type(fakeContactNumber);
        cy.get("#register_gender").click();
        cy.contains('div[title="Male"]', "Male").click(); // Select male
        cy.get("#register_dob").click();
        cy.get("td[title='2005-07-01']").click();
        cy.get("#register_joiningdate").click();
        cy.get("td[title='2023-07-01']").click();
        cy.get("#save").click();
        cy.wait(2000);
      }
    });
    it("Create Female Employees", () => {
      // Create Female Employees
      const femaleCount = 3;
      for (let i = 0; i < femaleCount; i++) {
        const fakeName = faker.name.findName(undefined, undefined, "female"); // Use 'female' for the gender
        const fakeEmail = `${faker.internet.userName()}@yopmail.com`; //To be create end point @yopmail.com

        const fakeContactNumber = `9${faker.phone.phoneNumber("#########")}`;

        cy.get("#employee_add").click();
        cy.get("#register_name").type(fakeName);
        cy.get("#register_email").type(fakeEmail);
        cy.get("#register_number").type(fakeContactNumber);
        cy.get("#register_gender").click();
        cy.contains('div[title="Female"]', "Female").click(); // Select female
        cy.get("#register_dob").click();
        cy.get("td[title='2005-07-01']").click();
        cy.get("#save").click();
      }
    });
  });
});
