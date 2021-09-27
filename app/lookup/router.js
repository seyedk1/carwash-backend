require('module-alias/register')

const { Router } = require("express");

const lookupController = require("./controller");
const { authenticated } = require("@root/core/middleware/auth")


const router = new Router();

//  @desc   Create Lookup Handle
//  @route  POST /api/lookup/create-lookup
router.post("/create-lookup", authenticated, lookupController.createLookup);

//  @desc   Get All Data From Lookup
//  @route  GET /api/lookup/get-all-lookup
router.get("/get-all-lookups", authenticated, lookupController.getAllLookups);

//  @desc   Get Single Data From Lookup
//  @route  GET /api/lookup/get-single-lookup/:id
router.get("/get-single-lookup/:id", authenticated, lookupController.getSingleLookup);

//  @desc   Update Data From Lookup
//  @route  PUT /api/lookup/edit-lookup/:id
router.put("/edit-lookup/:id", authenticated, lookupController.editLookup);

//  @desc   Delete Data From Lookup
//  @route  DELETE /api/lookup/delete-lookup/:id
router.delete("/delete-lookup/:id", authenticated, lookupController.deleteLookup);

module.exports = router;
