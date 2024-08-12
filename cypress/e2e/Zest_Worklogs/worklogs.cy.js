/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>
import { credentials } from "../Validation/logs";
import { login } from "../common_component/common_All";

describe("Work log Management", () => {
  beforeEach(() => {
    login(credentials);
    cy.get('[href="/work-logs"]').click();
  });

  it("Work Log Set Time", () => {
    cy.xpath("//span[contains(text(),'Work Log Settings')]").click();
    cy.get(".ant-form-item-control-input-content").eq(0).click();
    cy.get('[title="Every 3 Minutes"]').click();
    cy.xpath("//span[normalize-space()='Save']").click();
    cy.contains("Work log settings updated successfully").should("exist");
  });
  it("Work Log redirect user details", () => {
    cy.get('a[id*="updated_"]').first().click();
  });
  it("Check the total number of users", () => {
    cy.get("._childrenContainer_2fxzf_197")
      .find('a[href*="/employees/"]')
      .should("have.length.greaterThan", 0)
      .then((users) => {
        const totalUsers = users.length;
        cy.log(`Total users: ${totalUsers}`);
      });
  });
});
