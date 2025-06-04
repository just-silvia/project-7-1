const express = require("express");
const app = express.Router();
const { authUser } = require("../../middleware/authUser");
const { getCalculators, getCalculatorById, createCalculator, updateCalculatorById, deleteCalculatorById } = require("../controllers/calculators");

/**
 * @path /api/calculators
 * @method GET
 */
app.get("/", authUser(["user"]), getCalculators);

/**
 * @path /api/calculators/:calculator_id
 * @method GET
 */
app.get("/:calculator_id", authUser(["user"]), getCalculatorById);

/**
 * @path /api/calculators
 * @method POST
 */
app.post("/", authUser(["user"]), createCalculator);

/**
 * @path /api/calculators/:calculator_id
 * @method POST
 */
app.put("/:calculator_id", authUser(["user"]), updateCalculatorById);

/**
 * @path /api/calculators/:calculator_id
 * @method DELETE
 */
app.delete("/:calculator_id", authUser(["user"]), deleteCalculatorById);

module.exports = app;