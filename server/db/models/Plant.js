const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PlantSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

PlantSchema.plugin(mongoosePaginate);

const Plant = model("Plant", PlantSchema);

module.exports = Plant;