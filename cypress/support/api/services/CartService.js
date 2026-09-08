class CartService {
  createCart(cart, token) {
    return cy.request({
      method: "POST",
      url: `${Cypress.expose("apiUrl")}/carrinhos`,
      headers: {
        Authorization: token,
      },
      body: cart,
      failOnStatusCode: false,
    });
  }

  createCartWithoutToken(cart) {
    return cy.request({
      method: "POST",
      url: `${Cypress.expose("apiUrl")}/carrinhos`,
      body: cart,
      failOnStatusCode: false,
    });
  }

  getCarts() {
    return cy.request({
      method: "GET",
      url: `${Cypress.expose("apiUrl")}/carrinhos`,
      failOnStatusCode: false,
    });
  }

  getCartById(cartId, token) {
    return cy.request({
      method: "GET",
      url: `https://serverest.dev/carrinhos/${cartId}`,
      headers: {
      Authorization: token,
      },
      failOnStatusCode: false,
      });
    }

  cancelPurchase(token) {
    return cy.request({
      method: "DELETE",
      url: `${Cypress.expose("apiUrl")}/carrinhos/cancelar-compra`,
      headers: {
        Authorization: token,
      },
      failOnStatusCode: false,
    });
  }

  finishPurchase(token) {
    return cy.request({
      method: "DELETE",
      url: `${Cypress.expose("apiUrl")}/carrinhos/concluir-compra`,
      headers: {
        Authorization: token,
      },
      failOnStatusCode: false,
    });
  }
}

export default new CartService();