/**
 * @vitest-environment happy-dom
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { getTodos, saveTodos } from "../utils/todoStorage";
import { Todo } from "../types/Todo";

const TODO: Todo = {
	id: 1,
	title: "My first todo",
	completed: false,
}

// 🧹 Reset the environment so tests aren't dependent on each other
afterEach(() => {
	globalThis.localStorage.clear();
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
