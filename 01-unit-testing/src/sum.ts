// add numbers together and return sum 🤯
export const add = (...numbers: number[]) => {
	/*
	// 🥴
	let sumOfNumbers = 0;
	for (let i = 0; i < numbers.length; i++) {
		sumOfNumbers += numbers[i];
	}

	return sumOfNumbers;
	*/

	// 🤩
	return numbers.reduce( (acc, num) => acc + num, 0 );
}

// subtract numbers from each other and return sum 🤯
export const sub = (...numbers: number[]) => {
	return numbers.reduce( (acc, num) => acc - num, 0 );
}
