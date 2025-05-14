const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { hashPassword } = require("../../utilities/auth");
const { User } = require("../../db");

/**
 * Get me informations
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getMe = async (req, res) => {
    return res.status(200).json(req.user);
}

module.exports = {
    getMe,
}