const express = require("express");
const app = express.Router();
const { authUser } = require("../../middleware/authUser");
const { getConsultancies, getConsultancyById, createConsultancy, deleteConsultancyById } = require("../controllers/consultancies");

/**
 * @path /api/consultancies
 * @method GET
 */
app.get("/", authUser(["user"]), getConsultancies);

/**
 * @path /api/consultancies/:consultancy_id
 * @method GET
 */
app.get("/:consultancy_id", authUser(["user"]), getConsultancyById);

/**
 * @path /api/consultancies
 * @method POST
 */
app.post("/", authUser(["user"]), createConsultancy);

/**
 * @path /api/consultancies/:consultancy_id
 * @method DELETE
 */
app.delete("/:consultancy_id", authUser(["user"]), deleteConsultancyById);

module.exports = app;