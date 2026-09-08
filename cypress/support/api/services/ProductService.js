class ProductService {

  createProduct(product, token) {
    return cy.request({
      method: "POST",
      url: `${Cypress.expose("apiUrl")}/produtos`,
      headers: {
        Authorization: token,
      },
      body: product,
      failOnStatusCode: false,
    });
  }

  createProductWithoutToken(product) {
    return cy.request({
      method: "POST",
      url: `${Cypress.expose("apiUrl")}/produtos`,
      body: product,
      failOnStatusCode: false,
    });
  }

  getProducts() {
    return cy.request({
      method: "GET",
      url: `${Cypress.expose("apiUrl")}/produtos`,
      failOnStatusCode: false,
    });
  }

  getProductById(productId) {
    return cy.request({
      method: "GET",
      url: `${Cypress.expose("apiUrl")}/produtos/${productId}`,
      failOnStatusCode: false,
    });
  }

  deleteProduct(productId, token) {
  return cy.request({
    method: "DELETE",
    url: `${Cypress.expose("apiUrl")}/produtos/${productId}`,
    headers: {
      Authorization: token,
    },
    failOnStatusCode: false,
  });
}

  updateProduct(productId, product, token) {
    return cy.request({
      method: "PUT",
      url: `${Cypress.expose("apiUrl")}/produtos/${productId}`,
      headers: {
        Authorization: token,
      },
      body: product,
      failOnStatusCode: false,
    });
  }
}


export default new ProductService();