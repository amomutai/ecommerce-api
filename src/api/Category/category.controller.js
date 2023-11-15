const schema = require("./category.schema")
const CategoriesService = require("./category.service")
const {useValidater} = require("../../config")

class CategoriesController {
    static add(){
        return [
            useValidater(schema.add),
            async(req, res, next)=>{
                try {
                    const result = await CategoriesService.add(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    console.log({ error })
                    next(error)
                }
            }
        ]
    }
}

module.exports = CategoriesController