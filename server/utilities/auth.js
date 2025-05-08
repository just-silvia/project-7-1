const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const { SERVER_SECRET_KEY } = process.env;

/**
 * Generate password hash
 * @param {string} password 
 * @returns {Promise<any>}
 */
const hashPassword = async (password) => {
    return await bcrypt.hash(password, 12);
}

/**
 * Compare hashed password with user input
 * @param {string} password 
 * @param {string} hash 
 * @returns {Promise<any>}
 */
const comparePassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}

/**
 * Generate user JWT
 * @param {object} payload 
 * @returns 
 */
const generateToken = (payload) => {
    return jwt.sign(payload, SERVER_SECRET_KEY);
}

/**
 * Verify user token
 * @param {string} token 
 * @returns 
 */
const verifyToken = (token) => {
    return jwt.verify(token, SERVER_SECRET_KEY);
}

module.exports = {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
}