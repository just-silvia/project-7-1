const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { hashPassword } = require("../../utilities/auth");
const { User } = require("../../db");

/**
 * Create a new user
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const createUser = async (req, res) => {
    const schema = Joi.object().keys({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        is_privacy_accepted: Joi.boolean().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        data.password = await hashPassword(data.password);

        const user = (await new User(data).save()).toObject();

        delete user.password;

        return res.status(201).json(user);
    } catch (error) {
        return outError(res, error);
    }
}

module.exports = {
    createUser,
}