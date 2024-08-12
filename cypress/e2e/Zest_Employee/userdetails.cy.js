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
const educationInstitution = "Massachusetts Institute of Technology (MIT)";
const educationCourse = "MBA/PGDM";
const educationSpecialization = "HR";
const educationGrade = "A+";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
  });
  describe("Employees Module", () => {
    it("Check Validation", () => {
      employeesErrorMessage(); //Verify the Placeholder error message
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
    });

    it("Add User", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("#employee_add").click();
      cy.get("#register_name").type(randomFullName);
      cy.get("#register_email").type(email);
      cy.get("#register_number").type(contactNumber);
      cy.get("#employeeCode").type(employeeCode);
      cy.get(".ant-select-selection-overflow");
      cy.get("#manager_name");
      cy.get("#register_designation").type(faker.random.word());
      cy.get("#register_joining_date").click();
      cy.get(`td[title='${formattedDate}']`).click();
      cy.get("#select_location").click();
      cy.get(".ant-select-item-option-content").eq(0).click();
      cy.get("#register_employmentType").click();
      cy.get('[title="Full Time"]').click();
      cy.contains("Submit").click();
    });
    it("Add others details", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("[data-row-key")
        .find('a[class*="_nameLink_"][id*="_employee"]')
        .first()
        .click();
      cy.get(
        "button.ant-btn.ant-btn-default.ant-btn-icon-only._editBtn_7qzob_15"
      ).then(($editButton) => {
        if ($editButton.length > 0) {
          cy.wrap($editButton).click();
          cy.get('span:contains("Save")').click();
        } else {
          // If edit button is not available, fill in the details and then click on "Save" button
          cy.get('span:contains("Add Personal Details")').click();
          cy.get("#pan_card").type("ABCD1234EF");
          cy.get("#aadhaar_card").type("1234567891234");
          cy.get("#marital_status").click();
          cy.contains('div[title="Unmarried"]', "Unmarried").click();
          cy.get("#register_dob").click();
          cy.get(`td[title='${formattedDob}']`).click();
          cy.get("#register_father_name").type(randomFullName);
          cy.get("#local_address").type(fakeAddress);
          cy.get("#address_checkbox").click();
          cy.get('span:contains("Save")').click();
        }
      });
    });
    it("Add Previous Employment details", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("[data-row-key")
        .find('a[class*="_nameLink_"][id*="_employee"]')
        .first()
        .click();
      cy.get("#rc-tabs-0-tab-employment-details").click();
      cy.get('svg[data-icon="edit"]')
        .eq(2)
        .then(($editButton) => {
          if ($editButton.length > 0) {
            cy.wrap($editButton).click();
            cy.get('span:contains("Save")').click();
          } else {
            cy.get('span:contains("Add Previous Employment")').click();
            cy.get("previousOrgDetails_0_name").type("ABC ORG");
            cy.get("previousOrgDetails_0_startDate").type("");
            cy.get("previousOrgDetails_0_endDate").type("");
            cy.get("previousOrgDetails_0_salary").type("20000");
            cy.get('span:contains("Save")').click();
          }
        });
    });
    it("Add Education details", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("[data-row-key")
        .find('a[class*="_nameLink_"][id*="_employee"]')
        .first()
        .click();
      cy.get("#rc-tabs-0-tab-educational-details").click();
      cy.get('svg[data-icon="edit"]')
        .eq(2)
        .then(($editButton) => {
          if ($editButton.length > 0) {
            cy.wrap($editButton).click();
            cy.get('span:contains("Save")').click();
          } else {
            cy.get('span:contains("Add Educational Details")').click();
            cy.get("#educationDetails_0_institutionName").type(
              educationInstitution
            );
            cy.get("#educationDetails_0_courseName").type(educationCourse);
            cy.get("#educationDetails_0_specialization").type(
              educationSpecialization
            );
            cy.get("#educationDetails_0_passingYear").type("2022");
            cy.get("#educationDetails_0_grade").type(educationGrade);
            cy.get('span:contains("Save")').click();
          }
        });
    });
    it("Payroll details", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("[data-row-key")
        .find('a[class*="_nameLink_"][id*="_employee"]')
        .first()
        .click();
      cy.get("#rc-tabs-0-tab-salary-details").click();
      cy.get('svg[data-icon="edit"]')
        .eq(2)
        .then(($editButton) => {
          if ($editButton.length > 0) {
            cy.wrap($editButton).click();
            cy.get('span:contains("Save")').click();
          } else {
            cy.get('span:contains("Add Payroll Details")').click();
            cy.get("#salary").type("20000");
            cy.get(".ant-select-selector").eq(2);
          }
        });
    });
    it("Add Documents", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("[data-row-key")
        .find('a[class*="_nameLink_"][id*="_employee"]')
        .first()
        .click();
      cy.get("#rc-tabs-1-tab-documents").click();
      cy.get('svg[data-icon="edit"]')
        .eq(2)
        .then(($editButton) => {
          if ($editButton.length > 0) {
            cy.wrap($editButton).click();
            cy.get('span:contains("Save")').click();
          } else {
            cy.get('span:contains("Upload Document")').click();
            cy.get("#documents_0_type").click();
            cy.get('span:contains("Upload")').click();
            cy.get('span:contains("Save")').click();
          }
        });
    });
    it("Add Feedbacks", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("[data-row-key")
        .find('a[class*="_nameLink_"][id*="_employee"]')
        .first()
        .click();
      cy.get("#rc-tabs-0-tab-feedback").click();
      cy.get('span:contains("Add Feedback")').eq(0).click();
      cy.get("#startDate");
      cy.get("#endDate");
      cy.get("#feedbacks_0_title").type("Communications");
      cy.get(".ant-rate-star-second").click();
      cy.get('span:contains("Save")').click();
    });
    it("Salary Revision", () => {
      cy.get('[href="/employees"]', { timeout: 5000 }).click();
      cy.get("[data-row-key")
        .find('a[class*="_nameLink_"][id*="_employee"]')
        .first()
        .click();
      cy.get("#rc-tabs-0-tab-salary-revision").click();
      cy.get("#rc-tabs-0-tab-salary-revision").click();
      cy.get("#revisedSalary").type("20000");
      cy.get("#effectiveMonth").click().type(currentDate);
      cy.get("#salaryTemplates").click().eq(0).click();
      cy.get("#description").type(
        "Salary revision is a process of reviewing and updating an employee's salary or compensation package based various factors such as current market trends, industry standards, and employee performance."
      );
      cy.get('span:contains("Save")').click();
    });
  });
});
