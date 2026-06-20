Cypress.Commands.add("IngresarPagina", () => {
    cy.visit("https://automationintesting.online");
});

Cypress.Commands.add("login", (user, pass) => {
    cy.get("#username").type(user);
    cy.get("#password").type(pass);
    cy.get("#doLogin").click();
});

Cypress.Commands.add("ValidarDatosVaciosLogin", () => {
    cy.get("#doLogin").click();
    cy.get(".alert.alert-danger").should("contain.text", "Invalid credentials");
});

Cypress.Commands.add(
    "EnviarDatosValidos",
    (name, email, phone, subject, mensaje) => {
        cy.get("#name").type(name);
        cy.get("#email").type(email);
        cy.get("#phone").type(phone);
        cy.get("#subject").type(subject);
        cy.get("#description").type(mensaje);
        cy.get(".btn-primary").contains("Submit").click();

        cy.get(".col-lg-8 > .card > .card-body").contains(
            "Thanks for getting in touch",
        );
    },
);

Cypress.Commands.add("ValidarCamposObligatorios", () => {
    cy.get(".btn-primary").contains("Submit").click();
    cy.get(".alert")
        .should("contain", "Phone may not be blank")
        .and("contain", "Name may not be blank")
        .and("contain", "Email may not be blank")
        .and("contain", "Subject may not be blank")
        .and("contain", "Message may not be blank");
});

Cypress.Commands.add('hacerReserva', (checkinOffset = 0, checkoutOffset = 1) => {
    const formatDate = (date) => date.toISOString().split('T')[0]

    const today = new Date()

    const checkin = new Date(today)
    checkin.setDate(today.getDate() + checkinOffset)

    const checkout = new Date(today)
    checkout.setDate(today.getDate() + checkoutOffset)

    return {
        checkin: formatDate(checkin),
        checkout: formatDate(checkout)
    }
})

Cypress.Commands.add('datosForm', (Name, LastName, email, phone) => { // deberíamos revisar este comando con el "EnviarDatosValidos" me parecen que hacen lo mismo
    cy.get('[placeholder="Firstname"]').type('Juan')
    cy.get('[placeholder="Lastname"]').type('Perez')
    cy.get('[placeholder="Email"]').type(`mail${Date.now()}@gmail.com`)
    cy.get('[placeholder="Phone"]').type('01164666830')
    cy.get('button.btn-primary.w-100').click()
})