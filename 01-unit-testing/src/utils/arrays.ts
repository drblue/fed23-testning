/**
 * Array utilities
 */

/**
 * Returns a clone of the array
 *
 * @param arr Array to clone
 */
export const clone = (arr: any[]) => {
	console.log("cloning array");
	return [...arr];
	// return Array.from(arr);
}
