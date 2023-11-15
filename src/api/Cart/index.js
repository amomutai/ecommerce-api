const router = require("express").Router()
const CartController = require("./cart.controller")

router.route("/cart").post(CartController.add())

module.exports = router