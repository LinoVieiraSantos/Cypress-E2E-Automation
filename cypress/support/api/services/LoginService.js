class LoginService {

  login(email, password) {

    return cy.request({
      method: "POST",
      url: "https://serverest.dev/login",

      body: {
        email,
        password,
      },

      failOnStatusCode: false,
    });
  }
}

export default new LoginService();