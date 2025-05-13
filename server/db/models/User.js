const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    is_privacy_accepted: {
        type: Boolean,
        default: true,
    },
}, { strict: true, timestamps: true, versionKey: false });

const User = model("User", UserSchema);

module.exports = User;