const Joi = require("joi")
const { object, number, string } = Joi.types()

function pagination(){
    return (req, res, next)=>{
        req.page = {
            pageNumber: req.query.pageNumber,
            pageLimit: req.query.pageLimit,
            sortField: req.query.sortField,
            sortOrder: req.query.sortOrder,
            offset: (req.query.pageNumber - 1) * req.query.pageLimit
        }
        next()
    }
}

function paginationSchema() {
    return object.keys({
        pageNumber: number.min(1).default(1).label("pageNumber"),
        pageLimit: number.default(20).label("pageLimit"),
        sortField: string.default("created_at").label("sortField"),
        sortOrder: string.valid("asc", "desc").default("desc").label("sortOrder"),
    })
}

module.exports = { pagination, paginationSchema }