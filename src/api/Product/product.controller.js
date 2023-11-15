const schema = require("./product.schema")
const ProductService = require("./product.service")
const { useValidater, usePagination } = require("../../config");


class ProductController {
    static add(){
        return [
            useValidater(schema.add),
            async(req, res, next)=>{
                try {
                    const result = await ProductService.add(req.body)
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
                    const result = await ProductService.getAll(req.page)
                    res.status(200).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }

    static update(){
        return [
            useValidater(schema.edit),
            async(req, res, next)=>{
                try {
                    const result = await ProductService.update(req.params.id, req.body)
                    res.status(200).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }

    static delete(){
        return [
            useValidater(schema.delete),
            async(req, res, next)=>{
                try {
                    const result = await ProductService.delete(req.params.id)
                    res.status(200).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = ProductController