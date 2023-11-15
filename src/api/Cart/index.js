const router = require("express").Router()
const CartController = require("./cart.controller")

router.route("/cart").post(CartController.add())
router.route("/cart/:id").delete(CartController.delete())

module.exports = router