const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ConsultancySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true,
    },
    request_type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Canceled", "Completed"],
        default: "Pending",
    },
}, { strict: true, timestamps: true, versionKey: false });

ConsultancySchema.plugin(mongoosePaginate);

const Consultancy = model("Consultancy", ConsultancySchema);

module.exports = Consultancy;