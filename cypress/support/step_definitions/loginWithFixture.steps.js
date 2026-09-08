import {
  Before,
  When,
} from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../pages/LoginPage";

Before({ tags: "@fixtureLogin" }, () => {
  cy.fixture("registeredUser").then((user) => {
    cy.request({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      failOnStatusCode: false,

      body: {
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: "false",
      },
    }).then((response) => {
      if (response.status === 201) {
        return;
      }

      expect(response.status).to.eq(400);
      expect(response.body.message).to.eq(
        "Este email já está sendo usado"
      );
    });
  });
});

When("I login with the user stored in the fixture", () => {
  cy.fixture("registeredUser").then((user) => {
    LoginPage.login(
      user.email,
      user.password
    );
  });
});