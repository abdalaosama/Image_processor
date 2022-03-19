"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./util/logger");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000 || process.env.PORT;
app.get('/gallery', (req, resp) => {
    resp.send('hello');
});
app.listen(port, () => {
    (0, logger_1.Log)(`Server started on port ${port}`);
});
