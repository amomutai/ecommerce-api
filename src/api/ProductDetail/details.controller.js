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
}

module.exports = ProductDetailsController