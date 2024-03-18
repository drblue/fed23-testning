import { it, expect } from "vitest";
import { add } from "./sum";

it("should add two numbers", () => {
	expect(add(1, 2)).toBe(3);
	expect(add(3, 4)).toBe(7);
});

it("adds any two numbers", () => {
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
