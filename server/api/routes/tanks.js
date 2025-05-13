const express = require("express");
const { authUser } = require("../../middleware/authUser");
const { getTanks, getTankById, createTank, updateTankById, deleteTankById } = require("../controllers/tanks");
const app = express.Router();

/**
 * @path /api/tanks
 * @method GET
 */
app.get("/", authUser(["user"]), getTanks);

/**
 * @path /api/tanks/:tank_id
 * @method GET
 */
app.get("/:tank_id", authUser(["user"]), getTankById);

/**
 * @path /api/tanks
 * @method POST
 */
app.post("/", authUser(["user"]), createTank);

/**
 * @path /api/tanks/:tank_id
 * @method PUT
 */
app.put("/:tank_id", authUser(["user"]), updateTankById);

/**
 * @path /api/tanks/:tank_id
 * @method DELETE
 */
app.delete("/:tank_id", authUser(["user"]), deleteTankById);

module.exports = app;