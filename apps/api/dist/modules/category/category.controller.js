"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryController = void 0;
const http_status_codes_1 = require("http-status-codes");
const category_service_1 = require("./category.service");
const _utils_1 = require("../../utils");
class CategoryController {
    static getCategories = (0, _utils_1.catchAsync)(async (req, res) => {
        const categories = await category_service_1.CategoryService.getCategories();
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Categories retrieved successfully",
            data: categories,
        });
    });
    static createCategory = (0, _utils_1.catchAsync)(async (req, res) => {
        const { title } = req.body;
        const category = await category_service_1.CategoryService.createCategory(title);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "Category created successfully",
            data: category,
        });
    });
}
exports.CategoryController = CategoryController;
