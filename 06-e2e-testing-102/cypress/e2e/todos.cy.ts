const snelhest = {
	email: "snelhest2000@gmail.com",
	password: "appapp",
}

describe("Firebase Todos", () => {

	context.skip("can't access protected routes without logging in", () => {
		it("should be redirected to login when accessing todos page as a guest", () => {
			cy.visit("/todos");
			cy.location("pathname").should("eq", "/login");
			// cy.location("pathname").should("not.eq", "/todos");
		});
	});

	context.skip("can log in", () => {
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

	context("todo actions", () => {
		beforeEach(() => {
			cy.login(snelhest.email, snelhest.password);   // so nice 🤩
		});

		afterEach(() => {
			cy.logout();
		});

		it("should click on the first todo and land on a page with the todo's id in the URL", () => {
			cy.visit("/todos");

			// get the first todo item in the list
			cy.get(".todo-list-item")
				.first()
				.invoke("attr", "data-todo-id")
				.then((todoId) => {
					cy.log(`Got me some todoId: ${todoId}`);

					cy.get(".todo-list-item")
						.first()
						.click();

					cy.wait(500);

					cy.location("pathname").should("eq", "/todos/" + todoId);
				});
		});

		it("all todos should have a title", () => {
			cy.visit("/todos");

			cy.get(".todo-list-item .todo-title")
				.each(($el) => {
					cy.wrap($el).should("not.be.empty");
				});
		});
	});
});
