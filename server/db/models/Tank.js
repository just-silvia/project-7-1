const { Schema, model } = require("mongoose");

const TankSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["TROPICAL", "FRESH"]
    },
    volume: {
        type: Number,
        required: true,
        min: 1,
    },
    dimensions: {
        type: {
            h: {
                type: Number,
                required: true,
            },
            l: {
                type: Number,
                required: true,
            },
            d: {
                type: Number,
                required: true,
            },
        },
        required: true,
    },
    plants: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Plant",
            requried: true,
        }],
        default: [],
    },
    lights: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Light",
            requried: true,
        }],
        default: [],
    },
}, { strict: true, timestamps: true, versionKey: false });

const Tank = model("Tank", TankSchema);

module.exports = Tank;