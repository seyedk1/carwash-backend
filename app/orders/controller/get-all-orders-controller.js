//model
const Order = require("../model/order-model");

exports.getAllOrders = async (req, res, next) => {

    let query
    ({ page, size, ...query } = req.query)
    const constQuery = { is_deleted: false }

    try {
        const numberOfOrders = await Order.find({ ...query, ...constQuery }).countDocuments()

        const orders = await Order
            .find({ ...query, ...constQuery })
            .populate([
                { path: 'user_id', select: 'username first_name last_name is_admin' },
                { path: 'car_id', select: 'title' },
                { path: 'car_brand_id', select: 'title' },
                { path: 'car_color_id', select: 'title' },
                { path: 'status_id', select: 'title' },
                { path: 'service_id', select: 'name image price description' },
            ])
            .skip(((Number(page) || 1) - 1) * (Number(size) || 10))
            .limit(Number(size) || 10)

        res.status(200).json({
            items: orders,
            pageCount: Math.ceil(numberOfOrders / (Number(size) || 10))
        })


    } catch (err) {
        next(err)
    }
}