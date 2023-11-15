const router = require("express").Router()
const CategoriesController = require("./category.controller")

router.route("/category").post(CategoriesController.add())
router.route("/categories").get(CategoriesController.getAll())


module.exports = router