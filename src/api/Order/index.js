const router = require("express").Router()
const OrderController = require("./order.controller")

router.route("/order").post(OrderController.add())
router.route("/orders").get(OrderController.getByUserId())
router.route("/order/:id").delete(OrderController.delete())

module.exports = router