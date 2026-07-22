"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackController = void 0;
const feedback_service_1 = require("./feedback.service");
class FeedbackController {
    static async getFeedbacks(req, res) {
        try {
            const search = req.query.search || "";
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const result = await feedback_service_1.FeedbackService.getFeedbacks(search, page, limit);
            return res.status(200).json(result);
        }
        catch (error) {
            console.error("getFeedbacks controller error:", error);
            return res.status(500).json({ error: "Failed to fetch feedbacks" });
        }
    }
    static async submitFeedback(req, res) {
        try {
            const data = req.body;
            const userId = req.body.userId; // optionally passed or extracted from session
            await feedback_service_1.FeedbackService.createFeedback(data, userId);
            return res.status(201).json({ message: "feedback submitted", status: 201 });
        }
        catch (error) {
            console.error("submitFeedback error:", error);
            return res.status(500).json({ error: "Failed to submit feedback" });
        }
    }
    static async deleteFeedback(req, res) {
        try {
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({ error: "Feedback ID is required" });
            }
            await feedback_service_1.FeedbackService.deleteFeedback(id);
            return res.status(200).json({ message: "Feedback deleted successfully" });
        }
        catch (error) {
            console.error("deleteFeedback error:", error);
            return res.status(500).json({ error: "Failed to delete feedback" });
        }
    }
}
exports.FeedbackController = FeedbackController;
