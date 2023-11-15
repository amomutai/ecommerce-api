const AuthService = require("../Auth/auth.service")
const Errors = require("../../errors")
const prisma = require("../../utils/prisma.util")

const UserNotFound = new Errors.NotFoundError("User does not exists")

class CartService {
    static async add(data){
        const { user_id } = data
        //Check if user exists
        const userExists = await AuthService.findById(user_id)
        if(!userExists) throw UserNotFound

        const res = await prisma.cart.create({data:{user_id}})
        return res
    }
}

module.exports = CartService