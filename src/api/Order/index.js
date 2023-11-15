const router = require("express").Router()
const OrderController = require("./order.controller")

router.route("/order").post(OrderController.add())
// router.route("/cart/:id").delete(OrderController.delete())

module.exports = router