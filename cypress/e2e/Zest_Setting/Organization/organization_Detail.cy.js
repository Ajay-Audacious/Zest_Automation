/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { verifyErrorOrg } from "../Validation/errorValidation";
import { faker } from "@faker-js/faker";
import 'cypress-file-upload';
import { login, orgErrorMessage } from '../common_component/common_All';
describe('Login Test', () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Settings", { timeout: 5000 }).click();
    cy.contains("Organization", { timeout: 5000 }).click();
  })
  describe("organization_Detail", () => {
    it("Verify Error message", () => {
      orgErrorMessage(); //Verify the validation error message
  });
  it('Add Details First Time', () => { 
    cy.get('#organizations_btn').click()
    cy.url().should("include", "https://staging.zesthrm.com/organizations");
    const organizationName = faker.company.companyName();
    const organizationEmail = faker.internet.email();
    const mobileNo = faker.phone.phoneNumberFormat(0);
    const industryType = faker.company.catchPhrase();
    const buisnessLocation = faker.address.city();
    const gstDetails = faker.company.bs();
    const gstNo = faker.company.bs();
    const registeredAddress = faker.address.streetAddress();
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
    cy.get('#profile_upload_button').click();
    cy.uploadFile('testimg.png', 'png');
    cy.get("#save").click();
  });
  it('Update ORG Details', () => {
    cy.get('#organizations_btn').click();
    //Change ORG Address
    cy.get('#registered_address').clear().type("78 Vijay Nagar Near by GS Plaza");
    cy.get('#address_checkbox').click();
    cy.get('#save').click();
  });
  it('Remove and Upload Logo', () => {
    //Remove logo
    cy.get('#remove_organization_logo').click();
    cy.contains("Are you sure you want to remove the organization logo?").should("be.visible");
    cy.get('#yes').click();
    //Add ORG Logo
    cy.get('#organizations_btn').click();
    cy.get('#profile_upload_button').click();
    cy.uploadFile('testimg.png', 'png');
    cy.get('#save').click();
  });
});
});


