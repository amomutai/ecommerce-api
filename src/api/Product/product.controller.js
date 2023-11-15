const schema = require("./product.schema")
const ProductService = require("./product.service")
const { useValidater } = require("../../config");


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
}

module.exports = ProductController