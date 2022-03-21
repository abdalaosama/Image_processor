"use strict";
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
const fs_1 = __importDefault(require("fs"));
const promises_1 = require("fs/promises");
const sharp_1 = __importDefault(require("sharp"));
const config_1 = __importDefault(require("./config"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const port = 3000 || process.env.PORT;
app.get('/serve', (req, resp) => {
    try {
        // check for the existance of the filename ,width and height parameters
        const { filename } = req.params;
        const { width, height } = req.query;
        const parsedWidth = parseInt(width);
        const parsedHeight = parseInt(height);
        const dimensionsProvided = (!isNaN(parsedWidth) && !isNaN(parsedHeight));
        if (filename == undefined)
            return resp.status(404).json({ success: false, message: "malformed input! missing filename" });
        (0, logger_1.Log)(`filename: ${filename}, width: ${width}, height: ${height}, from IP: ${req.ip}`);
        // make sure those inputs are safe (unpolluted)
        let imagePath = path_1.default.join(config_1.default.assetsFolder, '/thump', `${filename.split('.')[0]}${width}x${height}.${filename.split('.')[1]}`);
        // check for the existance of the required image file
        const imageExists = fs_1.default.existsSync(imagePath);
        // if not exists 
        if (!imageExists) {
            //check for image in full
            const originalImagePath = path_1.default.join(config_1.default.assetsFolder, '/full', filename);
            const imageExistsinFull = fs_1.default.existsSync(originalImagePath);
            // if not 
            // return image not found
            if (!imageExistsinFull) {
                return resp.status(404).json({ success: false, message: "file not found!" });
            }
            if (!dimensionsProvided) {
                return resp.status(200).sendFile(path_1.default.resolve(originalImagePath));
            }
            //    create new image file with required params.
            (0, sharp_1.default)(originalImagePath)
                .resize(parsedWidth, parsedHeight)
                .toFile(imagePath)
                .then(() => {
                (0, logger_1.Log)(`Image ${filename} ${width}x${height} at ${imagePath} `);
                return resp.status(200).sendFile(path_1.default.resolve(imagePath));
            })
                .catch((e) => {
                (0, logger_1.Log)(e);
                return resp.status(500).json({ success: false, message: "error proccess the image" });
            });
            return;
        }
        return resp.status(200).sendFile(path_1.default.resolve(imagePath));
        // serve image content 
    }
    catch (e) {
        (0, logger_1.Log)(e);
        resp.status(500).json({ success: false, message: "internal server Error" });
        return;
    }
});
app.get('/gallery', (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    //read all files names from full and thump
    try {
        let files = yield (0, promises_1.readdir)(path_1.default.join(config_1.default.assetsFolder, "full"));
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
