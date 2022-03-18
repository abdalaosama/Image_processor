"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = void 0;
const fs_1 = __importDefault(require("fs"));
const config_1 = __importDefault(require("../config"));
function Log(message, level) {
    //returns 1 if sucess -1 if error
    let status = 0;
    try {
        const logLing = `${(new Date().getTime()).toString()} =${level}=> ${message}\n`;
        if (level > 1)
            console.log(logLing);
        fs_1.default.appendFileSync(config_1.default.logFile, logLing);
        status = 1;
    }
    catch (error) {
        status = -1;
        console.error(error);
    }
    return status;
}
exports.Log = Log;
