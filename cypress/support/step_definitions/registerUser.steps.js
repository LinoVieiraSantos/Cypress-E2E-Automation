import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";
import { createRandomUser } from "../factories/userFactory";

Given("I visit the registration page", () => {
  cy.visit("/cadastrarusuarios");
});

When("I fill in the registration form with random user data", () => {
  const user = createRandomUser();

  cy.writeFile("cypress/fixtures/registeredUser.json", user);

  cy.get('input[name="nome"]')
    .should("be.visible")
    .clear()
    .type(user.name);

  cy.get('input[name="email"]')
    .should("be.visible")
    .clear()
    .type(user.email);

  cy.get('input[name="password"]')
    .should("be.visible")
    .clear()
    .type(user.password);
});

When("I click on the Cadastrar button", () => {
  cy.get('[data-testid="cadastrar"]')
    .should("be.visible")
    .should("be.enabled")
    .click();
});

Then("I should be redirected to the home page", () => {
  cy.url().should("include", "/home");
});