// import cypress = require("cypress");

export class registerPage {
  webLocators = {
    firstName: "#input-firstname",
    lastName: "#input-lastname",
    email: "#input-email",
    telePhone: "#input-telephone",
    password: "#input-password",
    confirmPassword: "#input-confirm",
    checkbox: "input[value='1'][name='agree']",
    submit: "input[value='Continue']",
  };
  openURl() {
    cy.visit(Cypress.env("URL"));
  }
  enterFirstName(Fname) {
    cy.get(this.webLocators.firstName).type(Fname);
  }
  enterLastName(Lname) {
    cy.get(this.webLocators.lastName).type(Lname);
  }
  enterEmail(email) {
    cy.get(this.webLocators.email).type(email);
  }
  entertelePhone(phone) {
    cy.get(this.webLocators.telePhone).type(phone);
  }
  enterPassword(password) {
    cy.get(this.webLocators.password).type(password);
    cy.get(this.webLocators.confirmPassword).type(password);
  }
  selectPvcy() {
    cy.get(this.webLocators.checkbox).click();
  }
  submit() {
    cy.get(this.webLocators.submit).click();
  }
}
