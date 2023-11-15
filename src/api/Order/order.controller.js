const { useValidater } = require("../../config")
const schema = require("./order.schema")
const OrderService = require("./order.service")

class OrderController {

    static add(){
        return [
            useValidater(schema.add),
            async(req, res, next)=>{
                try {
                    const reults = await OrderService.add(req.body)
                    res.status(200).send(reults)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = OrderController