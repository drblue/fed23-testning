import { http, HttpResponse, PathParams } from "msw";
import { Todo, TodoData } from "../types/Todo";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const dummyTodos: Todo[] = [
	{ id: 1, title: "My first todo", completed: false },
	{ id: 2, title: "My second todo", completed: true },
];

type CreateTodoRequestBody = TodoData;
type UpdateTodoRequestBody = Partial<TodoData>;

export const handlers = [
	// Mock get all todos
	// GET http://localhost:3001/todos
	http.get(BASE_URL + "/todos", () => {
		return HttpResponse.json(dummyTodos);
	}),

	// Mock get single todo
	// GET http://localhost:3001/todos/:todoId
	http.get(BASE_URL + "/todos/:todoId", ({ params }) => {
		// Get the todo ID from the request
		const todoId = Number(params.todoId);

		// Check if a todo with that ID exists
		const todo = dummyTodos.find(todo => todo.id === todoId);

		// If not, respond with empty object and HTTP 404 Not Found
		if (!todo) {
			// This is not the todo you are looking for
			return HttpResponse.json({}, { status: 404 });
		}

		// Otherwise, respond with the todo with the corresponding ID
		return HttpResponse.json(todo);
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
	http.patch<PathParams, UpdateTodoRequestBody>(BASE_URL + "/todos/:todoId", async ({ params, request }) => {
		// Get the todo ID from the request
		const todoId = Number(params.todoId);

		// Get PATCH body
		const payload = await request.json();

		// Check if a todo with that ID exists
		const todo = dummyTodos.find(todo => todo.id === todoId);

		// If not, respond with empty object and HTTP 404 Not Found
		if (!todo) {
			// This is not the todo you are looking for
			return HttpResponse.json({}, { status: 404 });
		}

		// Update todo with payload
		// todo.title = payload.title ? payload.title : todo.title;
		todo.title = payload.title ?? todo.title;
		todo.completed = payload.completed ?? todo.completed;

		return HttpResponse.json(todo);
	}),

	// Mock delete todo
	// DELETE http://localhost:3001/todos/:todoId
];
