const mongoose = require("mongoose");
const { logger } = require("../utilities/logger");

const { DB_URI } = process.env;

/**
 * Connect to mongodb atlas instance
 */
const connect = async () => {
    try {
        await mongoose.connect(DB_URI);

        logger("Database connected");
    } catch (error) {
        logger(null, { error });
    }
}

/**
 * Disconnect from current instance
 */
const disconnect = async () => {
    try {
        await mongoose.disconnect();

        logger("Database disconnected");
    } catch (error) {
        logger(null, { error });
    }
}

const models = {
    User: require("./models/User"),
    Tank: require("./models/Tank"),
    Plant: require("./models/Plant"),
    Light: require("./models/Light"),
    Consultancy: require("./models/Consultancy"),
    Brand: require("./models/Brand"),
    Calculator: require("./models/Calculator"),
};

module.exports = {
    connect,
    disconnect,
    ...models,
}