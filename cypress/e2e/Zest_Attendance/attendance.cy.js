/// <reference types="cypress-xpath" />
import { credentials } from "../Validation/logs";
import { faker } from "@faker-js/faker";
import dayjs from "dayjs";
import { addLeaveForSpecificDay, login } from "../common_component/common_All";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
    cy.get('#attendance').click();
    cy.get('#attendance').click();
  });
  it.only('Mark attendance', () => {
    //If first element P then convert to A
    cy.contains('button[type="button"] span', 'Mark Attendance').click();
    cy.get('input[type="checkbox"][value="P"]:first').click().then(() => {
    cy.get('input[type="checkbox"][value="A"]:first').click();
    cy.contains('button[type="button"] span', 'Save').click();
    cy.contains('Attendance updated successfully.').should('be.visible');
    cy.get('#breadcrum_attendance').click();
    // cy.get('tr').find('td.ant-table-cell-fix-left').first().parent().should('be.visible');
        
    let found = false;

    // Iterate through each row
    cy.get('tr').each((row) => {
        // Check if the row contains "A" value
        cy.wrap(row).find('.ant-table-cell').each((cell) => {
            cy.wrap(cell).invoke('text').then((text) => {
                if (text.trim() === 'A') {
                    // Perform your desired action here
                    cy.log('Found a cell with "A" value.');

                    // Set the flag to true to indicate that you found the cell
                    found = true;
                }
            });
        }).then(() => {
            // If the "A" cell is found, no need to continue iterating
            if (found) {
                return false;
            }
        });
    });
    });
  });
// it.only('', () => {
    
});
// });