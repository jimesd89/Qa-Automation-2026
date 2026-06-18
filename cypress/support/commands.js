Cypress.Commands.add("IngresarPagina", () => {
  cy.visit("https://automationintesting.online");
});

Cypress.Commands.add("login", (user, pass) => {
  cy.get("#username").type(user);
  cy.get("#password").type(pass);
  cy.get("#doLogin").click();
  // cy.get(".alert.alert-danger").should("contain.text", "Invalid credentials");
});
