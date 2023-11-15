const router = require("express").Router()
const ProductController = require("./product.controller")

router.route("/product").post(ProductController.add())
router.route("/products").get(ProductController.getAll())


module.exports = router