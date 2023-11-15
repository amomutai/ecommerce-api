const router = require("express").Router()
const ItemController = require("./item.controller")

router.route("/cart-item").post(ItemController.add())

module.exports = router