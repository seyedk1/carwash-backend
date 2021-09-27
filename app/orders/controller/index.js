const { createOrder } = require('./create-order-controller')
const { editOrder } = require('./edit-order-controller')
const { getAllOrders } = require('./get-all-orders-controller')
const { getSingleOrder } = require('./get-single-order-controller')
const { cancelOrder } = require('./cancel-order-controller')
const { deleteOrder } = require('./delete-order-controller')
const { submitOrder } = require('./submit-order-controller')

module.exports = {
    createOrder,
    editOrder,
    getAllOrders,
    getSingleOrder,
    cancelOrder,
    deleteOrder,
    submitOrder
}
