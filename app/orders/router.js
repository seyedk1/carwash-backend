require('module-alias/register')

const { Router } = require("express");

const orderController = require("./controller");
const { authenticated } = require("@root/core/middleware/auth")


const router = new Router();

//  @desc   Create Order
//  @route  POST /api/order/create-order
router.post("/create-order", authenticated, orderController.createOrder);

//  @desc   Edit Order
//  @route  PUT /api/order/edit-order/:id
router.put("/edit-order/:id", authenticated, orderController.editOrder);

//  @desc   Get All Orders
//  @route  GET /api/order/get-all-orders
router.get("/get-all-orders", authenticated, orderController.getAllOrders);

//  @desc   Get Single Order
//  @route  GET /api/order/get-single-order/:id
router.get("/get-single-order/:id", authenticated, orderController.getSingleOrder);

//  @desc   Cancel Order
//  @route  DELETE /api/order/cancel-order/:id
router.delete("/cancel-order/:id", authenticated, orderController.cancelOrder);

//  @desc   Delete Order
//  @route  DELETE /api/order/delete-order/:id
router.delete("/delete-order/:id", authenticated, orderController.deleteOrder);

//  @desc   Submit Order
//  @route  PUT /api/order/submit-order/:id
router.put("/submit-order/:id", authenticated, orderController.submitOrder);


module.exports = router;
