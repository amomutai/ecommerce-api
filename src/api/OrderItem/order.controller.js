const { useValidater, usePagination } = require("../../config")
const schema = require("./order.schema")
const OrderItemService = require("./order.service")

class OrderItemController {
    static add (){
        return [
            useValidater(schema.add),
            async(req, res, next) =>{
                try {
                    const result = await OrderItemService.add(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = OrderItemController