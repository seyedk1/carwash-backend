require('module-alias/register')

const { Router } = require("express");

const servicesController = require("./controller");
const { authenticated } = require("@root/core/middleware/auth")


const router = new Router();

//  @desc   Create Service
//  @route  POST /api/services/create-service
router.post("/create-service", authenticated, servicesController.createService);

//  @desc   Get All Services
//  @route  GET /api/services/get-all-services
router.get("/get-all-services", authenticated, servicesController.getAllServices);

//  @desc   Get Single Service
//  @route  GET /api/services/get-single-service
router.get("/get-single-service/:id", authenticated, servicesController.getSingleService);

//  @desc   Edit Service
//  @route  PUT /api/services/edit-service
router.put("/edit-service/:id", authenticated, servicesController.editService);

//  @desc   Delete Service
//  @route  DELETE /api/services/delete-service
router.delete("/delete-service/:id", authenticated, servicesController.deleteService);

module.exports = router;
