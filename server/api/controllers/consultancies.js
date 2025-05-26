const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { Consultancy } = require("../../db");

/**
 * Get paginated consultancies
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getConsultancies = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
        status: Joi.string().optional(),
    });

    try {
        const { limit, page, status } = await schema.validateAsync(req.query);

        const findObj = { user: user._id };

        if (status) findObj.status = status;

        const consultancies = await Consultancy.paginate(findObj, { sort: { createdAt: -1 }, limit, page, lean: true });

        return res.status(200).json(consultancies);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Get consultancy by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getConsultancyById = async (req, res) => {
    const user = req.user;
    const consultancy_id = req.params.consultancy_id;

    try {
        const consultancy = await Consultancy.findOne({ user: user._id, _id: consultancy_id }, null, { lean: true });

        return res.status(200).json(consultancy);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Create new consultancy
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const createConsultancy = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        request_type: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const consultancy = (await new Consultancy({ user: user._id, ...data }).save()).toObject();

        return res.status(201).json(consultancy);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Delete consultancy by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const deleteConsultancyById = async (req, res) => {
    const user = req.user;
    const consultancy_id = req.params.consultancy_id;

    try {
        await Consultancy.deleteOne({ user: user._id, _id: consultancy_id });

        return res.status(200).json({ message: "Consultancy deleted" });
    } catch (error) {
        return outError(res, error);
    }
}

module.exports = {
    getConsultancies,
    getConsultancyById,
    createConsultancy,
    deleteConsultancyById,
}