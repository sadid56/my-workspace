import { Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {
  static async getCategories(req: Request, res: Response) {
    try {
      const categories = await CategoryService.getCategories();
      return res.status(200).json(categories);
    } catch (error) {
      console.error("getCategories error:", error);
      return res.status(500).json({ error: "Failed to fetch categories" });
    }
  }

  static async createCategory(req: Request, res: Response) {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Category title is required" });
      }

      const category = await CategoryService.createCategory(title);
      return res.status(201).json(category);
    } catch (error: any) {
      console.error("createCategory error:", error);
      if (error.code === "P2002") {
        return res.status(400).json({ error: "Category title or slug already exists" });
      }
      return res.status(500).json({ error: "Failed to create category" });
    }
  }
}
