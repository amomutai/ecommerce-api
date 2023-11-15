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
    
    static async getByCartId(cart_id, page){
        //check if cart exists
        const cart = await CartService.findById(cart_id)
        if(!cart) throw CartNotFound

        const { pageLimit, sortOrder, sortField, offset } = page

        const results = await prisma.cart_items.findMany({
            where: { cart_id },
            take: pageLimit,
            skip: offset,
            orderBy: { [sortField]: sortOrder}
        })
        //Create a pagination object to sent with results
        const count = await prisma.cart_items.count({ where: { cart_id } })
        page.pageCount = Number(count) / Number(page.pageLimit)
        if(page.pageCount < 1){
            page.pageCount = 1
        }
        delete page.offset
        return { results, pagination: page }
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
