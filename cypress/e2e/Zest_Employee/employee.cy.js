/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { credentials } from "../Validation/logs";
import { employeesErrorMessage, login } from "../common_component/common_All";
const email = `${faker.internet.userName()}@yopmail.com`; //To be create end point @yopmail.com
const randomFullName = faker.fake("{{name.firstName}} {{name.lastName}}", {
  locale: "en_US",
});
const contactNumber = `9${faker.phone.phoneNumber("#########")}`; // Generate a 10-digit phone number
const formattedDate = dayjs().format("YYYY-MM-DD");
const fakeAddress = faker.address.streetAddress();
const employeeCode = faker.datatype.number({ min: 10, max: 99 });
const currentDate = dayjs();
const firstDayOfCurrentMonth = currentDate.set("date", 1);
const dob = firstDayOfCurrentMonth.subtract(18, "year");
const formattedDob = dob.format("YYYY-MM-DD");
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
    cy.get("#users").click();
    cy.contains("Employee", { timeout: 5000 }).click();
  });
  describe("Employees Module", () => {
    it("Check Validation", () => {
      employeesErrorMessage(); //Verify the Placeholder error message
    });
    it.only("Employee Add", () => {
      // First Step
      cy.get("#employee_add").click();
      faker;
      cy.get("#register_name").type(randomFullName);
      cy.get("#register_email").type(email);
      cy.get("#register_number").type(contactNumber);
      cy.get("#employeeCode").type(employeeCode);
      cy.get("#register_joiningdate").click();
      cy.get(`td[title='${formattedDate}']`).click();
      cy.get("#select_location").click();
      cy.get('[title="Indore"]').click();
      cy.get("#save").click();
      cy.wait(5000);
      // // //Second Step
      cy.get("#register_father_name").type(randomFullName);
      cy.get("#pan_card").type("ABCD1234E");
      cy.get("#marital_status").click();
      cy.contains('div[title="Unmarried"]', "Unmarried").click(); //Select male
      cy.get("#register_dob").click();
      cy.get(`td[title='${formattedDob}']`).click();
      cy.get("#local_address").type(fakeAddress);
      cy.get("#address_checkbox").click();
      cy.get("#save").click();
      cy.contains("Employee details updated successfully").should("be.visible");
      cy.wait(5000);
      // //Third Step
      cy.get("#save").click();
      //fourth step
      cy.wait(2000);
      cy.get("#skip").click();
      cy.get("#save").click();
      cy.get("#salary").type("20000");
      cy.wait(2000);
      cy.get("#save");
      cy.wait(2000);
      cy.get("#save");
    });
    it("Dublicate Employee Add", () => {
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
      cy.contains("Email already exists").eq(0).should("be.visible");
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
