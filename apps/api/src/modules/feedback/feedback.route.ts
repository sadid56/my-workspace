import { Router } from "express";
import { z } from "zod";
import { FeedbackController } from "./feedback.controller";
import { validate, requireAdmin } from "@middlewares";

const router = Router();

const submitFeedbackSchema = z.object({
  body: z.object({
    emoji: z.string({ required_error: "Emoji is required" }).min(1),
    feedback: z.string({ required_error: "Feedback is required" }).min(1),
    postId: z.string().optional(),
    anonymous: z.boolean().optional(),
    userId: z.string().optional(),
  }),
});

const deleteFeedbackSchema = z.object({
  query: z.object({
    id: z.string({ required_error: "Feedback ID is required in query params" }).min(1),
  }),
});

router.get("/", FeedbackController.getFeedbacks);
router.post("/", requireAdmin, validate(submitFeedbackSchema), FeedbackController.submitFeedback);
router.delete("/", requireAdmin, validate(deleteFeedbackSchema), FeedbackController.deleteFeedback);

export default router;

