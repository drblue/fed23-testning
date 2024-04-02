describe("Todos", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("should see at least one todo", () => {
		cy.get("#todos").find("li").should("have.length.at.least", 1);
	});
});
