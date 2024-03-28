describe("Home Page", () => {
	beforeEach(() => {
		// Visit page
		cy.visit("http://localhost:3000");

		// Wait for the app to be fully hydrated and visible
		cy.get("#__next").should("be.visible");
	});

	it("the h1 contains the correct text", () => {
		// Find the h1 and verify content
		// cy.get('[data-test="hero-heading"]')  // 🫤
		cy.get("h1")
			.should("exist")
			.contains("Testing Next.js Applications with Cypress");
	});

	it("the features on the homepage are correct", () => {
		// Find the first definition term and verify content
		cy.get("dt").eq(0).contains("4 Courses");

		// Find the second definition term and verify content
		cy.get("dt").eq(1).contains("25+ Lessons");

		// Find the third definition term and verify content
		cy.get("dt").eq(2).contains("Free and Open Source");
	});
});
