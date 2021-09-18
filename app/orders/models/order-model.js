const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { createOrderSchema } = require("../schemas/create-order-schema");

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    car_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup"
    },

    car_brand_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup"
    },

    car_color_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup"
    },

    status_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup",
        description: "Specifies the status of the order"
    },

    service_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup"
    },

    service_date: {
        type: String,
        required: true,
        match: "^(\\d{4}-\\d{2}-\\d{2})",
        description: "Format: jYYYY/JMM/JDD"
    },

    service_hour: {
        type: String,
        required: true,
        enum: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
        description: "Services are provided during these hours"
    },

    fee_payable: {
        type: Number,
        required: true,
        min: 100000,
        description: "The minimum service price is 100,000 toman"
    },

    address: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 255,
        description: "Specifies the user address for provide service"
    },

    is_submit: {
        type: Boolean,
        default: false
    },

    is_canceled: {
        type: Boolean,
        default: false
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
})

// create service
orderSchema.statics.createOrderValidation = function (body) {
    return createOrderSchema.validate(body, { abortEarly: false });
};

const order = mongoose.model("Order", orderSchema)

module.exports = order