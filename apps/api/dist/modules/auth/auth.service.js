"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const database_1 = require("@repo/database");
class AuthService {
    static async checkUser(email) {
        if (!email) {
            return { success: false, message: "Email is required" };
        }
        const user = await database_1.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            return { success: false, message: "User not found" };
        }
        return { success: true, user };
    }
    static async getUserById(id) {
        return database_1.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            },
        });
    }
}
exports.AuthService = AuthService;
