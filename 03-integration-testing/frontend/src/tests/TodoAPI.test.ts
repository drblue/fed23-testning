import { describe, it, expect, beforeEach, afterAll } from "vitest";
import * as TodoAPI from "../services/TodoAPI";
import { TodoData } from "../types/Todo";

const newTodo: TodoData = {
	title: "Test todo",
	completed: false,
}

// Misa good cleaner 🧹
const deleteAllTodos = async () => {
	// get all todos and then delete them one by one 😩
	const todos = await TodoAPI.getTodos();

	// delete them one by one
	for (let i = 0; i < todos.length; i++) {
		await TodoAPI.deleteTodo(todos[i].id);
	}
}

beforeEach(deleteAllTodos);
afterAll(deleteAllTodos);

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

	it.todo("should create and then update the todo");

	it.todo("should create and then delete the todo and verify that the todo actually was deleted");

});
