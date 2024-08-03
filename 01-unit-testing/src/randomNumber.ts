/**
 * Returns a random number between 1..max
 *
 * @param max Largest number to return
 */
export const getRandomNumber = (max = 10) => {
	return Math.ceil(Math.random() * max);
}
