const Cors  = require("./useCors")
const { cors }  = new Cors()
const validater = require("../utils/validater.util")

const {errorHandler, jwtErrorHandler} = require("./useErrorHandler")

const useCors = () => cors
const useErrorHandler = () => errorHandler()
const useValidater = (schema) => validater(schema)

module.exports = { useCors, useErrorHandler, useValidater }