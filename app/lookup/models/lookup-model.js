const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { createLookupSchema } = require("../schemas/create-lookup-schema");

const lookupSchema = new Schema({
    parent_id: {
        type: Number,
        default: null
    },
    title: {
        type: String,
        required: true,
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

// create Lookup
lookupSchema.statics.createLookupValidation = function (body) {
    return createLookupSchema.validate(body, { abortEarly: false });
};

const Lookup = mongoose.model("Lookup", lookupSchema)

module.exports = Lookup