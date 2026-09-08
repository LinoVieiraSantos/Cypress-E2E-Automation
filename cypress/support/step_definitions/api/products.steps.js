import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

import ProductService from "../../api/services/ProductService";
import UserService from "../../api/services/UserService";
import LoginService from "../../api/services/LoginService";

Given("I have valid product data", function () {
  const timestamp = Date.now();

  this.product = {
    nome: `Produto Cypress ${timestamp}`,
    preco: 100,
    descricao: "Produto criado para teste de API",
    quantidade: 10,
  };
});


When(
  "I send a request to create a product without an authorization token",
  function () {
    return ProductService.createProductWithoutToken(
      this.product
    ).then((response) => {
      this.response = response;
    });
  }
);


Then(
  "I should receive an unauthorized product creation response",
  function () {
    expect(this.response.status).to.equal(401);
  }
);

Then(
  "the product stock should be restored",
  function () {
    return ProductService.getProductById(
      this.productId
    ).then((response) => {

      expect(
        response.status,
        JSON.stringify(response.body)
      ).to.equal(200);

      expect(
        response.body.quantidade,
        JSON.stringify(response.body)
      ).to.equal(this.originalStock);
    });
  }
);

Given("an authenticated administrator exists", function () {
  const timestamp = Date.now();

  const admin = {
    nome: `Admin ${timestamp}`,
    email: `admin.${timestamp}@test.com`,
    password: "123456",
    administrador: "true",
  };

  this.user = admin;

  return UserService.createUser(admin)
    .then((userResponse) => {
      expect(
        userResponse.status,
        JSON.stringify(userResponse.body)
      ).to.eq(201);

      expect(userResponse.body)
        .to.have.property("_id");

      this.userId = userResponse.body._id;

      return LoginService.login(
        admin.email,
        admin.password
      );
    })
    .then((loginResponse) => {
      expect(
        loginResponse.status,
        JSON.stringify(loginResponse.body)
      ).to.eq(200);

      expect(loginResponse.body)
        .to.have.property("authorization");

      this.token = loginResponse.body.authorization;
    });
});

Given("an existing product is available", function () {
  const timestamp = Date.now();

  const product = {
    nome: `Product ${timestamp}`,
    preco: 100,
    descricao: "Product created for duplicate test",
    quantidade: 10,
  };

  this.product = product;

  return ProductService.createProduct(
    product,
    this.token
  ).then((response) => {
    expect(
      response.status,
      JSON.stringify(response.body)
    ).to.eq(201);

    expect(response.body)
      .to.have.property("_id");

    this.productId = response.body._id;
  });
});

When("I try to create another product with the same name", function () {
  const duplicateProduct = {
    nome: this.product.nome,
    preco: 100,
    descricao: "Duplicate product test",
    quantidade: 10,
  };

  return ProductService.createProduct(
    duplicateProduct,
    this.token
  ).then((response) => {
    this.response = response;
  });
});

Then("I should receive a duplicate product error", function () {
  expect(
    this.response.status,
    JSON.stringify(this.response.body)
  ).to.eq(400);

  expect(this.response.body)
    .to.have.property("message");

  expect(this.response.body.message)
    .to.eq("Já existe produto com esse nome");
});

When("I create the product", function () {
  const timestamp = Date.now();

  this.product = {
    nome: `Product ${timestamp}`,
    preco: 100,
    descricao: "Product created successfully",
    quantidade: 10,
  };

  return ProductService.createProduct(
    this.product,
    this.token
  ).then((response) => {
    this.response = response;

    expect(
      response.status,
      JSON.stringify(response.body)
    ).to.eq(201);

    expect(response.body)
      .to.have.property("_id");

    this.productId = response.body._id;
  });
});

Then("the product should be created successfully", function () {
  expect(
    this.response.status,
    JSON.stringify(this.response.body)
  ).to.eq(201);

  expect(this.response.body)
    .to.have.property("message");

  expect(this.response.body.message)
    .to.eq("Cadastro realizado com sucesso");

  expect(this.response.body)
    .to.have.property("_id");
});

