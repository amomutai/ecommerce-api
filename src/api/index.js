const router = require("express").Router()

const category = require("./Category")

router.use(category)

module.exports = router