import { Router } from "express";
import { z } from "zod";
import { PostController } from "./post.controller";
import { validate, requireAdmin } from "@middlewares";

const router = Router();

const createBlogSchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Title is required" }).min(1),
    slug: z.string({ required_error: "Slug is required" }).min(1),
    descriptions: z.string({ required_error: "Descriptions is required" }).min(1),
    category: z.string({ required_error: "Category is required" }).min(1),
    content: z.string().optional(),
    coverImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    readTime: z.union([z.number(), z.string()]).optional(),
  }),
});

const updateBlogStatusSchema = z.object({
  query: z.object({
    id: z.string({ required_error: "Blog ID is required in query params" }),
    status: z.string({ required_error: "Status is required in query params" }),
  }),
});

const blogSlugSchema = z.object({
  params: z.object({
    slug: z.string({ required_error: "Slug is required in params" }).min(1),
  }),
});

const blogIdSchema = z.object({
  params: z.object({
    id: z.string({ required_error: "Blog ID is required in params" }),
  }),
});

router.get("/", PostController.getBlogs);
router.get("/recent", PostController.getRecent);
router.get("/slugs", PostController.getSlugs);
router.get("/slug/:slug", validate(blogSlugSchema), PostController.getBlogBySlug);
router.get("/meta/:slug", validate(blogSlugSchema), PostController.getBlogMeta);
router.get("/:id", validate(blogIdSchema), PostController.getBlogById);
router.post("/", requireAdmin, validate(createBlogSchema), PostController.createBlog);
router.put("/", requireAdmin, validate(updateBlogStatusSchema), PostController.updateBlogStatus);

export default router;

