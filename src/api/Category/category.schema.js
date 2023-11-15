const Joi = require("joi")
const { paginationSchema } = require("../../config")
const { object, string, number } = Joi.types()

module.exports.add = object
.keys({
    body: object.keys({
        title: string.required().label("title"),
        description: string.label("description")
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
        title: string.label("title"),
        description: string.label("description")
    })
})
.unknown()
