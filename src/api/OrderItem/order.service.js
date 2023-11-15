const CartService = require("../Cart/cart.service")
const CartItemsService = require("../CartItem/item.service")
const OrderService = require("../Order/order.service")
const Errors = require("../../errors")
const prisma = require("../../utils/prisma.util")

const CartNotFound = new Errors.NotFoundError("Cart does not exists")
const OrderNotFound = new Errors.NotFoundError("Order does not exists")


class OrderItemService {
    static async add(data){
        const { order_id, cart_id } = data
        //Check if order exists first
        const order = await OrderService.findById(order_id)
        if(!order) throw OrderNotFound

        //Check if cart exists first
        const cart = await CartService.findById(cart_id)
        if(!cart) throw CartNotFound

        //use cart_id to get all the items on the cart
        const itemsArray = await CartItemsService.getAllByCartId(cart_id)

        // loop through the cart items creating order and removing them from cart
        const orders = []
        for(let item of itemsArray){
            let order = await prisma.order_items.create({data:{
                order_id,
                product_id: item.product_id,
                amount_to_pay: item.products.price,
                quantity: item.quantity
            }})
            orders.push(order)
            await CartItemsService.delete(item.id)
        }

        return orders
    }



    static async findById(id){
        let order = await prisma.order_items.findUnique({
            where: { id },
            select: { id: true }
        })

        return order
    }
}

module.exports = OrderItemService