/**
 * A delay function
 * @param {number} ms - delay time on milliseconds.
 * @returns 
 */
const sleep = async (ms = 1000) => {
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

/**
 * Applies Throttle pattern to a callback
 * Reference: https://coffeebytes.dev/debounce-y-throttle-en-javascript/
 * @param {*} cb 
 * @param {*} delay 
 * @returns 
 */
const throttle = (cb, delay = 500) => {
    let waiting = false;
    
    return async (...args) => {
        
        if (waiting) return;

        waiting = true;
 
        try {
            await cb(...args);
        }catch(err){
            console.log("Error: ", err);
        }

        await sleep(delay)
    
        waiting = false;
    }
}