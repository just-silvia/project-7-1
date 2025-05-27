const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { Brand } = require("../../db");

/**
 * Get paginated brands
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getBrands = async (req, res) => {
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

        const brands = await Brand.paginate(findObj, { sort: { createdAt: -1 }, limit, page, lean: true });

        return res.status(200).json(brands);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Get brand by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getBrandById = async (req, res) => {
    const user = req.user;
    const brand_id = req.params.brand_id;

    try {
        const brand = await Brand.findOne({ user: user._id, _id: brand_id }, null, { lean: true });

        return res.status(200).json(brand);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Create new brand
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const createBrand = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        request_type: Joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const brand = (await new Brand({ user: user._id, ...data }).save()).toObject();

        return res.status(201).json(brand);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Delete brand by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const deleteBrandById = async (req, res) => {
    const user = req.user;
    const brand_id = req.params.brand_id;

    try {
        await Brand.deleteOne({ user: user._id, _id: brand_id });

        return res.status(200).json({ message: "Brand deleted" });
    } catch (error) {
        return outError(res, error);
    }
}

module.exports = {
    getBrands,
    getBrandById,
    createBrand,
    deleteBrandById,
}