/// <reference types="cypress-xpath" />
describe("Login Test", () => {
  beforeEach(() => {
    cy.login();
    cy.contains("Settings", { timeout: 5000 }).click();
    cy.contains("Organization", { timeout: 5000 }).click();
    cy.get('[data-node-key="working-hours"]').click();
  });

  describe("organization_Detail", () => {
    it("Set Working Hours", () => {
      //Set Days Mon to Fri
      for (let i = 0; i < 5; i++) {
        const day = ["monday", "tuesday", "wednesday", "thursday", "friday"][i];
        cy.get(`input[type="checkbox"][value="${day}"]`).check();
      }
      cy.get(".ant-picker").eq(0).click().clear().type("10:30:00"); //Start time
      cy.get('button[type="button"]').last().click();
      cy.get(".ant-picker").eq(1).click().clear().type("19:30:00"); //End time
      cy.get('button[type="button"]').last().click();
      cy.contains("Copy time to all").click();
      cy.contains("Save").click();
      cy.checkSuccessMessage(); //Support commands verify the message
    });
  
      it("Set Working Hours For Particular Days", () => {
        const daysToSet = ["monday", "tuesday", "wednesday", "thursday", "friday"]; 
        const startTimes = ["10:30:00", "10:00:00", "09:30:00", "09:00:00", "11:30:00"];
        const endTimes = ["19:00:00", "19:30:00", "18:30:00", "19:00:00", "20:00:00"];
        for (let i = 0; i < daysToSet.length; i++) {
          const day = daysToSet[i];
          // Check the checkbox for the current day
          cy.get(`input[type="checkbox"][value="${day}"]`).check();
          // Set the start time for the current day
          cy.get(".ant-picker").eq(i * 2).click().clear().type(startTimes[i])
          cy.get('.ant-picker-ok').eq(i * 2).should('be.visible').click();
          // Set the end time for the current day
          cy.get(".ant-picker").eq(i * 2 + 1).click().clear().type(endTimes[i])
          cy.get('.ant-picker-ok').eq(i * 2 + 1).should('be.visible').click();
        }
           cy.contains("Save").click()
           cy.checkSuccessMessage(); //Support commands verify the message
           
      });
      it('Check Set Working Hours', () => {
        //It will be shown soon
      });
      it('Update working hours with change time',()=>{
        const daysToSet = ["monday", "tuesday", "wednesday", "thursday", "friday"]; 
        const startTimes = ["09:30:00", "09:00:00", "09:30:00", "09:00:00", "11:30:00"];
        const endTimes = ["18:30:00", "18:00:00", "18:30:00", "19:00:00", "20:00:00"];
        for (let i = 0; i < daysToSet.length; i++) {
          const day = daysToSet[i];
          // Check the checkbox for the current day
          cy.get(`input[type="checkbox"][value="${day}"]`).check();
          // Set the start time for the current day
          cy.get(".ant-picker").eq(i * 2).click().clear().type(startTimes[i])
          cy.get('.ant-picker-ok').eq(i * 2).should('be.visible').click();
          // Set the end time for the current day
          cy.get(".ant-picker").eq(i * 2 + 1).click().clear().type(endTimes[i])
          cy.get('.ant-picker-ok').eq(i * 2 + 1).should('be.visible').click();
        }
          cy.contains("Save").click();
          cy.checkSuccessMessage(); //Support commands verify the message
        });
    });      
    });


