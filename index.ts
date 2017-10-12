import winston = require('winston')
import fs = require('fs')
import path = require('path')

class WCLogger {
    logger: any

    constructor() {
        let infoPath: string = path.join('logs', 'info.log')
        let errorsPath: string = path.join('logs', 'errors.log')
        let exceptionsPath: string = path.join('logs', 'exceptions.log')

        if (!fs.existsSync('logs')) {
            fs.mkdirSync('logs')
        } else {

            if(!fs.existsSync(infoPath)) {
                let createStream: fs.WriteStream = fs.createWriteStream(infoPath)
                createStream.end()
            }

            if(!fs.existsSync(errorsPath)) {
                let createStream: fs.WriteStream = fs.createWriteStream(errorsPath)
                createStream.end()
            }

            if(!fs.existsSync(exceptionsPath)) {
                let createStream: fs.WriteStream = fs.createWriteStream(exceptionsPath)
                createStream.end()
            }
        }

        this.logger = new (winston.Logger)({
            transports: [
                new (winston.transports.File)({
                    name: 'info-file',
                    filename: infoPath,
                    level: 'info'
                }),
                new (winston.transports.File)({
                    name: 'error-file',
                    filename: errorsPath,
                    level: 'error'
                })
            ]
        })

        this.logger.handleExceptions(new winston.transports.File({ filename: exceptionsPath }))
    }

    toMsgDate(message: string): string {
        let now: Date = new Date()
        return `[${now.toUTCString()}]: ${message}`
    }

    info(message: string): string {
        let msg: string = this.toMsgDate(message)
        
        console.info(msg)
        this.logger.info(message)
        
        return msg
    }

    error(message: string): string {
        let msg: string = this.toMsgDate(message)
        
        console.error(msg)
        this.logger.error(message)

        return msg
    }
}

let logger: WCLogger = new WCLogger()

export function info(message: string): string {
    return logger.info(message)
}

export function error(message: string): string {
    return logger.error(message)
}