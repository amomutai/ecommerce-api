const Joi = require("joi")
const { paginationSchema } = require("../../config")
const { object, string, number } = Joi.types()


module.exports.add = object
.keys({
    body: object.keys({
        cart_id: string.uuid().required().label("cart_id"),
        order_id: string.uuid().required().label("order_id")
    })
})
.unknown()

