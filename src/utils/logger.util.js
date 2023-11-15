const { createLogger, format, transports } = require("winston")
const morgan = require("morgan")

module.exports = class Logger {
    logger

    constructor() {
        this.logger = createLogger({
            level: "info", //loginfo
            format: format.json(),
            defaultMeta: { },
            transports: [ new transports.Console({ format: format.cli() })]
        })
    }
    get logger (){
        return this.logger
    }

    get reqLogger(){
        return morgan("combined", {
            stream: {
                write: (message)=> this.logger.info(message)
            }
        })
    }
}