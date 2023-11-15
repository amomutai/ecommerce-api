const AuthService = require("../Auth/auth.service")
const Errors = require("../../errors")
const prisma = require("../../utils/prisma.util")

const UserNotFound = new Errors.NotFoundError("User does not exists")
const CartNotFound = new Errors.NotFoundError("Cart does not exists")

class CartService {
    static async add(data){
        const { user_id } = data
        //Check if user exists
        const userExists = await AuthService.findById(user_id)
        if(!userExists) throw UserNotFound

        const res = await prisma.cart.create({data:{user_id}})
        return res
    }

    static async delete(id){
        //Check if category exists first
        const category = await this.findById(id)
        if(!category) throw CartNotFound

        const res = await prisma.cart.delete({ where: { id }})

        return res
    }

    static async findById(id){
        const cart = await prisma.cart.findUnique({ where: { id }})
        return cart
    }
}

module.exports = CartService