"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddleWareLogger = exports.Log = void 0;
function Log(message, level) {
    let status = 0;
    try {
        console.log(`${new Date().getTime()} =${level || '-'}=>`);
        console.log(message);
        status = 1;
    }
    catch (e) {
        console.error(e);
    }
    return status;
}
exports.Log = Log;
function MiddleWareLogger(req, resp, next) {
    Log(`${req.ip} => ${req.url}`, 0);
    next();
}
exports.MiddleWareLogger = MiddleWareLogger;
