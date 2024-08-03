import { describe, it, expect } from "vitest";
import { add, sub } from "./sum";

describe("tests addition", () => {
	it("should add two numbers", () => {
		expect(add(1, 2)).toBe(3);
		expect(add(3, 4)).toBe(7);
	});

	it("should add any two numbers", () => {
		expect(add(2, 2)).toBe(4);
		expect(add(3, 7)).toBe(10);
	});

	it("should add three numbers", () => {
		expect(add(1, 2, 3)).toBe(6);
	});

	it("should add four numbers", () => {
		expect(add(1, 2, 3, 4)).toBe(10);
		expect(add(1, 2, 3, 4)).not.toBe("10");
	});
});

describe("tests subtraction", () => {
	it("should subtract two numbers", () => {
		expect(sub(1342, 5)).toBe(1337);
	});

	it("should subtract three numbers", () => {
		expect(sub(420, 300, 78)).toBe(42);
	});
});
