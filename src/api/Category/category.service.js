const prisma = require("../../utils/prisma.util")
const Errors = require("../../errors")

const CategoryNotFound = new Errors.NotFoundError("Category to update not found");
const CategoryTitleConflict = new Errors.ConflictError("Selected title already exists.")

class CategoriesService {

    static async add (data){
        const { title, description } = data

        //Check title unique constraint
        const titlePresent = await this.findByTitle(title)
        if(titlePresent) throw CategoryTitleConflict

        const res = await prisma.categories.create({data:{ title, description }})
        return res
    }

    static async getAll(page){
        const { pageLimit, sortOrder, sortField, offset } = page

        const results = await prisma.categories.findMany({
            take: pageLimit,
            skip: offset,
            orderBy: { [sortField]: sortOrder}
        })
        //Create a pagination object to sent with results
        const count = await prisma.categories.count()
        page.pageCount = Number(count) / Number(page.pageLimit)
        if(page.pageCount < 1){
            page.pageCount = 1
        }
        delete page.offset
        return { results, pagination: page }
    }

    static async update(id, data){
        //Check if category exists first
        const category = await this.findById(id)
        if(!category) throw CategoryNotFound

        const { title, description } = data
        //If title, check unique constraint
        if(title){
            const titlePresent = await this.findByTitle(title)
            if(titlePresent) throw CategoryTitleConflict
        }

        const res = await prisma.categories.update({
            where: { id },
            data: { title, description }
        })
        return res
    }

    static async delete(id){
        //Check if category exists first
        const category = await this.findById(id)
        if(!category) throw CategoryNotFound

        const res = await prisma.categories.delete({ where: { id }})

        return res
    }



    static async findById(id){
        const isFound = await prisma.categories.findUnique({
            where:{id}, 
            select:{id:true} //select id only to reduce query payload size
        })
        return isFound
    }
    static async findByTitle(title){
        const isFound = await prisma.categories.findUnique({
            where:{title}, 
            select:{id:true} //select id only to reduce query payload size
        })
        return isFound
    }
}

module.exports = CategoriesService