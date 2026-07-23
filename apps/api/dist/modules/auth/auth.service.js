"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("@repo/database");
const http_status_codes_1 = require("http-status-codes");
const _lib_1 = require("../../lib");
const _utils_1 = require("../../utils");
class AuthService {
    static async login(email, password) {
        const user = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new _utils_1.AppError("Invalid email or password", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const isMatch = (0, _lib_1.comparePassword)(password, user.password);
        if (!isMatch) {
            throw new _utils_1.AppError("Invalid email or password", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        if (user.role !== "ADMIN") {
            throw new _utils_1.AppError("Forbidden. Admin access required.", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        const token = (0, _lib_1.signToken)({ id: user.id, email: user.email, role: user.role });
        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
    static async checkUser(email) {
        const user = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new _utils_1.AppError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return user;
    }
    static async getUserById(id) {
        const user = await database_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
        if (!user) {
            throw new _utils_1.AppError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return user;
    }
}
exports.AuthService = AuthService;
