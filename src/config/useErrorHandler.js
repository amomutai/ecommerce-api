//All application errors declared.
const Errors = require("../errors")

module.exports = class ErrorHandler {
    static errorHandler(){
        return [
            (err, req, res, next)=>{
                try {
                    const isError = !!(err.name&&Errors[err.name]&&err instanceof Errors[err.name])
                    if(isError) throw err

                    //If not among the declared errors, throw 500.
                    throw new Errors.InternalServerError(err&&err.message||"Internal Server Error")
                    
                } catch (error) {
                    res.status(error.code).send(error)
                }
            },
            //API route missing error
            (req, res, next)=>{
                const error = new Errors.NotFoundError("Route not found.")
                res.status(error.code).send(error)
            }
        ]

    }

    static jwtErrorHandler(){
        return (err, req, res, next)=>{
            if(err.name === "UnauthorizedError"){
                const error = new Errors.UnauthorizedError("Invalid token, permission denied")
                next(error)
            } else {
                //Incase of any other jwt error
                next()
            }
        }
    }
}