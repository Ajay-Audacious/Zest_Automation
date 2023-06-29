//Login Repeat to Every Testcase
import { credentials } from "../Validation/logs";
function login_User() {

beforeEach('Login', () => {
    
    Cypress.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    cy.visit("https://staging.zesthrm.com");
    cy.viewport(3000, 1500);
    cy.get("input[type=text]").type(credentials.id);
    cy.get("input[type=password").type(credentials.password);
    cy.get("#submit").click();
  });
};

module.exports = login_User;

//Use for the Import module 
//const myTestCase = require ("../Aj_Chnages/local1.cy")
// describe('Login',()=>{
    // myTestCase();
    
// });

//for delete employee
function deleteEmployees (){
it("Employee Delete", () => {
  const deleteEmployees = () => {
    cy.get('.ant-table-container').then(($employees) => {
      if ($employees.length === 0) {
        // If no employees are present, all employees are deleted
        return;
      }
      cy.get('.ant-table-row').each(($row) => {
        cy.wrap($row)
          .find(':nth-child(2) > .ant-btn')
          .click();
        cy.contains("Yes").click();
      });
      deleteEmployees();
    });
  };
  deleteEmployees();
});
};

module.exports= deleteEmployees();

