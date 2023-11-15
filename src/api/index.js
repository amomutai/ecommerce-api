const router = require("express").Router()

const category = require("./Category")
const product = require("./Product")

router.use(category)
router.use(product)

module.exports = router