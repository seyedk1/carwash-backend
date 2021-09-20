const { Router } = require("express");

const lookupController = require("./controller");
// const { authenticated } = require("@root/core/middleware/auth")


const router = new Router();

//  @desc   Create Lookup Handle
//  @route  POST /api/lookup/create-lookup
router.post("/create-lookup", lookupController.createLookup);

//  @desc   Get All Data From Lookup
//  @route  GET /api/lookup/get-all-lookup
router.get("/get-all-lookups", lookupController.getAllLookups);

//  @desc   Get Single Data From Lookup
//  @route  GET /api/lookup/get-single-lookup
router.get("/get-single-lookup/:id", lookupController.getSingleLookup);

//  @desc   Update Data From Lookup
//  @route  PUT /api/lookup/edit-lookup
router.put("/edit-lookup/:id", lookupController.editLookup);

//  @desc   Delete Data From Lookup
//  @route  DELETE /api/lookup/delete-lookup
router.delete("/delete-lookup/:id", lookupController.deleteLookup);

module.exports = router;
