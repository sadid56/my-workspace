"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const post_controller_1 = require("./post.controller");
const _middlewares_1 = require("../../middlewares");
const router = (0, express_1.Router)();
const createBlogSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ required_error: "Title is required" }).min(1),
        slug: zod_1.z.string({ required_error: "Slug is required" }).min(1),
        descriptions: zod_1.z.string({ required_error: "Descriptions is required" }).min(1),
        category: zod_1.z.string({ required_error: "Category is required" }).min(1),
        content: zod_1.z.string().optional(),
        coverImage: zod_1.z.string().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        readTime: zod_1.z.union([zod_1.z.number(), zod_1.z.string()]).optional(),
    }),
});
const updateBlogStatusSchema = zod_1.z.object({
    query: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Blog ID is required in query params" }),
        status: zod_1.z.string({ required_error: "Status is required in query params" }),
    }),
});
const blogSlugSchema = zod_1.z.object({
    params: zod_1.z.object({
        slug: zod_1.z.string({ required_error: "Slug is required in params" }).min(1),
    }),
});
const blogIdSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string({ required_error: "Blog ID is required in params" }),
    }),
});
router.get("/", post_controller_1.PostController.getBlogs);
router.get("/recent", post_controller_1.PostController.getRecent);
router.get("/slugs", post_controller_1.PostController.getSlugs);
router.get("/slug/:slug", (0, _middlewares_1.validate)(blogSlugSchema), post_controller_1.PostController.getBlogBySlug);
router.get("/meta/:slug", (0, _middlewares_1.validate)(blogSlugSchema), post_controller_1.PostController.getBlogMeta);
router.get("/:id", (0, _middlewares_1.validate)(blogIdSchema), post_controller_1.PostController.getBlogById);
router.post("/", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(createBlogSchema), post_controller_1.PostController.createBlog);
router.put("/", _middlewares_1.requireAdmin, (0, _middlewares_1.validate)(updateBlogStatusSchema), post_controller_1.PostController.updateBlogStatus);
exports.default = router;
