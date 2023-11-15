
module.exports = class ValidationError extends Error {
    constructor(message, ...params){
        super(...params)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, ValidationError)
        }

        this.custom = true,
        this.name = 'ValidationError'
        this.code = 400
        this.date = new Date().toISOString()
        this.message = message
    }
}