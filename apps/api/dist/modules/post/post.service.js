"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const database_1 = require("@repo/database");
class PostService {
    static async getBlogs(category, search, page = 1, limit = 3) {
        const skip = (page - 1) * limit;
        const whereClause = {
            status: "active",
            ...(category && {
                category: {
                    equals: category,
                    mode: "insensitive",
                },
            }),
            ...(search && {
                OR: [
                    {
                        title: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                ],
            }),
        };
        const [blogs, totalCount] = await Promise.all([
            database_1.prisma.post.findMany({
                where: whereClause,
                orderBy: {
                    createdAt: "desc",
                },
                skip,
                take: limit,
            }),
            database_1.prisma.post.count({
                where: whereClause,
            }),
        ]);
        return { blogs, totalCount };
    }
    static async getAllBlogSlugs() {
        return database_1.prisma.post.findMany({
            select: { slug: true },
            where: { status: "active" },
        });
    }
    static async getBlogDetails(slug) {
        return database_1.prisma.post.findUnique({
            where: {
                slug,
                status: "active",
            },
        });
    }
    static async getBlogDetailsMetaData(slug) {
        return database_1.prisma.post.findUnique({
            where: {
                slug,
                status: "active",
            },
            select: {
                title: true,
                coverImage: true,
                slug: true,
                descriptions: true,
            },
        });
    }
    static async getRecentBlogs() {
        return database_1.prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
            take: 3,
            where: {
                status: "active",
            },
            select: {
                id: true,
                title: true,
                slug: true,
                readTime: true,
            },
        });
    }
    static async createPost(data, coverImageUrl) {
        return database_1.prisma.post.create({
            data: {
                title: data.title,
                slug: data.slug,
                tags: data.tags || [],
                coverImage: coverImageUrl,
                descriptions: data.descriptions,
                category: data.category,
                readTime: Number(data.readTime) || 0,
                content: data.content,
            },
        });
    }
    static async getAllBlogsRaw() {
        return database_1.prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async updatePostStatus(id, status) {
        return database_1.prisma.post.update({
            where: { id },
            data: {
                status,
            },
        });
    }
    static async getBlogById(id) {
        return database_1.prisma.post.findUnique({
            where: { id },
        });
    }
}
exports.PostService = PostService;
