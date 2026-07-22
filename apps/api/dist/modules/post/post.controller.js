"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = require("./post.service");
const cloudinary_1 = require("../../lib/cloudinary");
const generateSlug_1 = require("../../utils/generateSlug");
class PostController {
    static async getBlogs(req, res) {
        try {
            const { category, search, page, limit } = req.query;
            if (page || limit) {
                const pageNum = Number(page) || 1;
                const limitNum = Number(limit) || 3;
                const result = await post_service_1.PostService.getBlogs(category, search, pageNum, limitNum);
                return res.status(200).json(result);
            }
            // If no pagination query, return raw list (like admin GET /api/blogs)
            const blogs = await post_service_1.PostService.getAllBlogsRaw();
            return res.status(200).json(blogs);
        }
        catch (error) {
            console.error("getBlogs controller error:", error);
            return res.status(500).json({ error: "Failed to fetch blogs" });
        }
    }
    static async getBlogBySlug(req, res) {
        try {
            const { slug } = req.params;
            const blog = await post_service_1.PostService.getBlogDetails(slug);
            if (!blog) {
                return res.status(404).json({ error: "Blog not found" });
            }
            return res.status(200).json(blog);
        }
        catch (error) {
            console.error("getBlogBySlug error:", error);
            return res.status(500).json({ error: "Failed to fetch blog details" });
        }
    }
    static async getBlogMeta(req, res) {
        try {
            const { slug } = req.params;
            const meta = await post_service_1.PostService.getBlogDetailsMetaData(slug);
            if (!meta) {
                return res.status(404).json({ error: "Blog metadata not found" });
            }
            return res.status(200).json(meta);
        }
        catch (error) {
            console.error("getBlogMeta error:", error);
            return res.status(500).json({ error: "Failed to fetch blog metadata" });
        }
    }
    static async getSlugs(req, res) {
        try {
            const slugs = await post_service_1.PostService.getAllBlogSlugs();
            return res.status(200).json(slugs);
        }
        catch (error) {
            console.error("getSlugs error:", error);
            return res.status(500).json({ error: "Failed to fetch blog slugs" });
        }
    }
    static async getRecent(req, res) {
        try {
            const recent = await post_service_1.PostService.getRecentBlogs();
            return res.status(200).json(recent);
        }
        catch (error) {
            console.error("getRecent error:", error);
            return res.status(500).json({ error: "Failed to fetch recent blogs" });
        }
    }
    static async getBlogById(req, res) {
        try {
            const { id } = req.params;
            const blog = await post_service_1.PostService.getBlogById(id);
            if (!blog) {
                return res.status(404).json({ error: "Blog not found" });
            }
            return res.status(200).json(blog);
        }
        catch (error) {
            console.error("getBlogById error:", error);
            return res.status(500).json({ error: "Failed to fetch blog by ID" });
        }
    }
    static async createBlog(req, res) {
        try {
            const data = req.body;
            if (!data?.title || !data?.slug || !data?.descriptions || !data?.category) {
                return res.status(400).json({ error: "Missing required fields: title, slug, descriptions, category" });
            }
            let coverImageUrl = "";
            if (data.coverImage) {
                coverImageUrl = await (0, cloudinary_1.uploadToCloudinary)(data.coverImage, {
                    folder: "blogs/thumbnails",
                    publicId: (0, generateSlug_1.generateSlug)(data.title),
                });
            }
            const cleanSlug = (0, generateSlug_1.generateSlug)(data.slug);
            const newPost = await post_service_1.PostService.createPost({ ...data, slug: cleanSlug }, coverImageUrl);
            return res.status(201).json(newPost);
        }
        catch (error) {
            console.error("createBlog error:", error);
            return res.status(500).json({ error: error.message || "Failed to create blog" });
        }
    }
    static async updateBlogStatus(req, res) {
        try {
            const { id, status } = req.query;
            if (!id || !status) {
                return res.status(400).json({ error: "Missing id or status query parameters" });
            }
            const updated = await post_service_1.PostService.updatePostStatus(id, status);
            return res.status(200).json(updated);
        }
        catch (error) {
            console.error("updateBlogStatus error:", error);
            return res.status(500).json({ error: "Failed to update blog status" });
        }
    }
}
exports.PostController = PostController;
