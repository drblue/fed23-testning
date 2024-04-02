describe("Todos", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it.skip("should see at least one todo", () => {
		cy.get("#todos").find("li").should("have.length.at.least", 1);
	});

	context("create todo", () => {
		it("create todo form should be empty", () => {
			cy.get("#new-todo-title").should("have.value", "");
		});

		it("can't create a todo without a title", () => {
			// cy.get("#new-todo-title").type("{enter}");
			cy.get("[type=\"submit\"]").click();
			cy.get('#error').should("be.visible").contains("Title cannot be empty");
		});

		it(
			"can create a new todo (and see it in the list and clears input)",
			{ defaultCommandTimeout: 6000 },  // wait **up to** 6000 ms when looking for an element
			() => {
				const todoTitle = "Too many todos, did not read";

				// type a todo title and submit form
				cy.get("#new-todo-title").type(todoTitle);
				cy.get("[type=\"submit\"]").click();

				// cy.wait(1500); // **always** waits 1500 ms, even if the request is quicker

				// expect that a todo with the title exists in the list
				cy.get("#todos").find("li").last().contains(todoTitle);

				// expect input to be empty
				cy.get("#new-todo-title").should("have.value", "");
			}
		);

		it("can type in the create todo form and then reset the form", () => {
			cy.get("#new-todo-title").type("My ephemeral todo");
			cy.get("[type=\"reset\"]").click();
			cy.get("#new-todo-title").should("have.value", "");
		});
	});
});
