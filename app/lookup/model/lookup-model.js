const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { createLookupSchema } = require("../schema/create-lookup-schema");
const { editLookupSchema } = require("../schema/edit-lookup-schema");

const lookupSchema = new Schema({

    auto_id: {
        type: String
    },

    parent_id: {
        type: String,
        default: '0'
    },

    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
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

// pre middleware
lookupSchema.pre('save', function (next) {
    var sno = 1;
    var lookup = this;
    Lookup.find({}, function (err, lookups) {
        if (err) throw err;
        sno = lookups.length + 1;
        lookup.auto_id = sno;
        next();
    });
});

// create Lookup
lookupSchema.statics.createLookupValidation = function (body) {
    return createLookupSchema.validate(body, { abortEarly: false });
};

// update lookup
lookupSchema.statics.editLookupValidation = function (body) {
    return editLookupSchema.validate(body, { abortEarly: false });
};

const Lookup = mongoose.model("Lookup", lookupSchema)

module.exports = Lookup