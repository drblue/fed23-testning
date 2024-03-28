import { faker } from "@faker-js/faker";

describe("Newsletter Subscribe", () => {
	const email = faker.internet.email();
	const invalidEmail = "pelle";
	const existingSubscriberEmail = "john@example.com";

	beforeEach(() => {
		// Visit page
		cy.visit("/");

		// Wait for the app to be fully hydrated and visible
		cy.get("#__next").should("be.visible");
	});

	it("allows users to subscribe to the email list by clicking Subscribe", () => {
		cy.getByDataTest("email-input").should("be.visible").type(email, { delay: 100 });

		cy.getByDataTest("submit-button").click();

		// API-request

		cy.getByDataTest("success-message").should("exist").contains(email);
	});

	it("allows users to subscribe to the email list by pressing enter", () => {
		cy.getByDataTest("email-input").should("be.visible").type(email).type("{enter}");

		// API-request

		cy.getByDataTest("success-message").should("exist").contains(email);
	});

	it("displays an error message when the email is invalid", () => {
		cy.getByDataTest("email-input").type(invalidEmail);
		cy.getByDataTest("submit-button").click();
		cy.getByDataTest("success-message").should("not.exist");
	});

	it("should not allow users to subscribe twice", () => {
		cy.getByDataTest("email-input").type(existingSubscriberEmail);
		cy.getByDataTest("submit-button").click();
		cy.getByDataTest("server-error-message")
			.should("be.visible")
			.contains(existingSubscriberEmail);
	});

	it("should not allow subscribing without an email address", () => {
		cy.getByDataTest("submit-button").click();
		cy.getByDataTest("error-message")
			.should("be.visible")
			.contains("Email is required");
	});
});
