/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import { credentials } from "../Validation/logs";
import { verifyErrorReports } from "../Validation/errorValidation";
verifyErrorReports;
import { login, reportsErrorMessage } from "../common_component/common_All";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
    cy.contains("Reports", { timeout: 5000 }).click();
  });
  describe("Reports Module Test", () => {
    it("Check Validations", () => {
      reportsErrorMessage(); //Verify the Validation error message
    });
    it("Creation Report & ", () => {
      const startTime = "09:30:00";
      const endTime = "18:30:00";
      cy.get("button[type='button']").click();
      cy.get("#start_date_0").click().type(startTime);
      cy.contains("button", "OK").click();
      cy.get("#start_end_0").click().type(endTime);
      cy.xpath('//button[contains(.,"OK")]').last().click();
      cy.get('#select_manager_0').click()
      cy.get(".ant-select-item-option-content").first().click();
      cy.get('#project_name_0').click();
      cy.get(".ant-select-item-option-content").last().click();
      cy.get('#description_0').type(
        "Something text as per the details"
      );
      cy.contains("Save").click();
    });
    it("Approved Reports", () => {
      cy.get('svg[data-icon="check"]').first().click();
      cy.contains("Do you want to approve this report?").should("be.visible");
      cy.contains("Yes").click();
      //Reject Reports
      cy.get('button[id*="_reject"]').eq(0).click();
      cy.get('#describtion').type("No Need to Download Report");
      cy.contains("button", "OK").click();
      cy.contains("REJECTED").trigger("mouseover").should("be.visible"); //Veiw reject reason
    });

    it.only("Update & Delete Report", () => {
      const updateEndTime = "19:30:00";
      cy.get('button[id*="update"]').eq(0).click();
      cy.get('#start_end_0').click().clear().type(updateEndTime); //Change end time
      cy.get(".ant-picker-ok").click();
      cy.contains('button[type="submit"]', "Save").click();
      cy.contains("Report updated successfully").should("be.visible");
      //Delete Report
      cy.get('button[id*="delete"]').eq(0).click();
      cy.contains("Do you want to remove this report?").should("be.visible");
      cy.contains("Yes").click();
      cy.contains("Report Deleted Successfully").should("be.visible");
    });
  });
});
