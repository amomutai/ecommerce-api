const AuthService = require("../Auth/auth.service")
const Errors = require("../../errors")
const prisma = require("../../utils/prisma.util")

const UserNotFound = new Errors.NotFoundError("User does not exists")
const CartNotFound = new Errors.NotFoundError("Cart does not exists")

class OrderService {
    static async add(data){
        const { user_id } = data
        //Check if user exists
        const userExists = await AuthService.findById(user_id)
        if(!userExists) throw UserNotFound

        const res = await prisma.orders.create({ data: { user_id }})

        return res
    }
}

module.exports = OrderService