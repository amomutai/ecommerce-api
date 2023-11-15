const schema = require("./auth.schema")
const AuthService = require("./auth.service")
const { useValidater } = require("../../config")


class AuthController {

    static signup(){
        return [
            useValidater(schema.signup),
            async(req, res, next)=>{
                try {
                    const result = await AuthService.signup(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }

    static signin(){
        return [
            useValidater(schema.signin),
            async(req, res, next)=>{
                try {
                    const result = await AuthService.signin(req.body)
                    res.status(201).send(result)
                } catch (error) {
                    next(error)
                }
            }
        ]
    }
}

module.exports = AuthController