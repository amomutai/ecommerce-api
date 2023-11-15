const prisma = require("../../utils/prisma.util")
const Errors = require("../../errors")
const { genSalt, hash, compare } = require("bcryptjs")
const { sign } = require("jsonwebtoken")

const EmailExists = new Errors.ConflictError("Email address already exists.")
const PhoneExists = new Errors.ConflictError("Phone number already exists.")
const UnauthError = new Errors.UnauthorizedError("Unauthorized! Wrong email or password.")


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

    static async signin(data) {
        const {email, password} = data
        //Check if user email exists
        const user = await this.getByEmail(email)
        if(!user) throw UnauthError

        //Check if password match
        const isMatch = await compare(password, user.password)
        if(!isMatch) throw UnauthError
        //create accessToken
        const payload = {
            sub: user.id,
            full_name: user.full_name,
            email: user.email,
            phone: user.phone,
            address: user.address
        }
        const accessToken = await sign(payload, process.env.PRIVATE_KEY, { expiresIn: '1d'})
        delete user.password

        return { accessToken, ...user }

    }
    

    static async findByEmail(email){
        const isEmail = await prisma.users.findUnique({ 
            where: { email },
            select: { id: true } //select id only to reduce payload size
        })
        return isEmail
    }
    static async getByEmail(email){
        const isEmail = await prisma.users.findUnique({where: { email }})
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