"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const database_1 = require("@repo/database");
const http_status_codes_1 = require("http-status-codes");
const _utils_1 = require("../../utils");
class CategoryService {
    static async getCategories() {
        return database_1.prisma.category.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
    }
    static async createCategory(title) {
        const slug = (0, _utils_1.generateSlug)(title);
        try {
            return await database_1.prisma.category.create({
                data: {
                    title,
                    slug,
                },
            });
        }
        catch (error) {
            if (error.code === "P2002") {
                throw new _utils_1.AppError("Category title or slug already exists", http_status_codes_1.StatusCodes.BAD_REQUEST);
            }
            throw error;
        }
    }
}
exports.CategoryService = CategoryService;
