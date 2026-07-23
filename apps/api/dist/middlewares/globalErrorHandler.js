"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const chalk_1 = __importDefault(require("chalk"));
const zod_1 = require("zod");
const http_status_codes_1 = require("http-status-codes");
const _utils_1 = require("../utils");
const globalErrorHandler = (err, req, res, next) => {
    const timestamp = chalk_1.default.gray(new Date().toLocaleTimeString());
    // Log formatting based on type of error
    if (err instanceof zod_1.ZodError) {
        console.warn(`[${timestamp}] ${chalk_1.default.yellow.bold("⚠️  [Validation Error]")} ${req.method} ${req.originalUrl} - ${err.errors.length} fields failed validation`);
        return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: "fail",
            message: "Validation failed",
            errors: err.errors.map((e) => ({
                field: e.path.join("."),
                message: e.message,
            })),
        });
    }
    if (err instanceof _utils_1.AppError) {
        console.warn(`[${timestamp}] ${chalk_1.default.yellow.bold(`⚠️  [${err.statusCode} AppError]`)} ${req.method} ${req.originalUrl} - ${err.message}`);
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    }
    // Unhandled internal server errors
    console.error(`[${timestamp}] ${chalk_1.default.red.bold("💥 [Internal Error]")} ${req.method} ${req.originalUrl} - ${err.message || err}`);
    if (err.stack) {
        console.error(chalk_1.default.gray(err.stack));
    }
    const isDev = process.env.NODE_ENV === "development";
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: "error",
        message: isDev ? err.message || "Internal Server Error" : "Something went wrong. Please try again later.",
        ...(isDev && { stack: err.stack }),
    });
};
exports.globalErrorHandler = globalErrorHandler;
exports.default = exports.globalErrorHandler;
