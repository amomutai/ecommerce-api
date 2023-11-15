const AuthService = require("../Auth/auth.service")
const Errors = require("../../errors")
const prisma = require("../../utils/prisma.util")

const UserNotFound = new Errors.NotFoundError("User does not exists")
const OrderNotFound = new Errors.NotFoundError("Order does not exists")

class OrderService {
    static async add(data){
        const { user_id } = data
        //Check if user exists
        const userExists = await AuthService.findById(user_id)
        if(!userExists) throw UserNotFound

        const res = await prisma.orders.create({ data: { user_id }})

        return res
    }

    static async delete(id){
        //Check if category exists first
        const order = await this.findById(id)
        if(!order) throw OrderNotFound

        const res = await prisma.orders.delete({ where: { id }})

        return res
    }

    static async findById(id){
        const order = await prisma.orders.findUnique({
            where: { id },
            select: { id: true }
        })

        return order
    }
}

module.exports = OrderService