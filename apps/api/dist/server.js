"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const chalk_1 = __importDefault(require("chalk"));
// Load environment variables
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../../.env.local") });
// Validate environment variables
const env_1 = require("./config/env");
const env = (0, env_1.validateEnv)();
const app_1 = __importDefault(require("./app"));
// Format timestamp utility
const getTimestamp = () => chalk_1.default.gray(new Date().toLocaleTimeString());
// Start the server
const server = app_1.default.listen(env.PORT, () => {
    console.log(`[${getTimestamp()}] ${chalk_1.default.green.bold("⚡ [server]")} Server is running on port ${chalk_1.default.cyan(env.PORT)}`);
    console.log(`[${getTimestamp()}] ${chalk_1.default.green.bold("⚡ [server]")} Environment: ${chalk_1.default.yellow(env.NODE_ENV)}`);
});
process.on("uncaughtException", (error) => {
    console.error(`[${getTimestamp()}] ${chalk_1.default.red.bold("💥 [Uncaught Exception]")} ${chalk_1.default.red(error.message)}`);
    if (error.stack) {
        console.error(chalk_1.default.gray(error.stack));
    }
    process.exit(1);
});
process.on("unhandledRejection", (reason) => {
    console.error(`[${getTimestamp()}] ${chalk_1.default.red.bold("💥 [Unhandled Rejection]")} Reason: ${chalk_1.default.red(reason instanceof Error ? reason.message : String(reason))}`);
    if (reason instanceof Error && reason.stack) {
        console.error(chalk_1.default.gray(reason.stack));
    }
    server.close(() => {
        process.exit(1);
    });
});
const handleShutdown = (signal) => {
    console.log(`\n[${getTimestamp()}] ${chalk_1.default.yellow.bold(`👋 [${signal}]`)} Received signal. Starting graceful shutdown...`);
    server.close(() => {
        console.log(`[${getTimestamp()}] ${chalk_1.default.green.bold("💤 [server]")} HTTP server closed successfully. Exiting process.`);
        process.exit(0);
    });
    // Force close after 10s if graceful shutdown hangs
    setTimeout(() => {
        console.error(`[${getTimestamp()}] ${chalk_1.default.red.bold("🚨 [server]")} Graceful shutdown timed out. Force exiting.`);
        process.exit(1);
    }, 10000);
};
process.on("SIGINT", () => handleShutdown("SIGINT"));
process.on("SIGTERM", () => handleShutdown("SIGTERM"));
