"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const chalk_1 = __importDefault(require("chalk"));
const http_status_codes_1 = require("http-status-codes");
const notFound = (req, res) => {
    const timestamp = chalk_1.default.gray(new Date().toLocaleTimeString());
    console.warn(`[${timestamp}] ${chalk_1.default.yellow.bold("⚠️  [404]")} ${req.method} ${req.originalUrl} - Route Not Found`);
    res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
        message: "Route not found",
        path: req.originalUrl,
        date: new Date(),
    });
};
exports.notFound = notFound;
