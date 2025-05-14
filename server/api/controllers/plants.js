const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { Plant, Tank } = require("../../db");

/**
 * Get paginated plants
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getPlants = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    });

    try {
        const { limit, page } = await schema.validateAsync(req.query);

        const plants = await Plant.paginate({ user: user._id }, { limit, page, lean: true, populate: ["plants", "lights"] });

        return res.status(200).json(plants);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Get plant by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getPlantById = async (req, res) => {
    const user = req.user;
    const plant_id = req.params.plant_id;

    try {
        const plant = await Plant.findOne({ user: user._id, _id: plant_id }, null, { lean: true })
            .populate("plants")
            .populate("lights");

        return res.status(200).json(plant);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Create new plant
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const createPlant = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        tank: Joi.string().optional(),
    });

    try {
        let tank = null;

        const data = await schema.validateAsync(req.body);

        if (data.tank) {
            tank = data.tank;
            delete data.tank;
        }

        const plant = (await new Plant({ user: user._id, ...data }).save()).toObject();

        if (tank) {
            await Tank.updateOne({ user: user._id, _id: tank }, { $push: { plants: plant._id } });
        }


        return res.status(201).json(plant);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Update plant by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const updatePlantById = async (req, res) => {
    const user = req.user;
    const plant_id = req.params.plant_id;

    const schema = Joi.object().keys({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Plant.updateOne({ user: user._id, _id: plant_id }, data);

        return res.status(200).json({ message: "Plant updated" });
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Delete plant by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const deletePlantById = async (req, res) => {
    const user = req.user;
    const plant_id = req.params.plant_id;

    try {
        await Plant.deleteOne({ user: user._id, _id: plant_id });

        return res.status(200).json({ message: "Plant deleted" });
    } catch (error) {
        return outError(res, error);
    }
}

module.exports = {
    getPlants,
    getPlantById,
    createPlant,
    updatePlantById,
    deletePlantById,
}