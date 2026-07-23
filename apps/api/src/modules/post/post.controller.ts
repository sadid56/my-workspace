import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PostService } from "./post.service";
import { uploadToCloudinary } from "@lib";
import { generateSlug, catchAsync, sendResponse } from "@utils";

export class PostController {
  static getBlogs = catchAsync(async (req: Request, res: Response) => {
    const { category, search, page, limit } = req.query;

    if (page || limit) {
      const pageNum = Number(page) || 1;
      const limitNum = Number(limit) || 3;
      const result = await PostService.getBlogs(
        category as string,
        search as string,
        pageNum,
        limitNum
      );
      
      sendResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
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
    const blogs = await PostService.getAllBlogsRaw();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "All blogs retrieved successfully",
      data: blogs,
    });
  });

  static getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const blog = await PostService.getBlogDetails(slug);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Blog retrieved successfully",
      data: blog,
    });
  });

  static getBlogMeta = catchAsync(async (req: Request, res: Response) => {
    const { slug } = req.params;
    const meta = await PostService.getBlogDetailsMetaData(slug);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Blog metadata retrieved successfully",
      data: meta,
    });
  });

  static getSlugs = catchAsync(async (req: Request, res: Response) => {
    const slugs = await PostService.getAllBlogSlugs();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Blog slugs retrieved successfully",
      data: slugs,
    });
  });

  static getRecent = catchAsync(async (req: Request, res: Response) => {
    const recent = await PostService.getRecentBlogs();
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Recent blogs retrieved successfully",
      data: recent,
    });
  });

  static getBlogById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const blog = await PostService.getBlogById(id);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Blog retrieved successfully",
      data: blog,
    });
  });

  static createBlog = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    let coverImageUrl = "";
    if (data.coverImage) {
      coverImageUrl = await uploadToCloudinary(data.coverImage, {
        folder: "blogs/thumbnails",
        publicId: generateSlug(data.title),
      });
    }

    const cleanSlug = generateSlug(data.slug);
    const newPost = await PostService.createPost({ ...data, slug: cleanSlug }, coverImageUrl);

    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Blog created successfully",
      data: newPost,
    });
  });

  static updateBlogStatus = catchAsync(async (req: Request, res: Response) => {
    const { id, status } = req.query;
    const updated = await PostService.updatePostStatus(id as string, status as string);
    sendResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Blog status updated successfully",
      data: updated,
    });
  });
}

