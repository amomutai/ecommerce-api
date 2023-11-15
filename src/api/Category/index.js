const router = require("express").Router()
const CategoriesController = require("./category.controller")

router.route("/category").post(CategoriesController.add())


module.exports = router