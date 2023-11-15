const router = require("express").Router()

const category = require("./Category")
const product = require("./Product")
const productDetail = require("./ProductDetail")
const auth = require("./Auth")
const cart = require("./Cart")
const cartItem = require("./CartItem")
const order = require("./Order")

router.use(category)
router.use(product)
router.use(productDetail)
router.use(auth)
router.use(cart)
router.use(cartItem)
router.use(order)

module.exports = router