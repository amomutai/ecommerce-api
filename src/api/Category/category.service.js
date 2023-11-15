const prisma = require("../../utils/prisma.util")


class CategoriesService {

    static async add (data){
        const { title, description } = data
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
}

module.exports = CategoriesService