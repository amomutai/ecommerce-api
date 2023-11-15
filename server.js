const express = require("express")
const api = require("./src/api")
const Logger = require("./src/utils/logger.util")
const { logger } = new Logger()

const { useCors, useErrorHandler } = require("./src/config");
// const auth = require("./src/utils/auth.util");

// const crypto = require("crypto")
// Create one time token key for jwt signing
// logger.info(crypto.randomBytes(48).toString('hex'))

const app = express()

app
    .use(useCors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .all("/", (req, res)=>{
        res.status(200)
        res.send("API assignment is available")
    })
    // .use(auth.authenticate)
    // .use("/api", api)
    .use(useErrorHandler());

const PORT = process.env.PORT || 5000

//Custom logging. clg may not work on server env
app.listen(PORT, ()=>logger.info(`API running on port ${PORT}`))





