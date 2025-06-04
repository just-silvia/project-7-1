const Joi = require("joi");
const { outError } = require("../../utilities/errors");
const { Calculator } = require("../../db");

/**
 * Get paginated calculators
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getCalculators = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        page: Joi.number().default(1),
        limit: Joi.number().default(10),
    });

    try {
        const { limit, page } = await schema.validateAsync(req.query);

        const calculators = await Calculator.paginate({ user: user._id }, { sort: { createdAt: -1 }, limit, page, lean: true });

        return res.status(200).json(calculators);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Get calculator by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const getCalculatorById = async (req, res) => {
    const user = req.user;
    const calculator_id = req.params.calculator_id;

    try {
        const calculator = await Calculator.findOne({ user: user._id, _id: calculator_id }, null, { lean: true });

        return res.status(200).json(calculator);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Create new calculator
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const createCalculator = async (req, res) => {
    const user = req.user;

    const schema = Joi.object().keys({
        name: Joi.string().required(),
        parameters: Joi.object().required(),
        results: Joi.array().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        const calculator = (await new Calculator({ user: user._id, ...data }).save()).toObject();

        return res.status(201).json(calculator);
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Update calculator
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const updateCalculatorById = async (req, res) => {
    const user = req.user;
    const calculator_id = req.params.calculator_id;

    const schema = Joi.object().keys({
        name: Joi.string().optional(),
        parameters: Joi.object().optional(),
        results: Joi.array().optional(),
    });

    try {
        const data = await schema.validateAsync(req.body);

        await Calculator.updateOne({ user: user._id, _id: calculator_id }, { ...data });

        return res.status(201).json({ message: "Calculation updated" });
    } catch (error) {
        return outError(res, error);
    }
}

/**
 * Delete calculator by id
 * @param {Request} req
 * @param {Response} res
 * @returns 
 */
const deleteCalculatorById = async (req, res) => {
    const user = req.user;
    const calculator_id = req.params.calculator_id;

    try {
        await Calculator.deleteOne({ user: user._id, _id: calculator_id });

        return res.status(200).json({ message: "Calculation deleted" });
    } catch (error) {
        return outError(res, error);
    }
}

module.exports = {
    getCalculators,
    getCalculatorById,
    createCalculator,
    updateCalculatorById,
    deleteCalculatorById,
}