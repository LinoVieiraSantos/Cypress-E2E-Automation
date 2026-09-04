import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

When("I fill in {string} with {string}", (field, value) => {
  cy.get(`input[name="${field}"]`)
    .should("be.visible")
    .clear()
    .type(value);
});

When("I type in {string} with {string}", (field, value) => {
  cy.get(`input[name="${field}"]`)
    .should("be.visible")
    .clear()
    .type(value);
});

Then("I should see {string}", (message) => {
  cy.contains(message)
    .should("be.visible");
});

Then("I should be redirected to the home page", () => {
  cy.url().should("include", "/home");
});