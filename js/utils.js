/**
 * A delay function
 * @param {number} ms - delay time on milliseconds.
 * @returns 
 */
const sleep = async (ms=1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}