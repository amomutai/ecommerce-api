const router = require("express").Router()
const AuthController = require("./auth.controller")

    /**
     * @openapi
     * '/api/signup':
     *  post:
     *     tags:
     *     - Sign Up
     *     summary: Create a user
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - email
     *              - password
     *              - full_name
     *              - address
     *            properties:
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     *              full_name:
     *                type: string
     *                default: John Doe 
     *              address:
     *                type: string
     *                default: JohnDoe Streets 
     * 
     *     responses:
     *      201:
     *        description: Created
     *      409:
     *        description: Conflict
     *      500:
     *        description: Server Error
     */
router.route("/signup").post(AuthController.signup())


    /**
     * @openapi
     * '/api/signin':
     *  post:
     *     tags:
     *     - Sign In
     *     summary: User Sign In
     *     requestBody:
     *      required: true
     *      content:
     *        application/json:
     *           schema:
     *            type: object
     *            required:
     *              - username
     *              - password
     *            properties:
     *              email:
     *                type: string
     *                default: johndoe@mail.com
     *              password:
     *                type: string
     *                default: johnDoe20!@
     * 
     *     responses:
     *      200:
     *        description: Sign In Successfull
     *      403:
     *        description: Unauthorized
     *      500:
     *        description: Server Error
     */
router.route("/signin").post(AuthController.signin())

module.exports = router