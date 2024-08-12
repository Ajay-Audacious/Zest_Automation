/// <reference types="cypress"/>
/// <reference types="cypress-xpath"/>

import { credentials } from "../Validation/logs";
import { addLeaveForSpecificDay, login } from "../common_component/common_All";
import dayjs from "dayjs";
describe("My Dashboard", () => {
  beforeEach(() => {
    login(credentials);
  });

  it("My Dashboard Leave Apply", () => {
    cy.contains("span", "Apply for Leave").click();
    cy.get("input.ant-radio-input").first().click();
    addLeaveForSpecificDay(0); //Title and description
    cy.get("#notifyTo").click();
    cy.xpath("//span[normalize-space()='Ulric Hinton']").click();
    cy.contains("span", "Save").click();
    cy.get(".ant-notification-notice-description").then(($notification) => {
      const notificationText = $notification.text();
      if (notificationText.includes("Leave apply successfully")) {
        cy.get(".ant-notification-notice-description").should(
          "have.text",
          "Leave apply successfully"
        );
        const startDate = dayjs().add(1, "day").format("DD-MM-YYYY");
        const endDate = dayjs().add(2, "day").format("DD-MM-YYYY");
        // Check if leave for given dates is already applied
        const leaveAlreadyApplied = Cypress.$(
          `[data-leave_start="${startDate}"][data-leave_end="${endDate}"].already-applied`
        );
        if (leaveAlreadyApplied.length > 0) {
          cy.contains("You have already applied for this date leave");
        } else {
          cy.get(".ant-notification-notice-description").should(
            "have.text",
            "Leave apply successfully"
          );
        }
      } else if (
        notificationText.includes(
          "You have already applied for this date leave"
        )
      ) {
        cy.contains("You have already applied for this date leave");
      } else {
        cy.log("Unhandled notification: " + notificationText);
      }
    });
  });
  it('View the leaves details',()=>{
    cy.get('svg._eye_1qr2c_156').click();
    cy.get('.ant-modal-body').should('be.visible');
    
  })
});
