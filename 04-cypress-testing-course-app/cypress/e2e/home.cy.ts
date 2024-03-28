describe("Home Page", () => {
	it("the h1 contains the correct text", () => {
		cy.visit("http://localhost:3000");

		// wait for the app to be fully hydrated and visible
		cy.get("#__next").should("be.visible");

		cy.get("h1")
			.should("exist")
			.contains("Testing Next.js Applications with Cypress");
	});
});
