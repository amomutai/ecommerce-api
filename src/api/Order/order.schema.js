const Joi = require("joi")
const { paginationSchema } = require("../../config")
const { object, string, number } = Joi.types()


module.exports.add = object
.keys({
    body: object.keys({
        user_id: string.uuid().required().label("user_id")
    })
})
.unknown()