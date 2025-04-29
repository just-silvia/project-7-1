const { mergeOptions } = require(".")

const DEFAULT_ERROR_OPTIONS = {
    code: 500,
    message: "Internal Server Error",
}

/**
 * Output error utility
 * @param {Response} res 
 * @param {Error} error 
 * @param {object} options 
 * @param {number} [options.code]
 * @param {string} [options.message]
 */
const outError = (res, error, options = DEFAULT_ERROR_OPTIONS) => {
    options = mergeOptions(DEFAULT_ERROR_OPTIONS, options);

    console.log(error);

    return res.status(options.code).json({ message: options.message });
}

module.exports = {
    outError,
}