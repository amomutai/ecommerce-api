const CategoryService = require("../Category/category.service")
const prisma = require("../../utils/prisma.util")
const Errors = require("../../errors")

const CategoryNotFound = new Errors.NotFoundError("Selected category not found");
const NameUniqueConstraintError = new Errors.ConflictError("Product name already exists.")

class ProductService{

    static async add(data){
        const { name, category_id, price, available, description, image_url  } = data

        //Check the unique name constarint on name
        const isName = await this.findByName(name)
        if(isName) throw NameUniqueConstraintError

        //Check if category exists
        const category = await CategoryService.findById(category_id)
        if(!category) throw CategoryNotFound

        const res = await prisma.products.create({data:{
            name, category_id, price, available, description, image_url
        }})

        return res
    }

    static async getAll(page){
        const { pageLimit, sortOrder, sortField, offset } = page

        const results = await prisma.products.findMany({
            take: pageLimit,
            skip: offset,
            orderBy: { [sortField]: sortOrder}
        })
        //Create a pagination object to sent with results
        const count = await prisma.products.count()
        page.pageCount = Number(count) / Number(page.pageLimit)
        if(page.pageCount < 1){
            page.pageCount = 1
        }
        delete page.offset
        return { results, pagination: page }
    }


    static async findByName(name){
        let prod = await prisma.products.findUnique({
            where: { name },
            select: { id:true } //select only ID to reduce payload size
        })
        return prod
    }
}

module.exports = ProductService