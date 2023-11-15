const schema = require("./details.schema")
const ProductDetailsService = require("./details.service")
const { useValidater } = require("../../config")

class ProductDetailsController {
    static add(){
        return [
            useValidater(schema.add),
            async(req, res, next)=>{
                try {
                    const result = await ProductDetailsService.add(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }

    static getByProductId(){
        return [
            useValidater(schema.read),
            async(req, res, next)=>{
                try {
                    const result = await ProductDetailsService.getByProductId(req.query.product_id)
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
                    const result = await ProductDetailsService.update(req.params.id, req.body)
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
                    const result = await ProductDetailsService.delete(req.params.id)
                    res.status(200).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = ProductDetailsController