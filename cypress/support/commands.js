// cypress/support/commands.js

// Custom command to log in
Cypress.Commands.add('login', (username, password) => {
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to register a new user
Cypress.Commands.add('registerUser', (nome, email, password) => {
  cy.get('input[name="nome"]').type(nome);
  cy.get('input[name="email"]').type(email);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').click();
});

// Custom command to create a new user
Cypress.Commands.add('createUser', (userData) => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/users',
    body: userData,
  });
});