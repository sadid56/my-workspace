"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeywordController = void 0;
const keyword_service_1 = require("./keyword.service");
class KeywordController {
    static async getKeywords(req, res) {
        try {
            const keywords = await keyword_service_1.KeywordService.getKeywords();
            return res.status(200).json(keywords);
        }
        catch (error) {
            console.error("getKeywords error:", error);
            return res.status(500).json({ error: "Failed to fetch keywords" });
        }
    }
    static async getKeywordById(req, res) {
        try {
            const { id } = req.params;
            const keyword = await keyword_service_1.KeywordService.getKeywordById(id);
            if (!keyword) {
                return res.status(404).json({ error: "Keyword not found" });
            }
            return res.status(200).json(keyword);
        }
        catch (error) {
            console.error("getKeywordById error:", error);
            return res.status(500).json({ error: "Failed to fetch keyword" });
        }
    }
    static async createKeyword(req, res) {
        try {
            const { title } = req.body;
            if (!title) {
                return res.status(400).json({ error: "Keyword title is required" });
            }
            const keyword = await keyword_service_1.KeywordService.createKeyword(title);
            return res.status(201).json(keyword);
        }
        catch (error) {
            console.error("createKeyword error:", error);
            if (error.code === "P2002") {
                return res.status(400).json({ error: "Keyword title or slug already exists" });
            }
            return res.status(500).json({ error: "Failed to create keyword" });
        }
    }
    static async updateKeyword(req, res) {
        try {
            const { id } = req.params;
            const { title, slug } = req.body;
            if (!title) {
                return res.status(400).json({ error: "Keyword title is required" });
            }
            const keyword = await keyword_service_1.KeywordService.updateKeyword(id, title, slug);
            return res.status(200).json(keyword);
        }
        catch (error) {
            console.error("updateKeyword error:", error);
            if (error.code === "P2002") {
                return res.status(400).json({ error: "Keyword title or slug already exists" });
            }
            return res.status(500).json({ error: "Failed to update keyword" });
        }
    }
    static async deleteKeyword(req, res) {
        try {
            const { id } = req.params;
            await keyword_service_1.KeywordService.deleteKeyword(id);
            return res.status(200).json({ message: "Keyword deleted successfully" });
        }
        catch (error) {
            console.error("deleteKeyword error:", error);
            return res.status(500).json({ error: "Failed to delete keyword" });
        }
    }
}
exports.KeywordController = KeywordController;
