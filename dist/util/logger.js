"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
function Log(message, level) {
    let status = 0;
    try {
        console.log(`${new Date().getTime()} =${level || '-'}=>${message}`);
        status = 1;
    }
    catch (e) {
        console.error(e);
    }
    return status;
}
exports.Log = Log;
