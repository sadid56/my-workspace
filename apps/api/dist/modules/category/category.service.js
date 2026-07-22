"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const database_1 = require("@repo/database");
const generateSlug_1 = require("../../utils/generateSlug");
class CategoryService {
    static async getCategories() {
        return database_1.prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async createCategory(title) {
        const slug = (0, generateSlug_1.generateSlug)(title);
        return database_1.prisma.category.create({
            data: {
                title,
                slug,
            },
        });
    }
}
exports.CategoryService = CategoryService;
