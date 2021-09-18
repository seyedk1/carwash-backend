const { Router } = require("express");

const usersController = require("./controllers");
// const { authenticated } = require("@root/core/middleware/auth")


const router = new Router();

//  @desc   Register Handle
//  @route  POST /api/users/register
router.post("/register", usersController.register);

module.exports = router;
