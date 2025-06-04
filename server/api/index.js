const express = require("express");
const app = express.Router();

/**
 * @path /api/users
 */
app.use("/users", require("./routes/users"));

/**
 * @path /api/me
 */
app.use("/me", require("./routes/me"));

/**
 * @path /api/tanks
 */
app.use("/tanks", require("./routes/tanks"));

/**
 * @path /api/plants
 */
app.use("/plants", require("./routes/plants"));

/**
 * @path /api/lights
 */
app.use("/lights", require("./routes/lights"));

/**
 * @path /api/consultancies
 */
app.use("/consultancies", require("./routes/consultancies"));

/**
 * @path /api/brands
 */
app.use("/brands", require("./routes/brands"));

/**
 * @path /api/calculators
 */
app.use("/calculators", require("./routes/calculators"));

module.exports = app;