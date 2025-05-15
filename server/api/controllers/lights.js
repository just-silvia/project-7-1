const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { Light, Tank } = require("../../db");

/**
 * Get paginated lights
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getLights = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    });

    try {
        const { limit, page } = await schema.validateAsync(req.query);

        const lights = await Light.paginate({ user: user._id }, { limit, page, lean: true });

        return res.status(200).json(lights);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Get light by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getLightById = async (req, res) => {
    const user = req.user;
    const light_id = req.params.light_id;

    try {
        const light = await Light.findOne({ user: user._id, _id: light_id }, null, { lean: true });

        return res.status(200).json(light);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Create new light
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const createLight = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        lumen: Joi.number().required(),
        tank: Joi.string().optional(),
    });

    try {
        let tank = null;

        const data = await schema.validateAsync(req.body);

        if (data.tank) {
            tank = data.tank;
            delete data.tank;
        }

        const light = (await new Light({ user: user._id, ...data }).save()).toObject();

        if (tank) {
            await Tank.updateOne({ user: user._id, _id: tank }, { $push: { lights: light._id } });
        }

        return res.status(201).json(light);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Update light by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const updateLightById = async (req, res) => {
    const user = req.user;
    const light_id = req.params.light_id;

    const schema = Joi.object().keys({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        lumen: Joi.number().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Light.updateOne({ user: user._id, _id: light_id }, data);

        return res.status(200).json({ message: "Light updated" });
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Delete light by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const deleteLightById = async (req, res) => {
    const user = req.user;
    const light_id = req.params.light_id;

    try {
        await Light.deleteOne({ user: user._id, _id: light_id });

        return res.status(200).json({ message: "Light deleted" });
    } catch (error) {
        return outError(res, error);
    }
}

module.exports = {
    getLights,
    getLightById,
    createLight,
    updateLightById,
    deleteLightById,
}