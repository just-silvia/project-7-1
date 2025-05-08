const express = require("express");
const { login } = require("../controller/auth");
const app = express.Router();

/**
 * @path /auth/login
 * @method POST
 */
app.post("/", login);

module.exports = app;