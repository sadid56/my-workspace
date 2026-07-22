"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordService = void 0;
const database_1 = require("@repo/database");
const generateSlug_1 = require("../../utils/generateSlug");
class KeywordService {
    static async getKeywords() {
        return database_1.prisma.keywords.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async getKeywordById(id) {
        return database_1.prisma.keywords.findUnique({
            where: { id },
        });
    }
    static async createKeyword(title) {
        const slug = (0, generateSlug_1.generateSlug)(title);
        return database_1.prisma.keywords.create({
            data: {
                title,
                slug,
            },
        });
    }
    static async updateKeyword(id, title, slug) {
        const cleanSlug = slug || (0, generateSlug_1.generateSlug)(title);
        return database_1.prisma.keywords.update({
            where: { id },
            data: {
                title,
                slug: cleanSlug,
            },
        });
    }
    static async deleteKeyword(id) {
        return database_1.prisma.keywords.delete({
            where: { id },
        });
    }
}
exports.KeywordService = KeywordService;
