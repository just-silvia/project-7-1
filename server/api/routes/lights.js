const express = require("express");
const { authUser } = require("../../middleware/authUser");
const { getLights, getLightById, createLight, updateLightById, deleteLightById } = require("../controllers/lights");
const app = express.Router();

/**
 * @path /api/lights
 * @method GET
 */
app.get("/", authUser(["user"]), getLights);

/**
 * @path /api/lights/:light_id
 * @method GET
 */
app.get("/:light_id", authUser(["user"]), getLightById);

/**
 * @path /api/lights
 * @method POST
 */
app.post("/", authUser(["user"]), createLight);

/**
 * @path /api/lights/:light_id
 * @method PUT
 */
app.put("/:light_id", authUser(["user"]), updateLightById);

/**
 * @path /api/lights/:light_id
 * @method DELETE
 */
app.delete("/:light_id", authUser(["user"]), deleteLightById);

module.exports = app;