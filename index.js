"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston = require("winston");
var fs = require("fs");
var path = require("path");
var WCLogger = /** @class */ (function () {
    function WCLogger() {
        var logsDir = path.join(path.dirname(require.main ? require.main.filename : process.cwd()), 'logs');
        var infoPath = path.join(logsDir, 'info.log');
        var errorsPath = path.join(logsDir, 'errors.log');
        var exceptionsPath = path.join(logsDir, 'exceptions.log');
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir);
        }
        else {
            if (!fs.existsSync(infoPath)) {
                var createStream = fs.createWriteStream(infoPath);
                createStream.end();
            }
            if (!fs.existsSync(errorsPath)) {
                var createStream = fs.createWriteStream(errorsPath);
                createStream.end();
            }
            if (!fs.existsSync(exceptionsPath)) {
                var createStream = fs.createWriteStream(exceptionsPath);
                createStream.end();
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
        });
        this.logger.handleExceptions(new winston.transports.File({ filename: exceptionsPath }));
    }
    WCLogger.prototype.toMsgDate = function (message) {
        var now = new Date();
        return "[" + now.toUTCString() + "]: " + message;
    };
    WCLogger.prototype.info = function (message) {
        var msg = this.toMsgDate(message);
        console.info(msg);
        this.logger.info(message);
        return msg;
    };
    WCLogger.prototype.error = function (message) {
        var msg = this.toMsgDate(message);
        console.error(msg);
        this.logger.error(message);
        return msg;
    };
    return WCLogger;
}());
var logger = new WCLogger();
function info(message) {
    return logger.info(message);
}
exports.info = info;
function error(message) {
    return logger.error(message);
}
exports.error = error;
