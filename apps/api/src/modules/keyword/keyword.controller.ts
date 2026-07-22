import { Request, Response } from "express";
import { KeywordService } from "./keyword.service";

export class KeywordController {
  static async getKeywords(req: Request, res: Response) {
    try {
      const keywords = await KeywordService.getKeywords();
      return res.status(200).json(keywords);
    } catch (error) {
      console.error("getKeywords error:", error);
      return res.status(500).json({ error: "Failed to fetch keywords" });
    }
  }

  static async getKeywordById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const keyword = await KeywordService.getKeywordById(id);
      if (!keyword) {
        return res.status(404).json({ error: "Keyword not found" });
      }
      return res.status(200).json(keyword);
    } catch (error) {
      console.error("getKeywordById error:", error);
      return res.status(500).json({ error: "Failed to fetch keyword" });
    }
  }

  static async createKeyword(req: Request, res: Response) {
    try {
      const { title } = req.body;
      if (!title) {
        return res.status(400).json({ error: "Keyword title is required" });
      }

      const keyword = await KeywordService.createKeyword(title);
      return res.status(201).json(keyword);
    } catch (error: any) {
      console.error("createKeyword error:", error);
      if (error.code === "P2002") {
        return res.status(400).json({ error: "Keyword title or slug already exists" });
      }
      return res.status(500).json({ error: "Failed to create keyword" });
    }
  }

  static async updateKeyword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, slug } = req.body;

      if (!title) {
        return res.status(400).json({ error: "Keyword title is required" });
      }

      const keyword = await KeywordService.updateKeyword(id, title, slug);
      return res.status(200).json(keyword);
    } catch (error: any) {
      console.error("updateKeyword error:", error);
      if (error.code === "P2002") {
        return res.status(400).json({ error: "Keyword title or slug already exists" });
      }
      return res.status(500).json({ error: "Failed to update keyword" });
    }
  }

  static async deleteKeyword(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await KeywordService.deleteKeyword(id);
      return res.status(200).json({ message: "Keyword deleted successfully" });
    } catch (error) {
      console.error("deleteKeyword error:", error);
      return res.status(500).json({ error: "Failed to delete keyword" });
    }
  }
}
