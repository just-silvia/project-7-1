const express = require("express");
const { authUser } = require("../../middleware/authUser");
const { getPlants, getPlantById, createPlant, updatePlantById, deletePlantById } = require("../controllers/plants");
const app = express.Router();

/**
 * @path /api/plants
 * @method GET
 */
app.get("/", authUser(["user"]), getPlants);

/**
 * @path /api/plants/:plant_id
 * @method GET
 */
app.get("/:plant_id", authUser(["user"]), getPlantById);

/**
 * @path /api/plants
 * @method POST
 */
app.post("/", authUser(["user"]), createPlant);

/**
 * @path /api/plants/:plant_id
 * @method PUT
 */
app.put("/:plant_id", authUser(["user"]), updatePlantById);

/**
 * @path /api/plants/:plant_id
 * @method DELETE
 */
app.delete("/:plant_id", authUser(["user"]), deletePlantById);

module.exports = app;