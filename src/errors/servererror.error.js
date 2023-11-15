
module.exports = class InternalServerError extends Error {
    constructor(message, ...params){
        super(...params)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, InternalServerError)
        }

        this.custom = true,
        this.name = 'InternalServerError'
        this.code = 500
        this.date = new Date().toISOString()
        this.message = message
    }
}