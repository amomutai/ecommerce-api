const router = require("express").Router()
const ProductController = require("./product.controller")

    /**
     * @openapi
     * '/api/product':
     *  post:
     *     tags:
     *     - Add Product
     *     summary: Create a new product
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - name
     *              - category_id
     *              - price
     *              - available
     *              - description
     *              - image_url
     *            properties:
     *              name:
     *                type: string
     *                default: 
     *              category_id:
     *                type: uuid
     *                default: 
     *              price:
     *                type: number
     *                default: 0 
     *              available:
     *                type: boolean
     *                default: true 
     *              description:
     *                type: string
     *                default:  
     *                required: false 
     *              image_url:
     *                type: string
     *                default:  
     *                required: false 
     * 
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      500:
     *        description: Server Error
     */
router.route("/product").post(ProductController.add())

    /**
     * @openapi
     * '/api/products':
     *  get:
     *     tags:
     *     - Get Product
     *     summary: Get all products
     *     requestParams:
     *      required: false
     *     
     * 
     *     responses:
     *      200:
     *        description: Found
     *      409:
     *        description: Conflict
     *      500:
     *        description: Server Error
     */
router.route("/products").get(ProductController.getAll())
router.route("/product/:id").put(ProductController.update())
router.route("/product/:id").delete(ProductController.delete())


module.exports = router