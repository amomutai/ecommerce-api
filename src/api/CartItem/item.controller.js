const { useValidater, usePagination } = require("../../config")
const schema = require("./item.schema")
const ItemService = require("./item.service")


class ItemController {
    static add (){
        return [
            useValidater(schema.add),
            async(req, res, next) =>{
                try {
                    const result = await ItemService.add(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }

    static getByCartId(){
        return [
            useValidater(schema.read),
            usePagination(),
            async(req, res, next)=>{
                try {
                    const result = await ItemService.getByCartId(req.query.cart_id, req.page)
                    res.status(200).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = ItemController
