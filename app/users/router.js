require('module-alias/register')

const { Router } = require("express");

const usersController = require("./controller");
const { authenticated } = require("@root/core/middleware/auth")


const router = new Router();

//  @desc   Register Handle
//  @route  POST /api/users/register
router.post("/register", usersController.register);

//  @desc   Login Handle
//  @route  POST /api/users/login
router.post("/login", usersController.login);

//  @desc   Get All Users
//  @route  GET /api/users/get-all-users
router.get("/get-all-users", authenticated, usersController.getAllUsers);

//  @desc   Get Single User
//  @route  GET /api/users/get-single-user
router.get("/get-single-user/:id", authenticated, usersController.getSingleUser);

//  @desc   Edit User
//  @route  PUT /api/users/edit-user
router.put("/edit-user/:id", authenticated, usersController.editUser);

//  @desc   Delete User
//  @route  DELETE /api/users/delete-user
router.delete("/delete-user/:id", authenticated, usersController.deleteUser);

module.exports = router;
