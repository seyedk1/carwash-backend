const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const { createOrderSchema } = require("../schema/create-order-schema");
const { editOrderSchema } = require("../schema/edit-order-schema");

const orderSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    car_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup",
        required: true,
    },

    car_brand_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup",
        required: true,
    },

    car_color_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup",
        required: true,
    },

    status_id: {
        type: Schema.Types.ObjectId,
        ref: "Lookup",
        description: "Specifies the status of the order"
    },

    service_id: {
        type: Schema.Types.ObjectId,
        ref: "Service"
    },

    service_date: {
        type: String,
        required: true,
        validate: {
            validator: function (n) {
                return /^[1-4]\d{3}\/((0[1-6]\/((3[0-1])|([1-2][0-9])|(0[1-9])))|((1[0-2]|(0[7-9]))\/(30|([1-2][0-9])|(0[1-9]))))$/.test(n);
            },
            message: '{VALUE} is not a date!'
        },
        description: "Format: jYYYY/JMM/JDD",
    },

    service_hour: {
        type: String,
        required: true,
        enum: ['9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
        description: "Services are provided during these hours"
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

// create order
orderSchema.statics.createOrderValidation = function (body) {
    return createOrderSchema.validate(body, { abortEarly: false });
};

// edit order
orderSchema.statics.editOrderValidation = function (body) {
    return editOrderSchema.validate(body, { abortEarly: false });
};

const order = mongoose.model("Order", orderSchema)

module.exports = order