const express = require("express");
const app = express.Router();
const { authUser } = require("../../middleware/authUser");
const { getBrands, getBrandById, createBrand, deleteBrandById } = require("../controllers/brands");

/**
 * @path /api/brands
 * @method GET
 */
app.get("/", authUser(["user"]), getBrands);

/**
 * @path /api/brands/:brand_id
 * @method GET
 */
app.get("/:brand_id", authUser(["user"]), getBrandById);

/**
 * @path /api/brands
 * @method POST
 */
app.post("/", authUser(["user"]), createBrand);

/**
 * @path /api/brands/:brand_id
 * @method DELETE
 */
app.delete("/:brand_id", authUser(["user"]), deleteBrandById);

module.exports = app;