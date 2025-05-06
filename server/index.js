require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
const helmet = require("helmet");
const { logger } = require("./utilities/logger");
const db = require("./db");

const { SERVER_PORT } = process.env;

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

db.connect();

app.listen(SERVER_PORT, () => {
    logger(`Server up and running on port ${SERVER_PORT}`);
});