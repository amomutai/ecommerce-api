const router = require("express").Router()
const ProductController = require("./product.controller")

router.route("/product").post(ProductController.add())


module.exports = router