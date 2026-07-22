"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const category_service_1 = require("./category.service");
class CategoryController {
    static async getCategories(req, res) {
        try {
            const categories = await category_service_1.CategoryService.getCategories();
            return res.status(200).json(categories);
        }
        catch (error) {
            console.error("getCategories error:", error);
            return res.status(500).json({ error: "Failed to fetch categories" });
        }
    }
    static async createCategory(req, res) {
        try {
            const { title } = req.body;
            if (!title) {
                return res.status(400).json({ error: "Category title is required" });
            }
            const category = await category_service_1.CategoryService.createCategory(title);
            return res.status(201).json(category);
        }
        catch (error) {
            console.error("createCategory error:", error);
            if (error.code === "P2002") {
                return res.status(400).json({ error: "Category title or slug already exists" });
            }
            return res.status(500).json({ error: "Failed to create category" });
        }
    }
}
exports.CategoryController = CategoryController;
