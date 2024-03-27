import { describe, it, expect, beforeAll, afterAll, afterEach } from "vitest";
import { server } from "../mocks/server";
import * as TodoAPI from "../services/TodoAPI";
import { TodoData } from "../types/Todo";

// 👂🏻 Before all tests, start listening for requests
beforeAll(() => {
	server.listen();
});

// 🧨 Reset handlers
afterEach(() => {
	server.resetHandlers();
});

// 🙉 After all tests, stop listening
afterAll(() => {
	server.close();
});

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

	it("should create and then get the todo", async () => {
		// create a new todo
		const createdTodo = await TodoAPI.createTodo(newTodo);

		// try to get the new todo
		const todo = await TodoAPI.getTodo(createdTodo.id);

		/*
		expect(todo.id).toBe(createdTodo.id);
		expect(todo.title).toBe(createdTodo.title);
		expect(todo.completed).toBe(createdTodo.completed);
		*/

		/*
		expect(todo).toMatchObject({
			id: createdTodo.id,
			title: createdTodo.title,
			completed: createdTodo.completed,
		});
		*/

		// expect both todos to have the same keys + values
		expect(todo).toStrictEqual(createdTodo);
	});

	it("should create and then find the todo among all todos", async () => {
		// create a new todo
		const createdTodo = await TodoAPI.createTodo(newTodo);

		// get all todos
		const todos = await TodoAPI.getTodos();

		// expect `createdTodo` to exist in the array `todos`
		// const todo = todos.find(todo => todo.id === createdTodo.id);
		// expect(todo).toStrictEqual(createdTodo);
		// expect(todos).toEqual(expect.arrayContaining([createdTodo]));
		expect(todos).toContainEqual(createdTodo);
	});

	it("should create and then update the todo", async () => {
		const todo = await TodoAPI.createTodo(newTodo);

		const updatedTodo = await TodoAPI.updateTodo(todo.id, {
			completed: !todo.completed,
		});

		expect(updatedTodo).toMatchObject({
			id: todo.id,
			title: todo.title,
			completed: !todo.completed,
		});
	});

	it.skip("should create and then delete the todo and verify that the todo actually was deleted", async () => {
		const todo = await TodoAPI.createTodo(newTodo);

		await TodoAPI.deleteTodo(todo.id);

		const todos = await TodoAPI.getTodos();

		expect(todos).not.toContainEqual(todo);
	});

});
