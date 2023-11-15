const Joi = require("joi")
const { object, string } = Joi.types()

module.exports.add = object
.keys({
    body: object.keys({
        product_id: string.uuid().required().label("product_id"),
        info: string.required().label("info"),
    })
})
.unknown()