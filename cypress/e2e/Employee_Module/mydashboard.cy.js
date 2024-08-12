/// <reference types="cypress-xpath" />
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { credentials } from "../Validation/logs";
import { login } from "../common_component/common_All";

// Handle uncaught exceptions globally
Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
  });

  describe("My Dashboard", () => {
    it("Today's Attendance Check in and Out", () => {
    //   cy.contains('span', 'Check Out').then(($checkOut) => {
    //     if ($checkOut.is(":visible")) {
    //       cy.wrap($checkOut).click();
    //     } else {
    //       cy.contains('span', 'Check In').then(($checkIn) => {
    //         if ($checkIn.is(":visible")) {
    //           cy.wrap($checkIn).click();
    //         }
    //       })
    //     }
    //   });
    cy.contains('button', 'Check In').click();
    });
  });
});

