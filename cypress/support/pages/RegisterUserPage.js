class RegisterUserPage {
  nameInput() {
    return cy.get('[data-testid="nome"]');
  }

  emailInput() {
    return cy.get('[data-testid="email"]');
  }

  passwordInput() {
    return cy.get('[data-testid="password"]');
  }

  registerButton() {
    return cy.get('[data-testid="cadastrar"]');
  }

  visit() {
    cy.visit("/cadastrarusuarios");
  }

  fillName(name) {
    this.nameInput()
      .should("be.visible")
      .clear()
      .type(name);
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

  clickRegister() {
    this.registerButton()
      .should("be.visible")
      .should("be.enabled")
      .click();
  }

  fillField(field, value) {
    cy.get(`input[name="${field}"]`)
      .should("be.visible")
      .clear()
      .type(value);
  }

  register(user) {
    this.fillName(user.name);
    this.fillEmail(user.email);
    this.fillPassword(user.password);
    this.clickRegister();
  }

  validateRegistrationSuccess(message) {
    cy.contains(message)
      .should("be.visible");
  }
}

export default new RegisterUserPage();