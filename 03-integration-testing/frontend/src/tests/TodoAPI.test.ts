import { describe, it, expect } from "vitest";
import * as TodoAPI from "../services/TodoAPI";
import { TodoData } from "../types/Todo";

const newTodo: TodoData = {
	title: "Test todo",
	completed: false,
}

describe("TodoAPI", () => {

	it("should return a list", async () => {
		const todos = await TodoAPI.getTodos();

		expect( Array.isArray(todos) ).toBe(true);
	});

	it("should create a todo", async () => {
		const todo = await TodoAPI.createTodo(newTodo);

		/*
		// expect(typeof todo.id).toBe("number");
		expect(todo.id).toBeTypeOf("number");
		expect(todo.title).toBe(newTodo.title);
		expect(todo.completed).toBe(newTodo.completed);
		*/

		expect(todo).toMatchObject({
			id: expect.any(Number),
			title: newTodo.title,
			completed: newTodo.completed,
		});
	});

	it.todo("should create and then get the todo");

	it.todo("should create and then find the todo among all todos");

	it.todo("should create and then update the todo");

	it.todo("should create and then delete the todo");

});
