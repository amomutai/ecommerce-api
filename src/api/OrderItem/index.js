const router = require("express").Router()
const OrderController = require("./order.controller")

router.route("/order-item").post(OrderController.add())
// router.route("/order-items").get(OrderController.getByCartId())
// router.route("/order-item/:id").put(OrderController.update())
// router.route("/order-item/:id").delete(OrderController.delete())

module.exports = router