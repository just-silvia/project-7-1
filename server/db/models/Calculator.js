const { Schema, model } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CalculatorSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requried: true,
    },
    name: {
        type: String,
        required: true,
    },
    parameters: {
        type: Object,
        required: true,
    },
    results: {
        type: Array,
        required: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

CalculatorSchema.plugin(mongoosePaginate);

const Calculator = model("Calculator", CalculatorSchema);

module.exports = Calculator;