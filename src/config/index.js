const Cors  = require("./useCors")
const { cors }  = new Cors()
const validater = require("../utils/validater.util")
const {errorHandler, jwtErrorHandler} = require("./useErrorHandler")
const { pagination, paginationSchema } = require("./usePaginater")

const useCors = () => cors
const useErrorHandler = () => errorHandler()
const useValidater = (schema) => validater(schema)
const usePagination = () => pagination()

module.exports = { 
    useCors, 
    useErrorHandler, 
    useValidater, 
    usePagination, 
    paginationSchema
}