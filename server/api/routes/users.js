const express = require("express");
const { createUser } = require("../controllers/users");
const app = express.Router();

/**
 * @path /api/users
 * @method POST
 */
app.post("/", createUser);

module.exports = app;