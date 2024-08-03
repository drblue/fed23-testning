/// <reference types="cypress" />

Cypress.Commands.add("login", (email, password) => {
	cy.visit("/login");
	cy.get("input[type=\"email\"]").type(email, { delay: 10 });
	cy.get("input[type=\"password\"]").type(password);
	cy.get("[type=\"submit\"]").click();
	cy.wait(1000);
});

Cypress.Commands.add("logout", () => {
	cy.visit("/logout");
	cy.wait(1500);
});
