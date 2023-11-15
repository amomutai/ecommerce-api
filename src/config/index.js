const Cors  = require("./useCors")
const { cors }  = new Cors()

const {errorHandler, jwtErrorHandler} = require("./useErrorHandler")

const useCors = () => cors
const useErrorHandler = () => errorHandler

module.exports = { useCors, useErrorHandler }