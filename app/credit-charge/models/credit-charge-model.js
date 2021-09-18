const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { createCreditChargeSchema } = require("../schemas/credit-charge-schema");

const creditChargeSchema = new Schema({

    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    charge: {
        type: Number,
        required: true,
        min: 2000,
        description: "The minimum price for charge is 2000 toman."
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
})

// create credit charge
creditChargeSchema.statics.createCreditChargeValidation = function (body) {
    return createCreditChargeSchema.validate(body, { abortEarly: false });
};

const creditCharge = mongoose.model("CreditCharge", creditChargeSchema)

module.exports = creditCharge