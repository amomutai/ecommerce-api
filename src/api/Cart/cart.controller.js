const { useValidater } = require("../../config")
const schema = require("./cart.schema")
const CartService = require("./cart.service")

class CartController {
    static add (){
        return [
            useValidater(schema.add),
            async(req, res, next)=>{
                try {
                    const result = await CartService.add(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = CartController