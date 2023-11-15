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

module.exports.read = object
.keys({
    query: object.keys({
        //Add allowed query params... Add any other query params here
        product_id: string.uuid().required().label("product_id")
    })
})
.unknown()


module.exports.edit = object
.keys({
    params: object.keys({
        id: string.uuid().required().label("id")
    }),
    body: object.keys({
        product_id: string.uuid().label("product_id"),
        info: string.label("info"),
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