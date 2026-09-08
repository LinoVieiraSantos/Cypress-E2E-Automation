class UserService {
  createUser(user) {
    return cy.request({
      method: "POST",
      url: `${Cypress.expose("apiUrl")}/usuarios`,
      body: {
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: user.administrador,
      },
      failOnStatusCode: false,
    });
  }

  getUsers() {
    return cy.request({
      method: "GET",
      url: `${Cypress.expose("apiUrl")}/usuarios`,
      failOnStatusCode: false,
    });
  }

  getUserById(userId) {
    return cy.request({
      method: "GET",
      url: `${Cypress.expose("apiUrl")}/usuarios/${userId}`,
      failOnStatusCode: false,
    });
  }

  updateUser(userId, user) {
    return cy.request({
      method: "PUT",
      url: `${Cypress.expose("apiUrl")}/usuarios/${userId}`,
      body: {
        nome: user.nome,
        email: user.email,
        password: user.password,
        administrador: user.administrador,
      },
      failOnStatusCode: false,
    });
  }

  deleteUser(userId) {
    return cy.request({
      method: "DELETE",
      url: `${Cypress.expose("apiUrl")}/usuarios/${userId}`,
      failOnStatusCode: false,
    });
  }
}

export default new UserService();