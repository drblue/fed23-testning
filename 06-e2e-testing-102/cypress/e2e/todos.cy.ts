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
			cy.login(snelhest.email, snelhest.password);   // so nice 🤩
		});

		afterEach(() => {
			cy.logout();
		});

		it("should log in with an existing user", () => {
			cy.location("pathname").should("eq", "/");
		});

		it("should log in with an existing user and visit todos page", () => {
			cy.visit("/todos");
			cy.location("pathname").should("eq", "/todos");
		});
	});
});
