const AuthError = require("./auth.error")
const ConflictError = require("./conflict.error")
const NotFoundError = require("./notfound.error")
const ValidationError = require("./validation.error")
const InternalServerError = require("./servererror.error")
const UnauthorizedError = require("./unauthorized.error")

//declare any other app error here

module.exports = { 
    AuthError,
    ConflictError,
    NotFoundError,
    ValidationError,
    InternalServerError,
    UnauthorizedError
}
