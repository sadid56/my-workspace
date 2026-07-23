"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.validateEnv = validateEnv;
const zod_1 = require("zod");
const chalk_1 = __importDefault(require("chalk"));
const envSchema = zod_1.z.object({
    PORT: zod_1.z.string().optional().transform((val) => (val ? parseInt(val, 10) : 4000)),
    NODE_ENV: zod_1.z.enum(["development", "production", "test"]).default("development"),
    DATABASE_URL: zod_1.z.string({ required_error: "DATABASE_URL is required" }).min(1),
    JWT_SECRET: zod_1.z.string({ required_error: "JWT_SECRET is required" }).min(1),
    CLOUDINARY_CLOUD_NAME: zod_1.z.string({ required_error: "CLOUDINARY_CLOUD_NAME is required" }).min(1),
    CLOUDINARY_API_KEY: zod_1.z.string({ required_error: "CLOUDINARY_API_KEY is required" }).min(1),
    CLOUDINARY_API_SECRET: zod_1.z.string({ required_error: "CLOUDINARY_API_SECRET is required" }).min(1),
    GOOGLE_APP_EMAIL: zod_1.z.string({ required_error: "GOOGLE_APP_EMAIL is required" }).email(),
    GOOGLE_APP_PASSWORD: zod_1.z.string({ required_error: "GOOGLE_APP_PASSWORD is required" }).min(1),
});
let env;
function validateEnv() {
    if (env)
        return env;
    const parsed = envSchema.safeParse(process.env);
    if (!parsed.success) {
        const getTimestamp = () => chalk_1.default.gray(new Date().toLocaleTimeString());
        console.error(`[${getTimestamp()}] ${chalk_1.default.red.bold("🚨 [Env Config Error]")} Invalid environment variables:`);
        parsed.error.errors.forEach((err) => {
            console.error(`  - ${chalk_1.default.yellow(err.path.join("."))}: ${chalk_1.default.red(err.message)}`);
        });
        process.exit(1);
    }
    exports.env = env = parsed.data;
    return env;
}
