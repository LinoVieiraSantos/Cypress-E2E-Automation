import { Before, When, Then} from "@badeball/cypress-cucumber-preprocessor";

import { createRandomUser } from "../factories/userFactory";
import LoginPage from "../pages/LoginPage";

let registeredUser;

Before({ tags: "@login" }, () => {
  registeredUser = createRandomUser();

  cy.request({
    method: "POST",
    url: "https://serverest.dev/usuarios",
    body: {
      nome: registeredUser.nome,
      email: registeredUser.email,
      password: registeredUser.password,
      administrador: registeredUser.administrador
    },
  }).its("status").should("eq", 201);
});

When("I login with the registered user", () => {
  LoginPage.login(
    registeredUser.email,
    registeredUser.password
  );
});

When("I login with invalid credentials", () => {
  cy.fixture("invalidUser").then((user) => {
    LoginPage.login(
      user.email,
      user.password
    );
  });
});

Then("I should see the invalid login error message", () => {
  LoginPage.validateLoginError(
    "Email e/ou senha inválidos"
  );
});