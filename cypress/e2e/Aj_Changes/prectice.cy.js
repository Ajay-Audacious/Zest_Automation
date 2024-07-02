/// <reference types="cypress-xpath"/>
import { faker } from "@faker-js/faker";

describe("Test login",()=>{
    it("Login Test",()=>{
        cy.visit("https://www.saucedemo.com/");
        cy.get("#user-name").type("standard_user");
        cy.get("#password").type("secret_sauce");
        cy.get("#login-button").click();
        cy.get(".inventory_item_name").should("have.length",6);
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        cy.get('[data-test="shopping-cart-link"]').click();
        cy.get('[data-test="checkout"]').click();
        cy.get('[data-test="firstName"]').type(faker.name.firstName());
        cy.get('[data-test="lastName"]').type(faker.name.lastName());
        cy.get('[data-test="postalCode"]').type("452010");
        cy.get('[data-test="continue"]').click();
    })
})