const router = require("express").Router()

const category = require("./Category")
const product = require("./Product")
const productDetail = require("./ProductDetail")
const auth = require("./Auth")
const cart = require("./Cart")

router.use(category)
router.use(product)
router.use(productDetail)
router.use(auth)
router.use(cart)

module.exports = router