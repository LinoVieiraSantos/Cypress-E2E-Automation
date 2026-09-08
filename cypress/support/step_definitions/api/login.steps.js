import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

import LoginService from "../../api/services/LoginService";
import { createRandomUser } from "../../factories/userFactory";

let credentials;
let response;

Given("a registered user exists for API login", () => {
  credentials = createRandomUser();

  return cy.request({
    method: "POST",
    url: "https://serverest.dev/usuarios",
    body: {
      nome: credentials.nome,
      email: credentials.email,
      password: credentials.password,
      administrador: "false",
    },
  })
    .its("status")
    .should("eq", 201);
});

Given("I have invalid login credentials", () => {
  return cy.fixture("api/invalidLogin").then((invalidUser) => {
    credentials = invalidUser;

    expect(credentials).to.have.property("email");
    expect(credentials).to.have.property("password");
  });
});

When("I send a login request", () => {
  expect(credentials).to.not.be.undefined;

  return LoginService.login(
    credentials.email,
    credentials.password
  ).then((apiResponse) => {
    response = apiResponse;
  });
});

Then("I should receive an unauthorized response", () => {
  expect(response.status).to.eq(401);
});

Then("I should receive the invalid credentials error message", () => {
  expect(response.body).to.have.property("message");
  expect(response.body.message).to.eq(
    "Email e/ou senha inválidos"
  );
});

Then("I should receive a successful response", () => {
  expect(response.status).to.eq(200);
});

Then("I should receive a token", () => {
  expect(response.body).to.have.property("authorization");
  expect(response.body.authorization).to.not.be.empty;
});