import { Window } from "happy-dom";
import { afterEach, describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import dummyTodos from "./data/todos";

// Create a new instance of Window
// const window = new Window();
// const document = window.document;
const { document } = new Window();

// find the first finished todo
const finishedTodo = dummyTodos.find(todo => todo.completed) ?? {
	...dummyTodos[0],   // id: 1, title: "", completed: false
	completed: true,
};

// find the first unfinished todo
const unfinishedTodo = dummyTodos.find(todo => !todo.completed) ?? {
	...dummyTodos[0],   // id: 1, title: "", completed: true
	completed: false,
};


describe("render todos", () => {
	// 🧹
	afterEach(() => {
		document.body.innerHTML = "";
	});

	it("outputs empty list when no todos exist", () => {
		const html = transformTodosToHtml([]);
		expect(html).toBe("");
	});

	it("outputs a list with one todo", () => {
		const todoLIs = transformTodosToHtml([ dummyTodos[0] ]);

		document.body.innerHTML = `<ul>${todoLIs}</ul>`;

		// query for any listitems with the class todo
		expect(document.querySelectorAll("li.todo")).toHaveLength(1);
		// expect(document.querySelectorAll("li.todo").length).toBe(1); // also works
	});

	it("outputs a list with one completed todo", () => {
		const todoLIs = transformTodosToHtml([ finishedTodo ]);
		document.body.innerHTML = `<ul>${todoLIs}</ul>`;

		expect(document.querySelectorAll("li.todo.completed")).toHaveLength(1);
	});

	it("outputs a list with many todos", () => {
		const todoLIs = transformTodosToHtml(dummyTodos);
		document.body.innerHTML = `<ul>${todoLIs}</ul>`;

		expect(document.querySelectorAll("li.todo")).toHaveLength(dummyTodos.length);
	});

	it("outputs a list with one not completed todo", () => {
		const todoLIs = transformTodosToHtml([ unfinishedTodo ]);
		document.body.innerHTML = `<ul>${todoLIs}</ul>`;

		// expect(document.querySelectorAll("li.todo")).toHaveLength(1);
		// expect(document.querySelectorAll("li.todo.completed")).toHaveLength(0);
		expect(document.querySelectorAll("li:not(.completed).todo")).toHaveLength(1);
	});
});
