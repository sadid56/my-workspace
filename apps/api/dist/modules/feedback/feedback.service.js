"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackService = void 0;
const database_1 = require("@repo/database");
const http_status_codes_1 = require("http-status-codes");
const _utils_1 = require("../../utils");
class FeedbackService {
    static async getFeedbacks(search = "", page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const whereClause = {
            OR: [
                { feedback: { contains: search, mode: "insensitive" } },
                { post: { title: { contains: search, mode: "insensitive" } } },
                { user: { name: { contains: search, mode: "insensitive" } } },
            ],
        };
        const [items, total] = await Promise.all([
            database_1.prisma.feedback.findMany({
                where: whereClause,
                include: {
                    post: {
                        select: {
                            title: true,
                            slug: true,
                        },
                    },
                    user: {
                        select: {
                            name: true,
                            email: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip,
                take: limit,
            }),
            database_1.prisma.feedback.count({
                where: whereClause,
            }),
        ]);
        return {
            items,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        };
    }
    static async createFeedback(data, userId) {
        return database_1.prisma.feedback.create({
            data: {
                emoji: data.emoji,
                feedback: data.feedback,
                anonymous: Boolean(data.anonymous),
                postId: data.postId,
                userId: userId || undefined,
            },
        });
    }
    static async deleteFeedback(id) {
        const exists = await database_1.prisma.feedback.findUnique({
            where: { id },
        });
        if (!exists) {
            throw new _utils_1.AppError("Feedback not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return database_1.prisma.feedback.delete({
            where: { id },
        });
    }
}
exports.FeedbackService = FeedbackService;
