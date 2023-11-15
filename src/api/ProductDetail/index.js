const router = require("express").Router()
const ProductDetailsController = require("./details.controller")

router.route("/product-details").post(ProductDetailsController.add())


module.exports = router