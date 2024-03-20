import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import mockedLocalStorage from "../mocks/mockedLocalStorage";
import { getTodos, saveTodos } from "../utils/todoStorage";
import { Todo } from "../types/Todo";

// Reference to the original localStorage
let originalLocalStorage: any;

const TODO: Todo = {
	id: 1,
	title: "My first todo",
	completed: false,
}

beforeEach(() => {
	// Save a reference to the original localStorage before each test
	originalLocalStorage = globalThis.localStorage;

	// Replace localStorage with the mocked version
	globalThis.localStorage = mockedLocalStorage();
});

afterEach(() => {
	// Restore localStorage to the original version
	globalThis.localStorage = originalLocalStorage;
});

describe("get todos", () => {
	it("returns empty list of todos", () => {
		// 🕵🏻‍♂️ register a spy on "getItem"
		const getItemSpy = vi.spyOn(globalThis.localStorage, "getItem");
		const todos = getTodos(); // getItem

		// 👀
		expect(getItemSpy).toHaveBeenCalledOnce();
		// expect(getItemSpy).toHaveBeenCalledTimes(1); // same as above
		expect(todos.length).toBe(0);
	});
});

describe("save todos", () => {
	it("can save a todo", () => {
		// register a spy on setItem
		const setItemSpy = vi.spyOn(globalThis.localStorage, "setItem");

		// save TODO and make sure its ok
		const res = saveTodos([ TODO ]);

		expect(setItemSpy).toHaveBeenCalledOnce();
		expect(res.success).toBe(true);
	});

	it("can save a todo and then retrieve it", () => {
		// save TODO and then make sure we can retrieve it
		const res = saveTodos([ TODO ]);
		expect(res.success).toBe(true);

		const todos = getTodos();
		// expect(todos).toEqual([ TODO ]);
		expect(todos).toContainEqual(TODO);
	});
});
