
module.exports = class UnauthorizedError extends Error {
    constructor(message, ...params){
        super(...params)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, UnauthorizedError)
        }

        this.custom = true,
        this.name = 'UnauthorizedError'
        this.code = 401
        this.date = new Date().toISOString()
        this.message = message
    }
}