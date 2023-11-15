
module.exports = class ConflictError extends Error {
    constructor(message, ...params){
        super(...params)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, ConflictError)
        }

        this.custom = true,
        this.name = 'ConflictError'
        this.code = 409
        this.date = new Date().toISOString()
        this.message = message
    }
}