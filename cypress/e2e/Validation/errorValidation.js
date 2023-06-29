//Add Employee 
export const verifyErrorMessage = (id, message) => {
    cy.get(`#${id}`).should("have.text", message);
  };
  
  //Roles Validation
  export const verifyErrorRole = (id, error) => {
    cy.get(`#${id}`).should("have.text", error);
  };

  //Setting module ORG
  export const verifyErrorOrg = (id, error) => {
    cy.get(`#${id}`).should("have.text", error);
  };
  
  

    