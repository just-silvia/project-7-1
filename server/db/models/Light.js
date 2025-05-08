const { Schema, model } = require("mongoose");

const LightSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    lumen: {
        type: Number,
        requried: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Light = model("Light", LightSchema);

module.exports = Light;