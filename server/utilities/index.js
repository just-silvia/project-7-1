/**
 * Mergind options to avoid data loss
 * @param {object} defaultOptions 
 * @param {object} currentOptions 
 * @returns {object} Merged options
 */
const mergeOptions = (defaultOptions, currentOptions) => {
    return { ...defaultOptions, ...currentOptions };
}

module.exports = {
    mergeOptions
}