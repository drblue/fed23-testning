import { Window } from "happy-dom";
import { afterEach, describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";
import dummyTodos from "./data/todos";

// Create a new instance of Window
const window = new Window();
const document = window.document;

describe("render todos", () => {

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

	it.todo("outputs a list with one completed todo");

	it.todo("outputs a list with many todos");

	it.todo("outputs a list with one not completed todo");
});
