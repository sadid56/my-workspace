"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiLogger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const apiLogger = (req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
        const duration = Date.now() - start;
        const { method, originalUrl } = req;
        const { statusCode } = res;
        // Determine method color
        let methodColor = chalk_1.default.white;
        switch (method) {
            case "GET":
                methodColor = chalk_1.default.green;
                break;
            case "POST":
                methodColor = chalk_1.default.yellow;
                break;
            case "PUT":
            case "PATCH":
                methodColor = chalk_1.default.blue;
                break;
            case "DELETE":
                methodColor = chalk_1.default.red;
                break;
        }
        // Determine status color
        let statusColor = chalk_1.default.white;
        if (statusCode >= 500) {
            statusColor = chalk_1.default.red;
        }
        else if (statusCode >= 400) {
            statusColor = chalk_1.default.yellow;
        }
        else if (statusCode >= 300) {
            statusColor = chalk_1.default.cyan;
        }
        else if (statusCode >= 200) {
            statusColor = chalk_1.default.green;
        }
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${chalk_1.default.gray(timestamp)}] ${methodColor(method.padEnd(7))} ${originalUrl} - ${statusColor(statusCode)} - ${chalk_1.default.gray(`${duration}ms`)}`);
    });
    next();
};
exports.apiLogger = apiLogger;
