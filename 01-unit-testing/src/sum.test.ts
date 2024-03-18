import { it, expect } from "vitest";
import { sum } from "./sum";

it("should sum two numbers", () => {
	expect(sum(1, 2)).toBe(3);
	expect(sum(3, 4)).toBe(7);
});

it("sums any two numbers", () => {
	expect(sum(2, 2)).toBe(4);
	expect(sum(3, 7)).toBe(10);
});

it("should sum three numbers", () => {
	expect(sum(1, 2, 3)).toBe(6);
});

it("should sum four numbers", () => {
	expect(sum(1, 2, 3, 4)).toBe(10);
	expect(sum(1, 2, 3, 4)).not.toBe("10");
});
