const router = require("express").Router()
const ProductDetailsController = require("./details.controller")

router.route("/product-details").post(ProductDetailsController.add())
router.route("/product-details").get(ProductDetailsController.getByProductId())
router.route("/product-details/:id").put(ProductDetailsController.update())


module.exports = router