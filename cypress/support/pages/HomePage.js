class HomePage {
  logoutButton() {
    return cy.get('[data-testid="logout"]');
  }

  clickLogout() {
    this.logoutButton()
      .should("be.visible")
      .should("be.enabled")
      .click();
  }

  validateHomePage() {
    cy.url()
      .should("not.include", "/login");
  }
}

export default new HomePage();