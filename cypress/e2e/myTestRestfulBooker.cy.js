describe("Test Shady Meadows", () => {
  beforeEach(() => {
    cy.IngresarPagina();
  });
  it("login with invalid credentials", () => {
    cy.get(".nav-link").eq(5).click();
    cy.login("admin", "password");
  });
});
