describe("Newsletter Subscribe", () => {
	beforeEach(() => {
		// Visit page
		cy.visit("http://localhost:3000");

		// Wait for the app to be fully hydrated and visible
		cy.get("#__next").should("be.visible");
	});

	it("allows users to subscribe to the email list", () => {
		cy.getByDataTest("email-input")
			.should("be.visible")
			.type("pelle@svanslos.nu");

		cy.getByDataTest("submit-button").click();

		// API-request

		cy.getByDataTest("success-message")
			.should("exist")
			.contains("pelle@svanslos.nu");
	});
});
