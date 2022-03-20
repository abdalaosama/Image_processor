"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./util/logger");
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs/promises"));
const config_1 = __importDefault(require("./config"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000 || process.env.PORT;
app.get('/serve', (req, resp) => {
    // check for the existance of the filename ,width and height parameters
    // make sure those inputs are safe (unpolluted)
    // check for the existance of the required image file
    // if not exists 
    //    create new image file with required params.
    // serve image content 
});
app.get('/gallery', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    //read all files names from full and thump
    try {
        let files = yield fs.readdir(path_1.default.join(config_1.default.assetsFolder, "full"));
        let result = files.map((file) => `/serve/${file}`);
        (0, logger_1.Log)(result);
        resp.status(200).json({ success: true, message: "images listed succesfully", data: result });
    }
    catch (e) {
        (0, logger_1.Log)(e);
        return resp.status(500).json({ success: false, message: "internal server Error" });
    }
}));
app.listen(port, () => {
    (0, logger_1.Log)(`Server started on port ${port}`);
});
