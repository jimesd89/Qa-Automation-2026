describe("Test de API - Restful Booker", () => {
  it("Cargar pagina principal y verificar que se cargue correctamente", () => {
    cy.intercept("GET", "https://automationintesting.online/").as(
      "paginaPrincipal",
    );
    cy.visit("https://automationintesting.online/");
    cy.wait("@paginaPrincipal").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });
  });

  it("Cargar rooms", () => {
    cy.intercept("POST", "**/cdn-cgi/rum*").as("rooms");
    cy.visit("https://automationintesting.online/");
    cy.wait("@rooms").then((interception) => {
      expect(interception.response.statusCode).to.equal(204);
    });
  });

  it("Encontrar segun fecha", () => {
    cy.request(
      "https://automationintesting.online/api/room?checkin=2021-06-19&checkout=2020-06-20",
    ).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("rooms");
      response.body.rooms.forEach((room) => {
        expect(room).to.have.property("roomid");
        expect(room).to.have.property("roomName");
        expect(room).to.have.property("type");
        expect(room).to.have.property("description");
        expect(room).to.have.property("features");
        expect(room).to.have.property("accessible");
        expect(room).to.have.property("roomPrice");
        expect(room).to.have.property("image");
      });
    });
  });
});
