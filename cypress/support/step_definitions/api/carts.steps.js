import {Given, When, Then} from "@badeball/cypress-cucumber-preprocessor";

import UserService from "../../api/services/UserService";
import LoginService from "../../api/services/LoginService";
import ProductService from "../../api/services/ProductService";
import CartService from "../../api/services/CartService";


Given(
  "an authenticated user exists",
  function () {
    const timestamp = Date.now();

    const user = {
      nome: `Authenticated User ${timestamp}`,
      email: `authenticated.user.${timestamp}@teste.com`,
      password: "teste123",
      administrador: "true",
    };

    this.user = user;

    return UserService.createUser(user)
      .then((userResponse) => {

        expect(
          userResponse.status,
          JSON.stringify(userResponse.body)
        ).to.equal(201);

        return LoginService.login(
            user.email,
            user.password
            );
      })
      .then((loginResponse) => {

        expect(
          loginResponse.status,
          JSON.stringify(loginResponse.body)
        ).to.equal(200);

        expect(loginResponse.body)
          .to.have.property("authorization");

        this.token =
          loginResponse.body.authorization;
      });
  }
);


Given(
  "an available product exists",
  function () {
    const timestamp = Date.now();

    const product = {
      nome: `Product ${timestamp}`,
      preco: 100,
      descricao: "Product created for cart test",
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
      ).to.equal(201);

      expect(response.body)
        .to.have.property("_id");

      this.productId =
        response.body._id;
    });
  }
);


When(
  "I create a shopping cart with the product",
  function () {

    const cart = {
      produtos: [
        {
          idProduto: this.productId,
          quantidade: 1,
        },
      ],
    };

    return CartService.createCart(
      cart,
      this.token
    ).then((response) => {

      this.response = response;

      expect(
        response.status,
        JSON.stringify(response.body)
      ).to.equal(201);

      this.cartId =
        response.body._id;
    });
  }
);


Then(
  "the cart should be created successfully",
  function () {

    expect(
      this.response.status,
      JSON.stringify(this.response.body)
    ).to.equal(201);

    expect(this.response.body)
      .to.have.property("_id");

    expect(this.response.body)
      .to.have.property("message");
  }
);

Given(
  "an authenticated user with an existing cart",
  function () {
    const timestamp = Date.now();

    const user = {
      nome: `Cart User ${timestamp}`,
      email: `cart.user.${timestamp}@teste.com`,
      password: "teste123",
      administrador: "true",
    };

    const product = {
      nome: `Product ${timestamp}`,
      preco: 100,
      descricao: "Product created for cart test",
      quantidade: 10,
    };

    this.user = user;
    this.product = product;

    // Create user
    return UserService.createUser(user)
      .then((userResponse) => {

        expect(
          userResponse.status,
          JSON.stringify(userResponse.body)
        ).to.equal(201);

        // Login
        return LoginService.login(
            user.email,
            user.password
            );
      })
      .then((loginResponse) => {

        expect(
          loginResponse.status,
          JSON.stringify(loginResponse.body)
        ).to.equal(200);

        expect(
          loginResponse.body.authorization,
          JSON.stringify(loginResponse.body)
        ).to.exist;

        this.token = loginResponse.body.authorization;

        // Create product
        return ProductService.createProduct(
          this.product,
          this.token
        );
      })
      .then((productResponse) => {

        expect(
          productResponse.status,
          JSON.stringify(productResponse.body)
        ).to.equal(201);

        expect(
          productResponse.body._id,
          JSON.stringify(productResponse.body)
        ).to.exist;

        this.productId = productResponse.body._id;

        const cart = {
          produtos: [
            {
              idProduto: this.productId,
              quantidade: 1,
            },
          ],
        };

        // Create cart
        return CartService.createCart(
          cart,
          this.token
        );
      })
      .then((cartResponse) => {

        expect(
          cartResponse.status,
          JSON.stringify(cartResponse.body)
        ).to.equal(201);

        expect(
          cartResponse.body._id,
          JSON.stringify(cartResponse.body)
        ).to.exist;

        this.cartId = cartResponse.body._id;
      });
  }
);

When(
  "I cancel the purchase",
  function () {
    return CartService.cancelPurchase(
      this.token
    ).then((response) => {

      this.response = response;
    });
  }
);


Then(
  "the cart should be cancelled successfully",
  function () {

    expect(
      this.response.status,
      JSON.stringify(this.response.body)
    ).to.equal(200);

    expect(this.response.body)
      .to.have.property("message");
  }
);

When(
  "I complete the purchase",
  function () {
    return CartService.finishPurchase(
      this.token
    ).then((response) => {

      this.response = response;

      expect(
        response.status,
        JSON.stringify(response.body)
      ).to.equal(200);

      expect(response.body)
        .to.have.property("message");
    });
  }
);

Then(
  "the purchase should be completed successfully",
  function () {
    expect(
      this.response.status,
      JSON.stringify(this.response.body)
    ).to.equal(200);

    expect(this.response.body)
      .to.have.property("message");
  }
);

Then(
  "the cart should be returned successfully",
  function () {
    expect(
      this.response.status,
      JSON.stringify(this.response.body)
    ).to.equal(200);

    expect(this.response.body)
      .to.have.property("_id");

    expect(this.response.body._id)
      .to.equal(this.cartId);
  }
);

When(
  "I request the cart by ID",
  function () {
    return CartService.getCartById(
      this.cartId,
      this.token
    ).then((response) => {
      this.response = response;
    });
  }
);

Given("I have valid cart data", function () {
  this.cart = {
    produtos: [
      {
        idProduto: "507f1f77bcf86cd799439011",
        quantidade: 1
      }
    ]
  };
});

When(
  "I send a request to create a cart without an authorization token",
  function () {
    return CartService.createCartWithoutToken(this.cart).then((response) => {
      this.response = response;
    });
  }
);

Then(
  "I should receive a cart creation unauthorized response",
  function () {
    expect(
      this.response.status,
      JSON.stringify(this.response.body)
    ).to.equal(401);
  }
);

When(
  "I request the list of carts",
  function () {
    return CartService.getCarts().then((response) => {
      this.response = response;
    });
  }
);

Then(
  "the list of carts should be returned successfully",
  function () {
    expect(
      this.response.status,
      JSON.stringify(this.response.body)
    ).to.equal(200);

    expect(this.response.body).to.have.property("carrinhos");

    expect(this.response.body.carrinhos).to.be.an("array");
  }
);

Then("the cart should be removed successfully", function () {
  expect(
    this.response.status,
    JSON.stringify(this.response.body)
  ).to.eq(200);

  expect(this.response.body)
    .to.have.property("message");
});