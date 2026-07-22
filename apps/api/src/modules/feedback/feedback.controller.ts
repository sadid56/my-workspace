import { Request, Response } from "express";
import { FeedbackService } from "./feedback.service";

export class FeedbackController {
  static async getFeedbacks(req: Request, res: Response) {
    try {
      const search = (req.query.search as string) || "";
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const result = await FeedbackService.getFeedbacks(search, page, limit);
      return res.status(200).json(result);
    } catch (error) {
      console.error("getFeedbacks controller error:", error);
      return res.status(500).json({ error: "Failed to fetch feedbacks" });
    }
  }

  static async submitFeedback(req: Request, res: Response) {
    try {
      const data = req.body;
      const userId = req.body.userId; // optionally passed or extracted from session

      await FeedbackService.createFeedback(data, userId);
      return res.status(201).json({ message: "feedback submitted", status: 201 });
    } catch (error) {
      console.error("submitFeedback error:", error);
      return res.status(500).json({ error: "Failed to submit feedback" });
    }
  }

  static async deleteFeedback(req: Request, res: Response) {
    try {
      const id = req.query.id as string;
      if (!id) {
        return res.status(400).json({ error: "Feedback ID is required" });
      }

      await FeedbackService.deleteFeedback(id);
      return res.status(200).json({ message: "Feedback deleted successfully" });
    } catch (error) {
      console.error("deleteFeedback error:", error);
      return res.status(500).json({ error: "Failed to delete feedback" });
    }
  }
}
