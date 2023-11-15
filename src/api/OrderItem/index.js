const router = require("express").Router()
const OrderController = require("./order.controller")

router.route("/order-item").post(OrderController.add())

module.exports = router