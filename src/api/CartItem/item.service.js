const CartService = require("../Cart/cart.service")
const ProductService = require("../Product/product.service")
const Errors = require("../../errors")
const prisma = require("../../utils/prisma.util")

const CartNotFound = new Errors.NotFoundError("Cart not found.")
const ProductNotFound = new Errors.NotFoundError("Product not found.")
const ItemExists = new Errors.ConflictError("Item already exists on cart.")

class ItemService {

    static async add(data){
        const {cart_id,product_id,quantity} = data
        //check if cart exists
        const cart = await CartService.findById(cart_id)
        if(!cart) throw CartNotFound

        //Check if product exists
        const product = await ProductService.findById(product_id)
        if(!product) throw ProductNotFound

        //Check if product exists on cart
        const productExists = await this.findByProductIdCartId(product_id, cart_id)
        if(productExists) throw ItemExists

        const res = await prisma.cart_items.create({data:{cart_id,product_id,quantity }})
        return res

    }

    static async findByProductIdCartId(product_id, cart_id){
        const item = await prisma.cart_items.findUnique({
            where: { 
                cart_id_product_id: { cart_id, product_id }
            },
            select: { id: true }
        })

        return item
    }
}

module.exports = ItemService
