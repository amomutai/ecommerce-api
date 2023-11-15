const Joi = require("joi")
const { object, string, number } = Joi.types()

module.exports.signup = object
.keys({
    body: object.keys({
        full_name: string.required().label("full_name"),
        email: string.email().required().label("email"),
        phone: string.required().label("phone").custom((value, helpers)=>{
            if(value.length < 10){
                return helpers.message("Phone number must be greater than or equal to 10 digits")
            }
            if(value.length > 13){
                return helpers.message("Phone number must be less than or equal to 10 digits")
            }
            return helpers.original
        }),
        password: string.required().label("password"),
        address: string.required().label("address"),
    })
})
.unknown()