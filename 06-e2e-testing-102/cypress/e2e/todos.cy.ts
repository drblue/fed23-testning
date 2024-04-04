const snelhest = {
	email: "snelhest2000@gmail.com",
	password: "appapp",
}

describe("Firebase Todos", () => {

	context("can't access protected routes without logging in", () => {
		it("should be redirected to login when accessing todos page as a guest", () => {
			cy.visit("/todos");
			cy.location("pathname").should("eq", "/login");
			// cy.location("pathname").should("not.eq", "/todos");
		});
	});

	context("can log in", () => {
		beforeEach(() => {
			cy.visit("/login");
		});

		afterEach(() => {
			cy.visit("/logout");
			cy.wait(1500);
		});

		it("should log in with an existing user", () => {
			cy.get("input[type=\"email\"]").type(snelhest.email, { delay: 10 });
			cy.get("input[type=\"password\"]").type(snelhest.password);
			cy.get("[type=\"submit\"]").click();
			cy.wait(1000);

			// cy.login(snelhest.email, snelhest.password);   // wouldn't it be nice

			cy.location("pathname").should("eq", "/");
		});
	});
});
