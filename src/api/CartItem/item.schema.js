const Joi = require("joi")
const { paginationSchema } = require("../../config")
const { object, string, number } = Joi.types()


module.exports.add = object
.keys({
    body: object.keys({
        cart_id: string.uuid().required().label("cart_id"),
        product_id: string.uuid().required().label("product_id"),
        quantity: number.required().label("quantity")
    })
})
.unknown()


module.exports.read = object
.keys({
    query: paginationSchema().append({
        cart_id: string.uuid().required().label("cart_id")
        //Add allowed query params... Add any other query params here
    })
})
.unknown()
