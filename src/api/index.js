const router = require("express").Router()

const category = require("./Category")
const product = require("./Product")
const productDetail = require("./ProductDetail")
const auth = require("./Auth")

router.use(category)
router.use(product)
router.use(productDetail)
router.use(auth)

module.exports = router