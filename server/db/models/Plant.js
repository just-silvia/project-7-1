const { Schema, model } = require("mongoose");

const PlantSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const Plant = model("Plant", PlantSchema);

module.exports = Plant;