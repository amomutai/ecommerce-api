const router = require("express").Router()
const CategoriesController = require("./category.controller")

router.route("/category").post(CategoriesController.add())
router.route("/categories").get(CategoriesController.getAll())
router.route("/category/:id").put(CategoriesController.update())
router.route("/category/:id").delete(CategoriesController.delete())


module.exports = router