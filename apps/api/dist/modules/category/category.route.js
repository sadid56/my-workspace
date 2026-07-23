"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const category_controller_1 = require("./category.controller");
const _middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const createCategorySchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Category title is required" }).min(1, "Category title is required"),
    }),
});
router.get("/", category_controller_1.CategoryController.getCategories);
router.post("/", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(createCategorySchema), category_controller_1.CategoryController.createCategory);
exports.default = router;
