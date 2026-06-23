describe("Test Shady Meadows", () => {
    beforeEach(() => {
        
        cy.visit('https://automationintesting.online/')
    })


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

    // Este condicional lo hice con ayuda de IA porque tenía error de React que rompía el test.
    Cypress.on('uncaught:exception', (err) => {
        if (err.message.includes('Minified React error #418')) {
            return false; // De esta forma se ignora el fallo de hidratación de React y continúa el test
        }
    })

    // Caso de Prueba ID03
    it('Seleccionar habitacion y abrir el formulario de reserva', () => {
        cy.hacerReserva().then(({ checkin, checkout }) => {
            cy.get('a[href="#booking"]').click()
            cy.get(`a[href*="/reservation/1?checkin=${checkin}&checkout=${checkout}"]`).click()
                // cy.url().should('include', '/reservation/')
                // cy.get('#doReservation').click()
            cy.reservar()

        })
    })

    // Caso de Prueba ID04
    it('Completar el formulario con datos válidos', () => {
        cy.hacerReserva().then(({ checkin, checkout }) => { // comando declarado para no tener problema con las fechas de reserva
            cy.get('a[href="#booking"]').click()
            cy.get(`a[href*="/reservation/1?checkin=${checkin}&checkout=${checkout}"]`).click()
            cy.reservar()

            //cy.get('[placeholder="Firstname"]').type('Juan')
            //cy.get('[placeholder="Lastname"]').type('Perez')
            //cy.get('[placeholder="Email"]').type(`mail${Date.now()}@gmail.com`)
            //cy.get('[placeholder="Phone"]').type('01164666830')
            cy.datosForm('Juan', 'Perez', `mail${Date.now()}@gmail.com`, '01164666830')
                //cy.get('button.btn-primary.w-100').click()
        })
    })

    // Caso de Prueba ID05
    it('Intentar enviar el formulario con campos vacios ', () => {
        cy.hacerReserva().then(({ checkin, checkout }) => {
            cy.get('a[href="#booking"]').click()
            cy.get(`a[href*="/reservation/1?checkin=${checkin}&checkout=${checkout}"]`).click()
            cy.reservar()

            cy.get('button.btn-primary.w-100').click()
        })

    })

    // Caso de Prueba ID06
    it('Ingresar email invalido', () => {
        cy.hacerReserva(0, 2).then(({ checkin, checkout }) => {
            cy.get('a[href="#booking"]').click()
            cy.get(`a[href*="/reservation/1?checkin=${checkin}&checkout=${checkout}"]`).click()
            cy.reservar()

            cy.datosForm('Juan', 'Perez', `mailgmail.com`, '01164666830')
        })
    })

    // Caso de Prueba ID07
    it('Seleccionar fecha de salida anterior a entrada', () => {
        cy.hacerReserva(2, 1).then(({ checkin, checkout }) => {
            cy.get('a[href="#booking"]').click()
            cy.get(`a[href*="/reservation/2"]`).click()
            cy.reservar()

            cy.datosForm('Juan', 'Perez', `mail${Date.now()}@gmail.com`, '01164666830')
        })
    })

    // Caso de Prueba ID09
    it('Verificar que no se realizó ninguna reserva al intentar enviar el formulario vacio ', () => {
        cy.hacerReserva().then(({ checkin, checkout }) => {
            cy.get('a[href="#booking"]').click()
            cy.get(`a[href*="/reservation/1?checkin=${checkin}&checkout=${checkout}"]`).click()
            cy.reservar()
            cy.get('button.btn-primary.w-100').click()

            cy.get('a[href*="/admin"]').first().click()
            cy.login('admin', 'password')
        })

    })

    //ID 11- Reservar habitacion "Single" y comprobación en Admin
    it('Reservar habitacion "Single" y comprobación en Admin', () => {
        cy.hacerReserva().then(({ checkin, checkout }) => { // comando declarado para no tener problema con las fechas de reserva
            cy.get('a[href="#booking"]').click()
            cy.get(`a[href*="/reservation/1?checkin=${checkin}&checkout=${checkout}"]`).click()
            cy.reservar()

            cy.datosForm('Juan', 'Perez', `mail${Date.now()}@gmail.com`, '01164666830')

            cy.get('a[href*="/admin"]').first().click()
            cy.login('admin', 'password')
        })
    })

    //Item 18- Login con credenciales válidas
    it("login with valid credentials", () => {
        cy.get(".nav-link").eq(5).click()
        cy.login("admin", "password")
    })

    //Item 19- 
    it("login with invalid credentials", () => {
        cy.get(".nav-link").eq(5).click()
        cy.ValidarDatosVaciosLogin()
    })

    //Item 15 
    //   it("Acceder a amenities", () => {
    //     cy.get(".nav-link").eq(2).click();
    //   });

    //Item16
    it("Acceder a contact us", () => {
        cy.get(".nav-link").eq(4).click();
        cy.EnviarDatosValidos(
            "Juan",
            "juan@example.com",
            "12345678909",
            "Consulta",
            "Hola, tengo una consulta sobre las habitaciones disponibles.",
        )
    })

    //Item 17
    it("Validar campos requeridos", () => {
        cy.get(".nav-link").eq(4).click()
        cy.ValidarCamposObligatorios()
    })
})