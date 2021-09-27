//model
const Order = require("../model/order-model");

exports.submitOrder = async (req, res, next) => {

    const condition = { _id: req.params.id, is_deleted: false }

    try {
        const order = await Order.findOneAndUpdate(condition, { is_submit: true })

        if (!order) {
            res.status(404).json({ message: "order not found" })
        }

        res.status(200).json({ message: 'order is submited successfully' })

    } catch (err) {
        console.log(err);
        next(err)
    }
};