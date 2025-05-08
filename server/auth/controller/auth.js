const Joi = require("joi");
const bcrypt = require("bcryptjs");
const { outError } = require("../../utilities/errors");
const { User } = require("../../db");
const { comparePassword, generateToken } = require("../../utilities/auth");

/**
 * User login
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
const login = async (req, res) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const user = await User.findOne({ email: data.email }, null, { lean: true });

        if (!user) return res.status(404).json({ message: "User Not Found 1" });

        if (!(await comparePassword(data.password, user.password))) return res.status(404).json({ message: "User Not Found 2" });

        const token = generateToken({ _id: user._id });

        const { password, is_active, ...userData } = user;

        return res.status(201).json({ token, user: userData })
    } catch(error) {
        return outError(res, error);
    }
}

module.exports = {
    login,
}