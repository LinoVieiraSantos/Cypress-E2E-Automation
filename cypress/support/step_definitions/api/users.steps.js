import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

import UserService from "../../api/services/UserService";
import { createRandomUser } from "../../factories/userFactory";

let user;
let updatedUser;
let userId;
let response;


// CREATE USER

Given("I have valid random user data", () => {
  user = createRandomUser();
});

When("I send a request to create the user", () => {
  UserService.createUser(user).then((res) => {
    response = res;
    userId = res.body._id;
  });
});

Then("the user should be created successfully", () => {
  expect(response.status).to.eq(201);

  expect(response.body.message)
    .to.eq("Cadastro realizado com sucesso");

  expect(response.body)
    .to.have.property("_id");
});


// DUPLICATE USER

Given("a user already exists", () => {
  user = createRandomUser();

  return UserService.createUser(user).then((res) => {
    expect(
      res.status,
      JSON.stringify(res.body)
    ).to.eq(201);

    expect(res.body)
      .to.have.property("_id");

    userId = res.body._id;
  });
});

When("I try to create another user with the same email", () => {
  return UserService.createUser(user).then((res) => {
    response = res;
  });
});

Then("I should receive a duplicate email error", () => {
  expect(
    response.status,
    JSON.stringify(response.body)
  ).to.eq(400);

  expect(response.body)
    .to.have.property("message");

  expect(response.body.message)
    .to.eq("Este email já está sendo usado");
});


// GET USERS

When("I request the list of users", () => {
  UserService.getUsers().then((res) => {
    response = res;
  });
});

Then("the list of users should be returned successfully", () => {
  expect(response.status).to.eq(200);

  expect(response.body)
    .to.have.property("quantidade");

  expect(response.body.usuarios)
    .to.be.an("array");
});


// GET USER BY ID

Given("an existing user is available", () => {
  user = createRandomUser();

  UserService.createUser(user).then((res) => {
    expect(res.status).to.eq(201);

    userId = res.body._id;
  });
});

When("I request the user by ID", () => {
  UserService.getUserById(userId).then((res) => {
    response = res;
  });
});

Then("the user should be returned successfully", () => {
  expect(response.status).to.eq(200);

  expect(response.body.nome)
    .to.eq(user.nome);

  expect(response.body.email)
    .to.eq(user.email);
});


// USER NOT FOUND

Given("I have a non-existing user ID", () => {
  userId = "0000000000000000";
});

Then("I should receive a user not found error", () => {
  expect(
    response.status,
    JSON.stringify(response.body)
  ).to.eq(400);

  expect(response.body)
    .to.have.property("message");

  expect(response.body.message)
    .to.eq("Usuário não encontrado");
});

// UPDATE USER

Given("I have new user data", () => {
  updatedUser = createRandomUser();
});

When("I update the user", () => {
  return UserService.updateUser(
    userId,
    updatedUser
  ).then((res) => {
    response = res;
  });
});

Then("the user should be updated successfully", () => {
  expect(
    response.status,
    JSON.stringify(response.body)
  ).to.eq(200);

  expect(response.body)
    .to.have.property("message");

  expect(response.body.message)
    .to.eq("Registro alterado com sucesso");

  return UserService.getUserById(userId).then((getResponse) => {
    expect(
      getResponse.status,
      JSON.stringify(getResponse.body)
    ).to.eq(200);

    expect(getResponse.body.nome)
      .to.eq(updatedUser.nome);

    expect(getResponse.body.email)
      .to.eq(updatedUser.email);
  });
});


// DELETE USER

When("I delete the user", () => {
  UserService.deleteUser(userId).then((res) => {
    response = res;
  });
});

Then("the user should be deleted successfully", () => {
  expect(response.status).to.eq(200);

  expect(response.body.message)
    .to.eq("Registro excluído com sucesso");

  UserService.getUserById(userId).then((getResponse) => {
    expect(getResponse.status).to.eq(400);

    expect(getResponse.body.message)
      .to.eq("Usuário não encontrado");
  });
});