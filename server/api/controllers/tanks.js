const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { hashPassword } = require("../../utilities/auth");
const { User, Tank } = require("../../db");

/**
 * Get paginated tanks
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getTanks = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    });

    try {
        const { limit, page } = await schema.validateAsync(req.query);

        const tanks = await Tank.paginate({ user: user._id }, { limit, page, lean: true, populate: ["plants", "lights"] });

        return res.status(200).json(tanks);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Get tank by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getTankById = async (req, res) => {
    const user = req.user;
    const tank_id = req.params.tank_id;

    try {
        const tank = await Tank.findOne({ user: user._id, _id: tank_id }, null, { lean: true })
            .populate("plants")
            .populate("lights");

        return res.status(200).json(tank);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Create new tank
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const createTank = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string().valid("TROPICAL", "FRESH").required(),
        volume: Joi.number().required(),
        dimensions: Joi.object().keys({
            h: Joi.number().required(),
            l: Joi.number().required(),
            d: Joi.number().required(),
        }).required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const tanks = (await new Tank({ user: user._id, ...data }).save()).toObject();

        return res.status(201).json(tanks);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Update tank by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const updateTankById = async (req, res) => {
    const user = req.user;
    const tank_id = req.params.tank_id;

    const schema = Joi.object().keys({
        name: Joi.string().optional(),
        type: Joi.string().valid("TROPICAL", "FRESH").optional(),
        volume: Joi.number().optional(),
        dimensions: Joi.object().keys({
            h: Joi.number().required(),
            l: Joi.number().required(),
            d: Joi.number().required(),
        }).optional(),
        plants: Joi.array().items(Joi.string()).optional(),
        lights: Joi.array().items(Joi.string()).optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Tank.updateOne({ user: user._id, _id: tank_id }, data);

        return res.status(200).json({ message: "Tank updated" });
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Delete tank by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const deleteTankById = async (req, res) => {
    const user = req.user;
    const tank_id = req.params.tank_id;

    try {
        await Tank.deleteOne({ user: user._id, _id: tank_id });

        return res.status(200).json({ message: "Tank deleted" });
    } catch (error) {
        return outError(res, error);
    }
}

module.exports = {
    getTanks,
    getTankById,
    createTank,
    updateTankById,
    deleteTankById,
}