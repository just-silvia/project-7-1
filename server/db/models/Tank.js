const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
            unique: true,
        }],
        default: [],
    },
    lights: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Light",
            requried: true,
            unique: true,
        }],
        default: [],
    },
}, { strict: true, timestamps: true, versionKey: false });

TankSchema.plugin(mongoosePaginate);

const Tank = model("Tank", TankSchema);

module.exports = Tank;