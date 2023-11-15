const router = require("express").Router()
const AuthController = require("./auth.controller")
// Register and Login user
router.route("/signup").post(AuthController.signup())
router.route("/signin").post(AuthController.signin())

module.exports = router