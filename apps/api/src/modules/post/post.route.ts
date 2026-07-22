import { Router } from "express";
import { PostController } from "./post.controller";

const router = Router();

router.get("/", PostController.getBlogs);
router.get("/recent", PostController.getRecent);
router.get("/slugs", PostController.getSlugs);
router.get("/slug/:slug", PostController.getBlogBySlug);
router.get("/meta/:slug", PostController.getBlogMeta);
router.get("/:id", PostController.getBlogById);
router.post("/", PostController.createBlog);
router.put("/", PostController.updateBlogStatus);

export default router;
