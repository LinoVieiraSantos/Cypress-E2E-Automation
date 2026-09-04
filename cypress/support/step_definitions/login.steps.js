import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("I visit the login page", () => {
  cy.visit("/login");
});

When("I login with the registered user", () => {
  cy.readFile("cypress/fixtures/registeredUser.json").then((user) => {

    cy.get('input[name="email"]')
      .should("be.visible")
      .clear()
      .type(user.email);

    cy.get('input[name="password"]')
      .should("be.visible")
      .clear()
      .type(user.password);

    cy.get('[data-testid="entrar"]')
      .should("be.visible")
      .should("be.enabled")
      .click();
  });
});

Then("I should be redirected to the home page", () => {
  cy.url().should("include", "/home");
});