import { it, expect } from "vitest";
import { getRandomNumber } from "./randomNumber";

it("generates a random number between 1-10", () => {
	const randomNumber = getRandomNumber();

	expect(randomNumber).toBeGreaterThanOrEqual(1);
	expect(randomNumber).toBeLessThanOrEqual(10);
});

it("generates a random number between 1-50", () => {
	const max = 50;
	const randomNumber = getRandomNumber(max);

	expect(randomNumber).toBeGreaterThanOrEqual(1);
	expect(randomNumber).toBeLessThanOrEqual(max);
});

it("generates random number between 1-10", () => {
	for (let i = 0; i < 10; i++) {
		const max = 10;
		const randomNumber = getRandomNumber(max);

		expect(randomNumber).toBeGreaterThanOrEqual(1);
		expect(randomNumber).toBeLessThanOrEqual(max);
	}
});
