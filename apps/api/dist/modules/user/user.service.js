"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const database_1 = require("@repo/database");
const _utils_1 = require("../../utils");
class UserService {
    static async getUsers(search = "") {
        const users = await database_1.prisma.user.findMany({
            orderBy: { createdAt: "desc" },
            where: search
                ? {
                    OR: [
                        { email: { contains: search, mode: "insensitive" } },
                        { name: { contains: search, mode: "insensitive" } }
                    ],
                }
                : undefined,
        });
        return users.map((user) => ({
            ...user,
            sessions: user.sessions.map((session) => ({
                ip: session?.ipAddress,
                userAgent: session?.userAgent,
                deviceInfo: (0, _utils_1.parseDevice)(session.userAgent),
            })),
        }));
    }
}
exports.UserService = UserService;
