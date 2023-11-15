const prisma = require("../../utils/prisma.util")
const Errors = require("../../errors")
const ProductService = require("../Product/product.service")

const ProductDetailsExists = new Errors.ConflictError("Product already contains details.")
const ProductNotFound = new Errors.NotFoundError("Selected product not found.")
const ProductDetailsNotFound = new Errors.NotFoundError("Product details not found.")


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

    static async getByProductId(product_id){
        const res = await prisma.product_details.findUnique({ where: { product_id }})
        if(!res) throw ProductDetailsNotFound

        return res
    }

    static async update(id, data){
        //Check if product details exists
        const isDetails = await this.findById(id)
        if(!isDetails) throw ProductDetailsNotFound

        const { product_id, info  } = data
        //Check the product_id constraint if exists && if product exists
        if(product_id){
            //Check if product exists
            const product = await ProductService.findById(product_id)
            if(!product) throw ProductNotFound
            //Check the product_id constraint if exists
            const isProductDetails = await this.findByProductId(product_id)
            if(isProductDetails) throw ProductDetailsExists
        }

        const res = await prisma.product_details.update({
            where: { id },
            data: { product_id, info }
        })

        return res
    }

    static async delete(id){
        //Check if product exists first
        const productDetails = await this.findById(id)
        if(!productDetails) throw ProductDetailsNotFound

        const res = await prisma.product_details.delete({ where: { id }})

        return res
    }

    static async findByProductId(product_id){
        const isDetails = await prisma.product_details.findUnique({ 
            where: { product_id }, 
            select: { id: true }
        }) 
        return isDetails
    }
    static async findById(id){
        const isDetails = await prisma.product_details.findUnique({ 
            where: { id }, 
            select: { id: true }
        }) 
        return isDetails
    }
}

module.exports = ProductDetailsService