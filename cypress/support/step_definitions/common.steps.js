import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

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

Given("I visit the login page", () => {
  LoginPage.visit();
});

Then("I should be redirected to the home page", () => {
  HomePage.validateHomePage();
});

Then("I should be redirected to the login page", () => {
  LoginPage.validateLoginPage();
});