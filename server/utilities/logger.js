const { mergeOptions } = require(".");

const { SERVER_ENV } = process.env;

const DEFAULT_LOGGER_OPTIONS = {
    type: "info",
    error: null
}

/**
 * Log messages based on server env status
 * just for debugging purpose
 * @param {string} message 
 * @param {object} options 
 * @param {object} [options.type="info"]
 * @param {object} [options.error=null] 
 */
const logger = (message, options = DEFAULT_LOGGER_OPTIONS) => {
    options = mergeOptions(DEFAULT_LOGGER_OPTIONS, options);

    if (SERVER_ENV == "development" && options.error) {
        console.log(options.error);
        return;
    }

    if (SERVER_ENV == "development") {
        console.log(`[${options.type == "error" ? "Error" : "Server"}]: ${message}`);
    }
}

module.exports = {
    logger,
}