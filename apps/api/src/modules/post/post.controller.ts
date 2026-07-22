import { Request, Response } from "express";
import { PostService } from "./post.service";
import { uploadToCloudinary } from "../../lib/cloudinary";
import { generateSlug } from "../../utils/generateSlug";

export class PostController {
  static async getBlogs(req: Request, res: Response) {
    try {
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
        return res.status(200).json(result);
      }

      // If no pagination query, return raw list (like admin GET /api/blogs)
      const blogs = await PostService.getAllBlogsRaw();
      return res.status(200).json(blogs);
    } catch (error) {
      console.error("getBlogs controller error:", error);
      return res.status(500).json({ error: "Failed to fetch blogs" });
    }
  }

  static async getBlogBySlug(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const blog = await PostService.getBlogDetails(slug);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      return res.status(200).json(blog);
    } catch (error) {
      console.error("getBlogBySlug error:", error);
      return res.status(500).json({ error: "Failed to fetch blog details" });
    }
  }

  static async getBlogMeta(req: Request, res: Response) {
    try {
      const { slug } = req.params;
      const meta = await PostService.getBlogDetailsMetaData(slug);
      if (!meta) {
        return res.status(404).json({ error: "Blog metadata not found" });
      }
      return res.status(200).json(meta);
    } catch (error) {
      console.error("getBlogMeta error:", error);
      return res.status(500).json({ error: "Failed to fetch blog metadata" });
    }
  }

  static async getSlugs(req: Request, res: Response) {
    try {
      const slugs = await PostService.getAllBlogSlugs();
      return res.status(200).json(slugs);
    } catch (error) {
      console.error("getSlugs error:", error);
      return res.status(500).json({ error: "Failed to fetch blog slugs" });
    }
  }

  static async getRecent(req: Request, res: Response) {
    try {
      const recent = await PostService.getRecentBlogs();
      return res.status(200).json(recent);
    } catch (error) {
      console.error("getRecent error:", error);
      return res.status(500).json({ error: "Failed to fetch recent blogs" });
    }
  }

  static async getBlogById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const blog = await PostService.getBlogById(id);
      if (!blog) {
        return res.status(404).json({ error: "Blog not found" });
      }
      return res.status(200).json(blog);
    } catch (error) {
      console.error("getBlogById error:", error);
      return res.status(500).json({ error: "Failed to fetch blog by ID" });
    }
  }

  static async createBlog(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!data?.title || !data?.slug || !data?.descriptions || !data?.category) {
        return res.status(400).json({ error: "Missing required fields: title, slug, descriptions, category" });
      }

      let coverImageUrl = "";
      if (data.coverImage) {
        coverImageUrl = await uploadToCloudinary(data.coverImage, {
          folder: "blogs/thumbnails",
          publicId: generateSlug(data.title),
        });
      }

      const cleanSlug = generateSlug(data.slug);
      const newPost = await PostService.createPost({ ...data, slug: cleanSlug }, coverImageUrl);

      return res.status(201).json(newPost);
    } catch (error) {
      console.error("createBlog error:", error);
      return res.status(500).json({ error: (error as Error).message || "Failed to create blog" });
    }
  }

  static async updateBlogStatus(req: Request, res: Response) {
    try {
      const { id, status } = req.query;

      if (!id || !status) {
        return res.status(400).json({ error: "Missing id or status query parameters" });
      }

      const updated = await PostService.updatePostStatus(id as string, status as string);
      return res.status(200).json(updated);
    } catch (error) {
      console.error("updateBlogStatus error:", error);
      return res.status(500).json({ error: "Failed to update blog status" });
    }
  }
}
