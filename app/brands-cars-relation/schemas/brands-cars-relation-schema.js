const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { createBrandsCarsRelationSchema } = require("../schemas/brands-cars-relation-schema");

const brandsCarsRelationSchema = new Schema({

    brand_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup"
    },

    car_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup"
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
})

// create brands cars relation
brandsCarsRelationSchema.statics.createBrandsCarsRelationValidation = function (body) {
    return createBrandsCarsRelationSchema.validate(body, { abortEarly: false });
};

const brandsCarsRelation = mongoose.model("BrandsCarsRelation", brandsCarsRelationSchema)

module.exports = brandsCarsRelation