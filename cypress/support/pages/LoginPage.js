class LoginPage {
  emailInput() {
    return cy.get('input[name="email"]');
  }

  passwordInput() {
    return cy.get('input[name="password"]');
  }

  loginButton() {
    return cy.get('[data-testid="entrar"]');
  }

  visit() {
    cy.visit("/login");
  }

  fillEmail(email) {
    this.emailInput()
      .should("be.visible")
      .clear()
      .type(email);
  }

  fillPassword(password) {
    this.passwordInput()
      .should("be.visible")
      .clear()
      .type(password);
  }

  clickLogin() {
    this.loginButton()
      .should("be.visible")
      .should("be.enabled")
      .click();
  }

  login(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
    this.clickLogin();
  }

  validateLoginError(message) {
    cy.contains(message)
      .should("be.visible");
  }

  validateLoginPage() {
    cy.url()
      .should("include", "/login");
  }
}

export default new LoginPage();