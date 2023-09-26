/// <reference types="cypress-xpath" />
import { credentials, testCredentials } from "../Validation/logs";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import 'chai-jquery';
const updateName = faker.name.findName();
const contactNumber = `9${faker.phone.phoneNumber("#########")}`; // Generate a 10-digit phone number
  import { login } from '../common_component/common_All';
describe('Login Test', () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Settings").click();
  });
//Update Name only
it('Setting Update Employee', () => {
    cy.get('button.ant-btn-primary._updateButton_118wl_51').click();
    cy.get('#contact_number').clear().type(contactNumber);
    cy.get("button[type=submit").click();
    cy.contains("Successfully updated details").should('be.visible')
});

it('Update Password', () => {
    cy.contains("Security").click();
    cy.get('#current_password').type(testCredentials.password);
    cy.get('#new_password').type(testCredentials.password);
    cy.get('#confirm_new_password').type(testCredentials.password);
    cy.get('#save').click();
});
});

