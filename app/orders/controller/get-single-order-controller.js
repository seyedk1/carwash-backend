//model
const Order = require("../model/order-model");

exports.getSingleOrder = async (req, res, next) => {

    try {
        const order = await Order.findOne({ _id: req.params.id, is_deleted: false })
            .populate([
                { path: 'user_id', select: 'username first_name last_name is_admin' },
                { path: 'car_id', select: 'title' },
                { path: 'car_brand_id', select: 'title' },
                { path: 'car_color_id', select: 'title' },
                { path: 'status_id', select: 'title' },
                { path: 'service_id', select: 'name image price description' },
            ])

        if (!order) {
            const error = new Error("service not found")
            error.statusCode = 422
            throw error
        }

        res.status(200).json({
            order
        })

    } catch (err) {
        next(err)
    }
}