require('module-alias/register')

//model
const Order = require("../model/order-model");

exports.editOrder = async (req, res, next) => {

    const { car_id, car_brand_id, car_color_id, service_id, service_date, service_hour, address } = req.body

    const condition = { _id: req.params.id, is_canceled: false, is_submit: false, is_deleted: false }
    try {
        const order = await Order.findOne(condition)

        if (!order) {
            res.status(404).json({ message: "order not found" })
        }

        if (order.user_id !== req.user_id && !req.user.is_admin) {
            res.status(401).json({ message: "you haven't permission!" })
        }

        await Order.editOrderValidation({
            car_id, car_brand_id, car_color_id, service_id, service_date, service_hour, address
        });

        await Order.updateOne(condition, {
            car_id,
            car_brand_id,
            car_color_id,
            service_id,
            service_date,
            service_hour,
            address
        });



        res.status(200).json({ message: 'order is updated successfully' })

    } catch (err) {
        console.log(err);
        next(err)
    }
};