import { http, HttpResponse, PathParams } from "msw";
import { Todo, TodoData } from "../types/Todo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const dummyTodos: Todo[] = [
	{ id: 1, title: "My first todo", completed: false },
	{ id: 2, title: "My second todo", completed: true },
];

type CreateTodoRequestBody = TodoData;

export const handlers = [
	// Mock get all todos
	// GET http://localhost:3001/todos
	http.get(BASE_URL + "/todos", () => {
		return HttpResponse.json(dummyTodos);
	}),

	// Mock get single todo
	// GET http://localhost:3001/todos/:todoId
	http.get(BASE_URL + "/todos/:todoId", ({ request }) => {
		// Get the todo ID from the request

		// Check if a todo with that ID exists

		// If not, respond with empty object and HTTP 404 Not Found

		// Otherwise, respond with the todo with the corresponding ID
	}),

	// Mock create single todo
	// POST http://localhost:3001/todos
	http.post<PathParams, CreateTodoRequestBody>(BASE_URL + "/todos", async ({ request }) => {
		// Get POST body
		const payload = await request.json();  // { "title": "🐎 Jak er snab hest", "completed": true }
		if (!payload) {
			return HttpResponse.json({}, { status: 400 });
		}

		// Find the next available id
		const id = Math.max( 0, ...dummyTodos.map(todo => todo.id) ) + 1;

		// Create our new dummy todo
		const todo: Todo = {
			id,
			...payload,
		}

		// Add dummy todo to our list of dummy todos
		dummyTodos.push(todo);

		return HttpResponse.json(todo, { status: 201 });
	}),

	// Mock update todo
	// PATCH http://localhost:3001/todos/:todoId

	// Mock delete todo
	// DELETE http://localhost:3001/todos/:todoId
];
