import { Router } from "express";
import { z } from "zod";
import { CategoryController } from "./category.controller";
import { validate, requireAdmin } from "@middlewares";

const router = Router();

const createCategorySchema = z.object({
  body: z.object({
    title: z.string({ required_error: "Category title is required" }).min(1, "Category title is required"),
  }),
});

router.get("/", CategoryController.getCategories);
router.post("/", requireAdmin, validate(createCategorySchema), CategoryController.createCategory);

export default router;

