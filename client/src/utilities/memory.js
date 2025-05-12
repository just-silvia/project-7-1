/**
 * Local memory manager for data persistants
 */
export const memory = {
    /**
     * Get data from local storage by key
     * @param {string} key 
     * @returns {any}
     */
    get: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
    /**
     * Save a new value inside local storage with a key
     * @param {string} key 
     * @param {any} value 
     * @returns {void}
     */
    set: (key, value) => {
        return localStorage.setItem(key, JSON.stringify(value));
    },
    /**
     * Remove data from local storage by key
     * @param {string} key 
     * @returns {void}
     */
    remove: (key) => {
        return localStorage.removeItem(key);
    },
    /**
     * Clear all data from local storage
     * @returns {void}
     */
    clear: () => {
        return localStorage.clear();
    }
}