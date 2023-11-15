const prisma = require("../../utils/prisma.util")
const Errors = require("../../errors")
const ProductService = require("../Product/product.service")

const ProductDetailsExists = new Errors.ConflictError("Product already contains details.")
const ProductNotFound = new Errors.NotFoundError("Selected product not found.")


class ProductDetailsService {

    static async add(data){
        const { product_id, info  } = data

        //Check if product exists
        const product = await ProductService.findById(product_id)
        if(!product) throw ProductNotFound

        //Check the product_id constraint if exists
        const isProductDetails = await this.findByProductId(product_id)
        if(isProductDetails) throw ProductDetailsExists
        
        const res = await prisma.product_details.create({data:{ product_id, info }})
        return res
    }

    static async findByProductId(product_id){
        const isDetails = await prisma.product_details.findUnique({ 
            where: { product_id }, 
            select: { id: true }
        }) 

        return isDetails

    }
}

module.exports = ProductDetailsService