import {Before, Given, When, Then,} from "@badeball/cypress-cucumber-preprocessor";
import { createRandomUser } from "../factories/userFactory";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

let logoutUser;

Before({ tags: "@logout" }, () => {
  logoutUser = createRandomUser();

  cy.request({
    method: "POST",
    url: "https://serverest.dev/usuarios",
    body: {
      nome: logoutUser.nome,
      email: logoutUser.email,
      password: logoutUser.password,
      administrador: "false",
    },
  })
    .its("status")
    .should("eq", 201);
});

Given("I login with the user created for logout", () => {
  LoginPage.login(
    logoutUser.email,
    logoutUser.password
  );

  HomePage.validateHomePage();
});

When("I logout from the application", () => {
  HomePage.clickLogout();
});