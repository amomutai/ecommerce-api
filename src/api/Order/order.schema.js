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

module.exports.delete = object
.keys({
    params: object.keys({
        id: string.uuid().required().label("id")
    })
})
.unknown()

module.exports.getDetailsById = object
.keys({
    params: object.keys({
        id: string.uuid().required().label("id")
    })
})
.unknown()

module.exports.getAllByUserId = object
.keys({
    query: paginationSchema().append({
        user_id: string.uuid().required().label("user_id")
        //Add allowed query params... Add any other query params here
    })
})
.unknown()
