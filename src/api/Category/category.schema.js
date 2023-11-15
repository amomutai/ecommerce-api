const Joi = require("joi")
const { object, string } = Joi.types()

module.exports.add = object
.keys({
    body: object.keys({
        title: string.required().label("title"),
        description: string.label("description")
    })
})
.unknown()