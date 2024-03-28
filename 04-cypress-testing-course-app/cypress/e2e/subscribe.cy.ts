import { faker } from "@faker-js/faker";

describe("Newsletter Subscribe", () => {
	const email = faker.internet.email();
	const invalidEmail = "pelle";
	const existingSubscriberEmail = "john@example.com";

	beforeEach(() => {
		// Visit page
		cy.visit("http://localhost:3000");

		// Wait for the app to be fully hydrated and visible
		cy.get("#__next").should("be.visible");
	});

	it("allows users to subscribe to the email list", () => {
		cy.getByDataTest("email-input")
			.should("be.visible")
			.type(email);

		cy.getByDataTest("submit-button").click();

		// API-request

		cy.getByDataTest("success-message")
			.should("exist")
			.contains(email);
	});
});
