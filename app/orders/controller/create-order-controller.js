require('module-alias/register')

const Order = require("../model/order-model");
const Lookup = require("@root/app/lookup/model/lookup-model");


exports.createOrder = async (req, res, next) => {
    try {
        await Order.createOrderValidation(req.body);
        const { car_id, car_brand_id, car_color_id, service_id, service_date, service_hour, address } = req.body;

        const order = await Order.findOne({ service_date, service_hour, is_canceled: false, is_deleted: false });
        if (order) {
            const error = new Error("please choose another time to order, this time is reserved by another person")
            error.statusCode = 422
            throw error
        }
        else {

            const status = await Lookup.findOne({ title: 'در انتظار وصل شدن به سرویس کار' }).select('_id')

            const submit_order = {
                user_id: req.user_id,
                car_id,
                car_brand_id,
                car_color_id,
                service_id,
                status_id: status._id,
                service_date,
                service_hour,
                address,
            }

            await Order.create(submit_order);

            res.status(201).json({ message: "order is submited successfully" })
        }
    } catch (err) {
        console.log(err);
        next(err)
    }
};
