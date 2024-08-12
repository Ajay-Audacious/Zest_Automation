/// <reference types="cypress" />
/// <reference types="cypress-xpath"/>

import { login } from "../../common_component/common_All";
import { credentials } from "../../Validation/logs";

describe("Locations Management", () => {
  beforeEach(() => {
    login(credentials);
    cy.get("svg._settingIcon_19mnw_106").click();
    cy.xpath("//a[normalize-space()='Organization Settings']").click();
    cy.get('[data-node-key="locations"]').click();
    cy.url().should("include", "/settings/organization/locations");
  });
  it("Locations Verify the error message", () => {
    cy.contains("span", "Add New").click();
    cy.contains("span", "Save").click();
    cy.get("#name_help").should("have.text", "Please enter name");
    cy.get("#address_help").should("have.text", "Please enter full address");
  });
  it("Add Location", () => {
    cy.contains("span", "Add New").click();
    cy.get("#name").type("Indore");
    cy.get("#address").type("The Hub Near by Vijay Nagar");
    cy.get("#isPrimary").click();
    cy.contains("span", "Save").click();
    cy.get(".ant-notification-notice-description").should(
      "have.text",
      "Location Created"
    );
  });
  it("Name of locations", () => {
    cy.get("._childrenContainer_2fxzf_197")
      .find("[data-row-key=_]")
      .should("have.length.greaterThan", 0)
      .then((users) => {
        const totalUsers = users.length;
        cy.log(`Total users: ${totalUsers}`);
      });
  });
});
