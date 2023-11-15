const jwt = require("express-jwt")
const { AuthError } = require("../errors")
const guard = require("express-jwt-permissons")()

//Handle jwt auth errors

const errorHandler = (err,req, res, next)=>{
    const error = new AuthError("Permission Denied")
    next(error)
}

const auth = {}

auth.authenticate = [
    jwt({
        secret: process.env.PRIVATE_KEY,
        algorithms: ['HS256']
    }).unless({ path: [
        "/"
    ]})
]

auth.authorize = (...check)=> [guard.check(...check), errorHandler]

module.exports = auth