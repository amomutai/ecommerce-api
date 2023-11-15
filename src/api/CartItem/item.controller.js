const { useValidater } = require("../../config")
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
}

module.exports = ItemController
