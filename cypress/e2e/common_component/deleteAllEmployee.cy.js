/// <reference types="cypress-xpath" />
import { login } from "../common_component/common_All";
import { credentials } from "../Validation/logs";
describe("Login Test", () => {
  beforeEach(() => {
    login(credentials);
  });

  //for delete employee
  function deleteEmployees() {
    it("Employee Delete", () => {
      const deleteEmployees = () => {
        cy.get(".ant-table-container").then(($employees) => {
          if ($employees.length === 0) {
            // If no employees are present, all employees are deleted
            return;
          }
          cy.get(".ant-table-row").each(($row) => {
            cy.wrap($row).find(":nth-child(2) > .ant-btn").click();
            cy.contains("Yes").click();
          });
          deleteEmployees();
        });
      };
      deleteEmployees();
    });
  }
});

module.exports = deleteEmployees();
