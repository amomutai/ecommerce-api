const Joi = require("joi")
const { paginationSchema } = require("../../config")
const { object, string, number, boolean } = Joi.types()

module.exports.add = object
.keys({
    body: object.keys({
        name: string.required().label("name"),
        category_id: string.uuid().required().label("category_id"),
        price: number.required().label("price"),
        available: boolean.label("available"),
        description: string.label("description"),
        image_url: string.label("image_url"),
    })
})
.unknown()

module.exports.read = object
.keys({
    query: paginationSchema().append({
        //Add allowed query params... Add any other query params here
    })
})
.unknown()