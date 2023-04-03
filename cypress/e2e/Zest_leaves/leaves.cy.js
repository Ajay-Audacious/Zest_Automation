/// <reference types="cypress" />
before(() => {
    cy.visit('https://hrm-front-end.pages.dev/login');
    cy.get('input[type=text]').type('superadmin@yopmail.com');
    cy.get('input[type=password').type('Demo@12345');
    cy.get('button[type=submit').click();


})


describe('Leaves', () => {

    it('Leave Approved', () => {
        cy.contains('Leaves').click();
        cy.contains('-SDS').click();
        //Leave Approve
        cy.get('button[type=button]').should('be.visible');
       
    });
    it('Reject Leave', () => {
        cy.contains('Leaves').click();
        cy.contains('-SDS').click();
        //Reject
        cy.contains('Reject').should('be.visible');
        cy.get("textarea[name='about']").type('Something test for demo');
        cy.get('button[type=button]').click();
        
    })

    it('cancel leave', () => {

        cy.contains('Leaves').click()
        cy.contains('Leaves').click();
        cy.contains('-SDS').click();
        //cancel leave 
        cy.contains('Cancel').click();
    })

    it('Approved / Reject', () => {


        cy.contains('Leaves').click();
        cy.contains('-SDS').click();
        //Leave Approve
        cy.get('button[type=button]').click();
        //Reject Leave
        cy.contains('-ABC').click();
        cy.contains('Reject').click();
        cy.get("textarea[name='about']").type('Something test for demo');
        cy.get('button[type=button]').click();
    })

})
