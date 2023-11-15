
module.exports = class NotFoundError extends Error {
    constructor(message, ...params){
        super(...params)

        if(Error.captureStackTrace){
            Error.captureStackTrace(this, NotFoundError)
        }

        this.custom = true,
        this.name = 'NotFoundError'
        this.code = 404
        this.date = new Date().toISOString()
        this.message = message
    }
}