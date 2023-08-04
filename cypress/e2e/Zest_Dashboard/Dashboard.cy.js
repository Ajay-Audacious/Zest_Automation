/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { addLeaveForSpecificDay, login } from "../common_component/common_All";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
  });
  describe("Dashboard", () => {
    it("Add Leave From Dashboard", () => {
      addLeaveForSpecificDay(0); //Leaves Reasons& Title 
      const startDate = dayjs().add(1, "day").format("DD-MM-YYYY");
      const endDate = dayjs().add(2, "day").format("DD-MM-YYYY");
      cy.get("#leave_start").invoke("val", startDate).trigger("change");
      cy.get("#leave_end").invoke("val", endDate).trigger("change");
      cy.get(".ant-btn-primary").click();
      const leaveAlreadyApplied = Cypress.$(
        `[data-leave_start="${startDate}"][data-leave_end="${endDate}"].already-applied`
      );
      if (leaveAlreadyApplied) {
        cy.contains("You have already applied for this date leave");
      }
    });
    it.only("Apply Past date leave", () => {
      cy.get(".ant-btn-primary").click();
      cy.get(".fc-day-future:not(.already-applied)").then(($days) => {
        if ($days.length > 0) {
          cy.wrap($days[0]).click();
          addLeaveForSpecificDay(-1); //Leaves Reason&Title
          cy.get("._mainDashboard_8nzh6_1").scrollIntoView();
          const startDate = dayjs().add(1, "day").format("DD-MM-YYYY");
          const endDate = dayjs().add(2, "day").format("DD-MM-YYYY");
          cy.get("#leave_start").invoke("val", startDate).trigger("change");
          cy.get("#leave_end").invoke("val", endDate).trigger("change");
          cy.get(".ant-btn-primary").click();
        } else {
          cy.contains("You have already applied for this date leave").should(
            "not.exist"
          );
        }
      });
    });

    it.skip("Click on Apply Leave Date", () => {
      cy.get(".ant-btn-primary").click();
      cy.get(
        `[data-leave_start="${startDate}"][data-leave_end="${endDate}"]`
      ).click();
    });

    it("Check Dashboard Data Total Record", () => {
      cy.get(".ant-btn-primary").click();
      cy.get(".ant-row").should(($row) => {
        const expectedPattern =
          /(\d+)Total Active Users(\d+)Total Projects(\d+)Pending Leave Requests/;
        const actualText = $row.text();
        expect(actualText).to.match(expectedPattern);
        const matches = actualText.match(expectedPattern);
        const [_, totalActiveUsers, totalProjects, pendingLeaveRequests] = matches;
        const expectedText = `${totalActiveUsers}Total Active Users${totalProjects}Total Projects${pendingLeaveRequests}Pending Leave Requests`;
        expect(actualText).to.equal(expectedText);
      });
    });    
    it("Count Total Leaves", () => {
      cy.get(".fc-event-main").then((leaves) => {
        const totalLeaves = Cypress.$(leaves).length;
        const styledOutput = `Total Leaves: ${totalLeaves}`;
        cy.log(styledOutput);
      });
    });
    it("Count Total Leaves", () => {
      // Count leaves for the current month
      cy.get(".fc-event-main").then((leaves) => {
        const totalLeaves = Cypress.$(leaves).length;
        if (totalLeaves === 0) {
          cy.log("There are no leaves available for this month");
        } else {
          const styledOutput = `Total Leaves for Current Month: ${totalLeaves}`;
          cy.log(styledOutput);
        }
      });
    
      // Count leaves for the previous month
      cy.navigateToPreviousMonth();
      cy.get(".fc-event-main").then((previousMonthLeaves) => {
        const totalPreviousMonthLeaves = Cypress.$(previousMonthLeaves).length;
        const previousMonthStyledOutput = `Total Leaves for Previous Month: ${totalPreviousMonthLeaves}`;
        cy.log(previousMonthStyledOutput);
      });
    });
  });
});
