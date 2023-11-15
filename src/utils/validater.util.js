
const Errors = require("../errors")

function validater(schema){
    return (req, res, next)=>{
        const { error, value} = schema.validate(req)
        if(error) throw new Errors.ValidationError(error.message)

        req.body = value.body
        req.params = value.params
        req.query = value.query

        next()
    }
}

module.exports = validater