/**
 * Array utilities
 */

/**
 * Returns a clone of the array
 *
 * @param arr Array to clone
 */
export const clone = (arr: any[]) => {
	return [...arr];
	// return Array.from(arr);
}
