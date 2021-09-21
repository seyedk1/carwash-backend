const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { createServiceSchema } = require("../schema/create-service-schema");
const { editServiceSchema } = require("../schema/edit-service-schema");

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
        maxlength: 255
    },

    image: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true,
        min: 0
    },

    description: {
        type: String,
        required: false,
        minlength: 4,
        maxlength: 255
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

// create service
serviceSchema.statics.createServiceValidation = function (body) {
    return createServiceSchema.validate(body, { abortEarly: false });
};

// edit service
serviceSchema.statics.editServiceValidation = function (body) {
    return editServiceSchema.validate(body, { abortEarly: false });
};

const service = mongoose.model("Service", serviceSchema)

module.exports = service