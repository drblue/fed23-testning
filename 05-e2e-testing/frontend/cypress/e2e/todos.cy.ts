describe("Todos", () => {
	context("inital state", () => {
		beforeEach(() => {
			// intercept GET requests to http://localhost:3001/todos
			// inline data is bad data 🥴
			// cy.intercept("GET", "http://localhost:3001/todos", [
			// 	{ id: 1337, title: "I like todo lists", completed: false },
			// ]);
			cy.intercept("GET", "http://localhost:3001/todos", {
				fixture: "todos.json",
			}).as("getTodos");

			cy.visit("/");
		});

		it("should see two mocked todos", () => {
			// wait for request to be intercepted before continuing
			// with test (not really neccessary in this case)
			cy.wait("@getTodos");

			cy.get("#todos").find("li").should("have.length", 2);

			cy.get("#todos")
				.find("li")
				.first()
				.should("have.class", "completed")
				.contains("My first todo");

			cy.get("#todos")
				.find("li")
				.last()
				.should("not.have.class", "completed")
				.contains("My second todo");
		});

		it("should not show the error dialog", () => {
			cy.get("#error").should("not.be.visible");
		});
	});

	context.skip("create todo", () => {
		beforeEach(() => {
			cy.visit("/");
		});

		it("create todo form should be empty", () => {
			cy.get("#new-todo-title").should("have.value", "");
		});

		it("can't create a todo without a title", () => {
			// cy.get("#new-todo-title").type("{enter}");
			cy.get('[type="submit"]').click();
			cy.get("#error")
				.should("be.visible")
				.contains("Title cannot be empty");
		});

		it(
			"can create a new todo (and see it in the list and clears input)",
			{ defaultCommandTimeout: 6000 }, // wait **up to** 6000 ms when looking for an element
			() => {
				const todoTitle = "Too many todos, did not read";

				// type a todo title and submit form
				cy.get("#new-todo-title").type(todoTitle);
				cy.get('[type="submit"]').click();

				// cy.wait(1500); // **always** waits 1500 ms, even if the request is quicker

				// expect that a todo with the title exists in the list
				cy.get("#todos").find("li").last().contains(todoTitle);

				// expect input to be empty
				cy.get("#new-todo-title").should("have.value", "");
			}
		);

		it("can type in the create todo form and then reset the form", () => {
			cy.get("#new-todo-title").type("My ephemeral todo");
			cy.get('[type="reset"]').click();
			cy.get("#new-todo-title").should("have.value", "");
		});
	});
});
