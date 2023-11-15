const router = require("express").Router()
const ItemController = require("./item.controller")

router.route("/cart-item").post(ItemController.add())
router.route("/cart-items").get(ItemController.getByCartId())

module.exports = router