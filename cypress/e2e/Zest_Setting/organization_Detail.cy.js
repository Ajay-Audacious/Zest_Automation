/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { verifyErrorOrg } from "../Validation/errorValidation";
import { faker } from "@faker-js/faker";
import 'cypress-file-upload';
describe("organization_Detail", () => {
  beforeEach(() => {
    Cypress.on("uncaught:exception", (err, runnable) => {return false;});
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
    cy.get("input[type=text]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("#submit").click();
    cy.contains("Settings", { timeout: 5000 }).click();
    cy.contains("Organization", { timeout: 5000 }).click();
  });

  it("Verify Error message", () => {
    cy.get("button[class='ant-btn ant-btn-primary']").click();
    cy.get("#save").click();
    const errors = {
      Organization_organizationName_help: "Please enter name",
      Organization_LandlineNo_help: "Please enter landline number",
      Organization_mobileNo_help: "Please enter contact number",
      Organization_organizationEmail_help: "Please enter email address",
      Organization_industryType_help: "Please enter industry type",
      Organization_BuisnessLocation_help: "Please enter business location",
      Organization_GST_Deatils_help: "Please enter gst details",
      Organization_GST_No_help: "Please enter GSTIN",
      Organization_registeredAddress_help: "Please enter registered address",
      Organization_PAN_No_help: "Please enter pan number",
      Organization_Tax_Deduction_No_help: "Please enter tan number",
    };

    for (const key in errors) {
      if (Object.hasOwnProperty.call(errors, key)) {
        const message = errors[key];
        verifyErrorOrg(key, message);
      }
    }
  });
  it('Add Details', () => {
    cy.get('.ant-btn').click()
    cy.url().should("include", "https://staging.zesthrm.com/organizations");
    const organizationName = faker.company.companyName();
    const organizationEmail = faker.internet.email();
    const mobileNo = faker.phone.phoneNumberFormat(0);
    const industryType = faker.company.catchPhrase();
    const buisnessLocation = faker.address.city();
    const gstDetails = faker.company.bs();
    const gstNo = faker.company.bs();
    const registeredAddress = faker.address.streetAddress();
    // const panNo = faker.random.alphaNumeric(10);
    const tanNo = faker.random.alphaNumeric(10);
    cy.get("#Organization_organizationName").type(organizationName);
    cy.get("#Organization_LandlineNo").type('1234567898');
    cy.get('#register_email').type(organizationEmail);
    cy.get('#register_contact').type(mobileNo);
    cy.get("#Organization_industryType").type(industryType);
    cy.get("#Organization_BuisnessLocation").type(buisnessLocation);
    cy.get("#Organization_GST_Deatils").type(gstDetails);
    cy.get("#Organization_GST_No").type(gstNo);
    cy.get("#Organization_registeredAddress").type(registeredAddress);
    cy.get("#Organization_PAN_No").type('dhshd123hf');
    cy.get("#Organization_Tax_Deduction_No").type(tanNo);
    cy.get('input[type="file"]').as('fileInput');
    cy.fixture('pexels-photo-12438506.jpeg').then(fileContent => {
      cy.get('@fileInput').attachFile({
      fileContent: fileContent.toString(),
      fileName: 'pexels-photo-12438506.jpeg',
      mimeType: 'image/jpeg'
      });
      });
    cy.get("#save").click();
  });
});


