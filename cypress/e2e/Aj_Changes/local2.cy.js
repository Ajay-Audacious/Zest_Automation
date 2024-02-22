/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
// import faker from 'faker';
// const email =  faker.internet.email()
// name1 = faker.name.findName();
// contactNumber = `9${faker.phone.phoneNumber('#########')}`; // Generate a 10-digit phone number
describe("Login Test", () => {
  beforeEach(() => {
    // login(credentials);
    cy.viewport(3000, 1500);
    cy.visit("https://staging.zesthrm.com/login");
    cy.get("#login_email").type("superadmin@yopmail.com");
    cy.get("#login_password").type("Demo@12345");
    cy.get("#submit").click();
    cy.get("#users").click();
    cy.contains("Employee", { timeout: 5000 }).click();
    cy.contains("Employee", { timeout: 5000 }).click();
  });
  describe("Run Employee Add Test", () => {
    it.only("Add Male and Female Employees", () => {
      const maleCount = 5;
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
        cy.get("#salary").type("20000");
        cy.contains('div[title="Male"]', "Male").click(); // Select male
        const employeeCode = faker.datatype.number({ min: 10, max: 99 });
        cy.get("#employeeCode").type(employeeCode);
        cy.get("#register_dob").click();
        cy.get("td[title='2005-09-01']").click();
        cy.get("#register_joiningdate").click();
        cy.get("td[title='2023-09-01']").click();
        cy.get("#local_address").type("Vijay Nagar Indore");
        cy.get("#address_checkbox").click();
        cy.get("#save").click();
        cy.wait(2000);
      }
    });
    it("Create Female Employees", () => {
      // Create Female Employees
      const femaleCount = 5;
      for (let i = 0; i < femaleCount; i++) {
        const randomFullName = faker.name.findName(
          undefined,
          undefined,
          "female"
        ); // Use 'female' for the gender
        const email = `${faker.internet.userName()}@yopmail.com`; //To be create end point @yopmail.com
        const contactNumber = `9${faker.phone.phoneNumber("#########")}`;
        const employeeCode = faker.datatype.number({ min: 10, max: 99 });
        cy.get("#employee_add").click();
        faker;
        cy.get("#register_name").type(randomFullName);
        cy.get("#register_email").type(email);
        cy.get("#register_number").type(contactNumber);
        cy.get("#employeeCode").type(employeeCode);
        cy.get("#register_joiningdate").click();
        cy.get(`td[title='${formattedDate}']`).click();
        cy.get("#salary").type("20000");
        cy.get("#register_leaves").type("2");
        cy.get("#save").click();
        //Add document code
        // cy.get("#add_document").click();
        // cy.get("#register_document").type("Pancard");
        // cy.uploadFile("testimg.png", "png");
        cy.get("#save").click();
      }
    });
  });
});
