describe("Test Shady Meadows", () => {
  beforeEach(() => {
    cy.IngresarPagina();
  });

    //Item 1
  it("Verificar carga de pagina principal", () => {
    cy.contains("Welcome to Shady Meadows B&B").should("be.visible");
    cy.contains("Check Availability & Book Your Stay").should("be.visible");
    cy.contains("Our Rooms").should("be.visible");
    cy.contains("Our Location").should("be.visible");
    cy.get("img").should("have.length.greaterThan", 0);
  });

  //Item 2
  it("Navegar la pagina y encontrar habitaciones disponibles", () => {
    cy.get(':nth-child(2) > .nav-link').click();

    cy.contains("Single").should("be.visible");
    cy.contains("Double").should("be.visible");
    cy.contains("Suite").should("be.visible");
  });
  //Item 8
  it("Verificar mensajes de error en cada input" , () => {
    cy.get(':nth-child(1) > .card > .card-footer > .btn').click();

    cy.get("#doReservation").click();

    cy.get('input[name="firstname"]').should("be.visible");
    cy.get('input[name="lastname"]').should("be.visible");
    cy.get('input[name="email"]').should("be.visible");
    cy.get('input[name="phone"]').should("be.visible");

    cy.contains("button", "Reserve Now").click();

    cy.contains("size must be between 3 and 30").should("be.visible");
    cy.contains("must not be empty").should("be.visible");
    cy.contains("Firstname should not be blank").should("be.visible");
    cy.contains("size must be between 11 and 21").should("be.visible");
    cy.contains("Lastname should not be blank").should("be.visible");
    cy.contains("size must be between 3 and 18").should("be.visible");

  });

  //Item 12
  it("Reservar habitacion Doble", () => {
    cy.get(':nth-child(2) > .card > .card-footer > .btn').click();

    cy.get("#doReservation").click();

    cy.get('input[name="firstname"]').type("Carlos");
    cy.get('input[name="lastname"]').type("Gomez");
    cy.get('input[name="email"]').type("carlos@mail.com");
    cy.get('input[name="phone"]').type("12345678901");

    cy.contains("button", "Reserve Now").click();

    cy.contains("Booking Confirmed").should("be.visible");
    cy.contains("Your booking has been confirmed for the following dates:").should(
      "be.visible",
    );
  });

  //Item 13
  it("Reservar habitacion Suite Room", () => {
    cy.get(':nth-child(3) > .card > .card-footer > .btn').click();

    cy.get("#doReservation").click();

    cy.get('input[name="firstname"]').type("Laura");
    cy.get('input[name="lastname"]').type("Perez");
    cy.get('input[name="email"]').type("laura@mail.com");
    cy.get('input[name="phone"]').type("10987654321");

    cy.contains("button", "Reserve Now").click();

    cy.contains("Booking Confirmed").should("be.visible");
    cy.contains("Your booking has been confirmed for the following dates:").should(
      "be.visible",
    );
  });

  //Item 18
  //   it("login with invalid credentials", () => {
  //     cy.get(".nav-link").eq(5).click();
  //     cy.login("admin", "password");
  //   });

  //Item 19
  //   it("login with invalid credentials", () => {
  //     cy.get(".nav-link").eq(5).click();
  //     cy.ValidarDatosVaciosLogin();
  //   });

  //Item 15
  //   it("Acceder a amenities", () => {
  //     cy.get(".nav-link").eq(2).click();
  //   });

  //Item16
  //   it("Acceder a contact us", () => {
  //     cy.get(".nav-link").eq(4).click();
  //     cy.EnviarDatosValidos(
  //       "Juan",
  //       "juan@example.com",
  //       "12345678909",
  //       "Consulta",
  //       "Hola, tengo una consulta sobre las habitaciones disponibles.",
  //     );
  //   });
  //Item 17
  //   it("Validar campos requeridos", () => {
  //     cy.get(".nav-link").eq(4).click();
  //     cy.ValidarCamposObligatorios();
  //   });
});
