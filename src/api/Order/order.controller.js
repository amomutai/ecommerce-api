const { useValidater, usePagination } = require("../../config")
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

    
    static delete(){
        return [
            useValidater(schema.delete),
            async(req, res, next)=>{
                try {
                    const result = await OrderService.delete(req.params.id)
                    res.status(200).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }

    static getByUserId (){
        return [
            useValidater(schema.getAllByUserId),
            usePagination(),
            async(req, res, next) =>{
                try {
                    const result = await OrderService.getAllByUserId(req.query.user_id, req.page)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = OrderController