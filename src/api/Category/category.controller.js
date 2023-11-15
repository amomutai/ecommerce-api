const schema = require("./category.schema")
const CategoriesService = require("./category.service")
const {useValidater, usePagination} = require("../../config")

class CategoriesController {
    static add(){
        return [
            useValidater(schema.add),
            async(req, res, next)=>{
                try {
                    const result = await CategoriesService.add(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }

    static getAll(){
        return [
            useValidater(schema.read),
            usePagination(),
            async(req, res, next)=>{
                try {
                    const result = await CategoriesService.getAll(req.page)
                    res.status(200).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = CategoriesController