const prisma = require("../../utils/prisma.util")
const Errors = require("../../errors")
const { genSalt, hash } = require("bcryptjs")

const EmailExists = new Errors.ConflictError("Email address already exists.")
const PhoneExists = new Errors.ConflictError("Phone number already exists.")


class AuthService {

    static async signup(data) {
        const {full_name,email,phone,password,address} = data
        //Check if email exists
        const emailExists = await this.findByEmail(email)
        if(emailExists) throw EmailExists
        //Check if phone exists
        const phoneExists = await this.findByPhone(email)
        if(phoneExists) throw PhoneExists
        //Encyrpt password
        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        const res = await prisma.users.create({data:{
            full_name,email,phone,password: hashedPassword,address
        }})
        delete res.password

        return res
    }
    

    static async findByEmail(email){
        const isEmail = await prisma.users.findUnique({ 
            where: { email },
            select: { id: true } //select id only to reduce payload size
        })
        return isEmail
    }
    static async findByPhone(phone){
        const isPhone = await prisma.users.findUnique({ 
            where: { phone },
            select: { id: true } //select id only to reduce payload size
        })
        return isPhone
    }
}

module.exports = AuthService