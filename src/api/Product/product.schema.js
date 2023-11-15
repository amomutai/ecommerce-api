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

module.exports.edit = object
.keys({
    params: object.keys({
        id: string.uuid().required().label("id")
    }),
    body: object.keys({
        name: string.label("name"),
        category_id: string.uuid().label("category_id"),
        price: number.label("price"),
        available: boolean.label("available"),
        description: string.label("description"),
        image_url: string.label("image_url"),
    })
})
.unknown()

module.exports.delete = object
.keys({
    params: object.keys({
        id: string.uuid().required().label("id")
    })
})
.unknown()