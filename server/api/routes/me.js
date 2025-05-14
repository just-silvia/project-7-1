const express = require("express");
const { authUser } = require("../../middleware/authUser");
const { getMe } = require("../controllers/me");
const app = express.Router();

/**
 * @path /api/me
 * @method GET
 */
app.get("/", authUser(["user"]), getMe);

module.exports = app;