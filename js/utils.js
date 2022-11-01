/**
 * A delay function
 * @param {number} ms - delay time on milliseconds.
 * @returns 
 */
const sleep = async (ms=1000) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Scrolls user's view to the top.
 */
const scrollToTop = () => {
    window.scrollTo({ top: 0 , behavior: 'smooth'});
}

/**
 * Checks if user reaches the bottom of the view.
 * @returns {boolean}
 */
const scrollBottomReached = () => {
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    return (scrollTop + clientHeight) >= (scrollHeight - 15);
}