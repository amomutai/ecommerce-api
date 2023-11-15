const prisma = require("../../utils/prisma.util")


class CategoriesService {

    static async add (data){
        const { title, description } = data
        const res = await prisma.categories.create({data:{ title, description }})
        return res
    }
}

module.exports = CategoriesService