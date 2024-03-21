import { afterEach, describe, expect, it } from "vitest";
import { transformTodosToHtml } from "../utils/render";

describe("render todos", () => {

	it("outputs empty list when no todos exist", () => {
		const html = transformTodosToHtml([]);
		expect(html).toBe("");
	});

	it.todo("outputs a list with one todo");

	it.todo("outputs a list with one completed todo");

	it.todo("outputs a list with two todos");

});
