const router = require("express").Router()

const category = require("./Category")
const product = require("./Product")
const productDetail = require("./ProductDetail")

router.use(category)
router.use(product)
router.use(productDetail)

module.exports = router