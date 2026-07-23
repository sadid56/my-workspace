"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordService = void 0;
const database_1 = require("@repo/database");
const http_status_codes_1 = require("http-status-codes");
const _utils_1 = require("../../utils");
class KeywordService {
    static async getKeywords() {
        return database_1.prisma.keywords.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async getKeywordById(id) {
        const keyword = await database_1.prisma.keywords.findUnique({
            where: { id },
        });
        if (!keyword) {
            throw new _utils_1.AppError("Keyword not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return keyword;
    }
    static async createKeyword(title) {
        const slug = (0, _utils_1.generateSlug)(title);
        try {
            return await database_1.prisma.keywords.create({
                data: {
                    title,
                    slug,
                },
            });
        }
        catch (error) {
            if (error.code === "P2002") {
                throw new _utils_1.AppError("Keyword title or slug already exists", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            throw error;
        }
    }
    static async updateKeyword(id, title, slug) {
        const exists = await database_1.prisma.keywords.findUnique({
            where: { id },
        });
        if (!exists) {
            throw new _utils_1.AppError("Keyword not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        const cleanSlug = slug || (0, _utils_1.generateSlug)(title);
        try {
            return await database_1.prisma.keywords.update({
                where: { id },
                data: {
                    title,
                    slug: cleanSlug,
                },
            });
        }
        catch (error) {
            if (error.code === "P2002") {
                throw new _utils_1.AppError("Keyword title or slug already exists", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            throw error;
        }
    }
    static async deleteKeyword(id) {
        const exists = await database_1.prisma.keywords.findUnique({
            where: { id },
        });
        if (!exists) {
            throw new _utils_1.AppError("Keyword not found", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
        return database_1.prisma.keywords.delete({
            where: { id },
        });
    }
}
exports.KeywordService = KeywordService;
