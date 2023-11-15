const router = require("express").Router()
const ProductDetailsController = require("./details.controller")

router.route("/product-details").post(ProductDetailsController.add())
router.route("/product-details").get(ProductDetailsController.getByProductId())
router.route("/product-details/:id").put(ProductDetailsController.update())
router.route("/product-details/:id").delete(ProductDetailsController.delete())


module.exports = router