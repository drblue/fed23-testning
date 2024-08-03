import { describe, expect, it, beforeAll } from "vitest";
import { clone } from "../utils/arrays";

describe("clones an array", () => {
	const a = ["i", "like", "unit", "tests"];
	let b: any[] = [];

	// is called before the tests in this suite is executed
	beforeAll(() => {
		b = clone(a);
	});

	it("contains the same number of items", () => {
		expect(b.length).toBe(a.length);
	});

	it("contains the same items", () => {
		expect(b).toEqual(a);
	});

	it("is not the same array", () => {
		expect(b).not.toBe(a);
	});
});
