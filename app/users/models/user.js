const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { registerSchema } = require("../schemas/register-schema");

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: function (n) {
                return /d{11}/.test(n);
            },
            message: '{VALUE} is not a valid phone number!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255
    },

    role_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup"
    },

    is_admin: {
        type: Boolean,
        default: false
    },

    created_at: {
        type: Date,
        default: Date.now
    },

    is_active: {
        type: Boolean,
        default: true
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
})

userSchema.statics.createUserValidation = function (body) {
    return registerSchema.validate(body, { abortEarly: false });
};

const User = mongoose.model("User", userSchema)

module.exports = User