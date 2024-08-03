/// <reference types="cypress" />

Cypress.Commands.add("getByDataTest", (selector) => {
	return cy.get(`[data-test="${selector}"]`);
});
