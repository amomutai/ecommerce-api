
module.exports = class AuthError extends Error {
    constructor(message, ...params){
        super(...params)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, AuthError)
        }

        this.custom = true,
        this.name = 'AuthorizationError'
        this.code = 403
        this.date = new Date().toISOString()
        this.message = message
    }
}