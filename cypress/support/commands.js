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