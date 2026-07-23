"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const http_status_codes_1 = require("http-status-codes");
const post_service_1 = require("./post.service");
const _lib_1 = require("../../lib");
const _utils_1 = require("../../utils");
class PostController {
    static getBlogs = (0, _utils_1.catchAsync)(async (req, res) => {
        const { category, search, page, limit } = req.query;
        if (page || limit) {
            const pageNum = Number(page) || 1;
            const limitNum = Number(limit) || 3;
            const result = await post_service_1.PostService.getBlogs(category, search, pageNum, limitNum);
            (0, _utils_1.sendResponse)(res, {
                success: true,
                statusCode: http_status_codes_1.StatusCodes.OK,
                message: "Blogs retrieved successfully",
                data: result.blogs,
                meta: {
                    page: pageNum,
                    limit: limitNum,
                    total: result.totalCount,
                },
            });
            return;
        }
        // If no pagination query, return raw list (like admin GET /api/blogs)
        const blogs = await post_service_1.PostService.getAllBlogsRaw();
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "All blogs retrieved successfully",
            data: blogs,
        });
    });
    static getBlogBySlug = (0, _utils_1.catchAsync)(async (req, res) => {
        const { slug } = req.params;
        const blog = await post_service_1.PostService.getBlogDetails(slug);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Blog retrieved successfully",
            data: blog,
        });
    });
    static getBlogMeta = (0, _utils_1.catchAsync)(async (req, res) => {
        const { slug } = req.params;
        const meta = await post_service_1.PostService.getBlogDetailsMetaData(slug);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Blog metadata retrieved successfully",
            data: meta,
        });
    });
    static getSlugs = (0, _utils_1.catchAsync)(async (req, res) => {
        const slugs = await post_service_1.PostService.getAllBlogSlugs();
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Blog slugs retrieved successfully",
            data: slugs,
        });
    });
    static getRecent = (0, _utils_1.catchAsync)(async (req, res) => {
        const recent = await post_service_1.PostService.getRecentBlogs();
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Recent blogs retrieved successfully",
            data: recent,
        });
    });
    static getBlogById = (0, _utils_1.catchAsync)(async (req, res) => {
        const { id } = req.params;
        const blog = await post_service_1.PostService.getBlogById(id);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Blog retrieved successfully",
            data: blog,
        });
    });
    static createBlog = (0, _utils_1.catchAsync)(async (req, res) => {
        const data = req.body;
        let coverImageUrl = "";
        if (data.coverImage) {
            coverImageUrl = await (0, _lib_1.uploadToCloudinary)(data.coverImage, {
                folder: "blogs/thumbnails",
                publicId: (0, _utils_1.generateSlug)(data.title),
            });
        }
        const cleanSlug = (0, _utils_1.generateSlug)(data.slug);
        const newPost = await post_service_1.PostService.createPost({ ...data, slug: cleanSlug }, coverImageUrl);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.CREATED,
            message: "Blog created successfully",
            data: newPost,
        });
    });
    static updateBlogStatus = (0, _utils_1.catchAsync)(async (req, res) => {
        const { id, status } = req.query;
        const updated = await post_service_1.PostService.updatePostStatus(id, status);
        (0, _utils_1.sendResponse)(res, {
            success: true,
            statusCode: http_status_codes_1.StatusCodes.OK,
            message: "Blog status updated successfully",
            data: updated,
        });
    });
}
exports.PostController = PostController;
