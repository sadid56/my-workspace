"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const database_1 = require("@repo/database");
const http_status_codes_1 = require("http-status-codes");
const _utils_1 = require("../../utils");
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
        const blog = await database_1.prisma.post.findUnique({
            where: {
                slug,
                status: "active",
            },
        });
        if (!blog) {
            throw new _utils_1.AppError("Blog not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return blog;
    }
    static async getBlogDetailsMetaData(slug) {
        const meta = await database_1.prisma.post.findUnique({
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
        if (!meta) {
            throw new _utils_1.AppError("Blog metadata not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return meta;
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
        try {
            return await database_1.prisma.post.create({
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
        catch (error) {
            if (error.code === "P2002") {
                throw new _utils_1.AppError("Blog title or slug already exists", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            throw error;
        }
    }
    static async getAllBlogsRaw() {
        return database_1.prisma.post.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async updatePostStatus(id, status) {
        const exists = await database_1.prisma.post.findUnique({
            where: { id },
        });
        if (!exists) {
            throw new _utils_1.AppError("Blog not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return database_1.prisma.post.update({
            where: { id },
            data: {
                status,
            },
        });
    }
    static async getBlogById(id) {
        const blog = await database_1.prisma.post.findUnique({
            where: { id },
        });
        if (!blog) {
            throw new _utils_1.AppError("Blog not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return blog;
    }
}
exports.PostService = PostService;