Given("an authenticated regular user exists", function () {
  const timestamp = Date.now();

  const user = {
    nome: `Regular User ${timestamp}`,
    email: `regular.${timestamp}@test.com`,
    password: "123456",
    administrador: "false",
  };

  this.user = user;

  return UserService.createUser(user)
    .then((userResponse) => {
      expect(
        userResponse.status,
        JSON.stringify(userResponse.body)
      ).to.eq(201);

      expect(userResponse.body)
        .to.have.property("_id");

      this.userId = userResponse.body._id;

      return LoginService.login(
        user.email,
        user.password
      );
    })
    .then((loginResponse) => {
      expect(
        loginResponse.status,
        JSON.stringify(loginResponse.body)
      ).to.eq(200);

      expect(loginResponse.body)
        .to.have.property("authorization");

      this.token = loginResponse.body.authorization;
    });
});

When("I try to create the product", function () {
  const timestamp = Date.now();

  const product = {
    nome: `Product Regular User ${timestamp}`,
    preco: 100,
    descricao: "Product creation attempt by regular user",
    quantidade: 10,
  };

  this.product = product;

  return ProductService.createProduct(
    product,
    this.token
  ).then((response) => {
    this.response = response;
  });
});

Then("I should receive an administrator permission error", function () {
  expect(
    this.response.status,
    JSON.stringify(this.response.body)
  ).to.eq(403);

  expect(this.response.body)
    .to.have.property("message");

  expect(this.response.body.message)
    .to.eq("Rota exclusiva para administradores");
});

When("I delete the product", function () {
  return ProductService.deleteProduct(
    this.productId,
    this.token
  ).then((response) => {
    this.response = response;
  });
});

Then("the product should be deleted successfully", function () {
  expect(
    this.response.status,
    JSON.stringify(this.response.body)
  ).to.eq(200);

  expect(this.response.body)
    .to.have.property("message");

  expect(this.response.body.message)
    .to.eq("Registro excluído com sucesso");

  return ProductService.getProductById(this.productId).then((response) => {
    expect(
      response.status,
      JSON.stringify(response.body)
    ).to.eq(400);

    expect(response.body)
      .to.have.property("message");

    expect(response.body.message)
      .to.eq("Produto não encontrado");
  });
});

Given("an existing product exists", function () {
  const timestamp = Date.now();

  const product = {
    nome: `Product ${timestamp}`,
    preco: 100,
    descricao: "Product created for duplicate test",
    quantidade: 10,
  };

  this.product = product;

  return ProductService.createProduct(
    product,
    this.token
  ).then((response) => {
    expect(
      response.status,
      JSON.stringify(response.body)
    ).to.eq(201);

    expect(response.body)
      .to.have.property("_id");

    this.productId = response.body._id;
  });
});

When("I create a product with the same name", function () {
  const duplicateProduct = {
    nome: this.product.nome,
    preco: 100,
    descricao: "Duplicate product test",
    quantidade: 10,
  };

  return ProductService.createProduct(
    duplicateProduct,
    this.token
  ).then((response) => {
    this.response = response;
  });
});

When("I request the list of products", function () {
  return ProductService.getProducts().then((response) => {
    this.response = response;
  });
});

Then("the list of products should be returned successfully", function () {
  expect(
    this.response.status,
    JSON.stringify(this.response.body)
  ).to.eq(200);

  expect(this.response.body)
    .to.have.property("quantidade");

  expect(this.response.body)
    .to.have.property("produtos");

  expect(this.response.body.produtos)
    .to.be.an("array");
});

Given("I have updated product data", function () {
  const timestamp = Date.now();

  this.updatedProduct = {
    nome: `Updated Product ${timestamp}`,
    preco: 150,
    descricao: "Product updated successfully",
    quantidade: 20,
  };
});

When("I update the product", function () {
  return ProductService.updateProduct(
    this.productId,
    this.updatedProduct,
    this.token
  ).then((response) => {
    this.response = response;
  });
});

Then("the product should be updated successfully", function () {
  expect(
    this.response.status,
    JSON.stringify(this.response.body)
  ).to.eq(200);

  expect(this.response.body)
    .to.have.property("message");

  expect(this.response.body.message)
    .to.eq("Registro alterado com sucesso");

  return ProductService.getProductById(this.productId).then((response) => {
    expect(
      response.status,
      JSON.stringify(response.body)
    ).to.eq(200);

    expect(response.body.nome)
      .to.eq(this.updatedProduct.nome);

    expect(response.body.preco)
      .to.eq(this.updatedProduct.preco);

    expect(response.body.descricao)
      .to.eq(this.updatedProduct.descricao);

    expect(response.body.quantidade)
      .to.eq(this.updatedProduct.quantidade);
  });
});